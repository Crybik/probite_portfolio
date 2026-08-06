"""Key the ProBite mark to true transparency without hollowing out the script.

A flood fill from the corners fails: the white script overflows the red banner,
so the letters form a continuous white channel from the background into the
letters sitting *on* the banner, and the fill travels down it and eats the word.

Hole-filling is not enough either — "ProB" straddles the banner edge, so those
letters are not enclosed regions.

What actually defines "inside the mark" is the banner itself, which is a convex
parallelogram. So: isolate the banner from the thin tagline by eroding the red
mask, take the convex hull of what survives, and protect every pixel inside it.
White inside the hull is lettering; white outside is background.
"""
import pathlib
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = pathlib.Path(r"C:\Users\jim\temp\probite\public\logo.png")
OUT = pathlib.Path(r"C:\Users\jim\temp\probite_portfolio\public\brand\probite.png")

im = Image.open(SRC).convert("RGB")
a = np.asarray(im).astype(np.int16)
R, G, B = a[..., 0], a[..., 1], a[..., 2]
H, W = R.shape

red = (R > 90) & (R - G > 45) & (R - B > 45)
green = (G > 70) & (G - R > 25) & (G - B > 25)


def to_img(mask):
    return Image.fromarray((mask * 255).astype(np.uint8), "L")


def to_mask(img):
    return np.asarray(img) > 127


# Erode the red mask until the tagline's thin strokes vanish and only the solid
# banner remains.
eroded = to_mask(to_img(red).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MinFilter(9)))
print(f"red={red.sum():,} -> eroded={eroded.sum():,}")

# The banner is a stepped parallelogram — two slabs, the right one raised — so
# it is NOT convex and a convex hull spills white into the notches. It is,
# however, x-monotone: every horizontal scanline through it is one unbroken run.
# Filling each row between its first and last red pixel therefore reproduces the
# stepped outline exactly, while still closing over the letters.
banner_mask = np.zeros_like(eroded)
rows = np.nonzero(eroded.any(axis=1))[0]
for y in rows:
    xs_row = np.nonzero(eroded[y])[0]
    banner_mask[y, xs_row[0] : xs_row[-1] + 1] = True
print(f"banner rows: {len(rows)}  span-filled: {banner_mask.sum():,}")

# Grow the region well past the erosion loss. The script overflows the banner,
# and where it does it is white-on-white in the source — unrecoverable. Growing
# the protected region keeps those overhangs and leaves a white keyline around
# the banner, which is what the real mark carries: the illuminated sign on the
# factory wall has exactly that outline.
banner_img = to_img(banner_mask)
for _ in range(6):
    banner_img = banner_img.filter(ImageFilter.MaxFilter(15))
banner_mask = to_mask(banner_img)


def fill_holes(mask):
    """Enclosed background — used for the leaf's interior vein."""
    free = ~mask
    reached = np.zeros_like(free)
    reached[0, :] = free[0, :]; reached[-1, :] = free[-1, :]
    reached[:, 0] = free[:, 0]; reached[:, -1] = free[:, -1]
    while True:
        grown = reached.copy()
        grown[1:, :] |= reached[:-1, :]; grown[:-1, :] |= reached[1:, :]
        grown[:, 1:] |= reached[:, :-1]; grown[:, :-1] |= reached[:, 1:]
        grown &= free
        if np.array_equal(grown, reached):
            break
        reached = grown
    return ~reached & ~mask


protected = banner_mask | red | green | fill_holes(green)
print(f"banner={banner_mask.sum():,}  protected={protected.sum():,} of {H * W:,}")

# Feather through the antialiased edge so the mark has no hard white fringe.
lum = a.mean(axis=2)
alpha = np.clip((246 - lum) / 26 * 255, 0, 255)
alpha[protected] = 255

out = Image.fromarray(np.dstack([np.asarray(im), alpha.astype(np.uint8)]), "RGBA")
out = out.crop(out.getbbox())
out.thumbnail((1000, 1000), Image.LANCZOS)
out.save(OUT, "PNG", optimize=True)

arr = np.asarray(out)
print(f"{OUT.name}: {out.size}  {OUT.stat().st_size // 1024}KB  "
      f"transparent={100 * (arr[..., 3] == 0).mean():.1f}%  "
      f"opaque={100 * (arr[..., 3] == 255).mean():.1f}%")

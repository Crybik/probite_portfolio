"""Prepare Marasi Al-Arz brand assets + ProBite product photography for the site."""
import re, pathlib, fitz
from PIL import Image, ImageChops

PROJ = pathlib.Path(r"C:\Users\jim\temp\probite_portfolio")
VIS = PROJ / "visuals"
PUB = PROJ / "public"
(PUB / "products").mkdir(parents=True, exist_ok=True)
(PUB / "brand").mkdir(parents=True, exist_ok=True)

# ── 1. Logo: PDF vector -> two themeable SVGs ────────────────────────────────
doc = fitz.open(str(VIS / "marasi al arz stamp (1).pdf"))
page = doc[0]
H = page.rect.height

# Cluster the vector art: the anchor monogram sits left of the wordmark, with a
# clear horizontal gap between them. Split on the widest gap between shapes
# ordered by left edge — keying off x1 would pull the wordmark's "M" (which
# starts at 37.98 and ends past 43) into the anchor group.
rects = sorted((d["rect"] for d in page.get_drawings()), key=lambda r: r.x0)
split = max(range(1, len(rects)), key=lambda i: rects[i].x0 - max(r.x1 for r in rects[:i]))
anchor_rects, word_rects = rects[:split], rects[split:]

anchor_bbox = None
for r in anchor_rects:
    anchor_bbox = r if anchor_bbox is None else anchor_bbox | r
word_bbox = None
for r in word_rects:
    word_bbox = r if word_bbox is None else word_bbox | r
full_bbox = anchor_bbox | word_bbox
print("anchor:", anchor_bbox)
print("wordmark:", word_bbox)
print("full:", full_bbox)

raw = page.get_svg_image(text_as_path=True)
body = raw.split(">", 1)[1].rsplit("</svg>", 1)[0]
# Drop <defs>: it holds a clipPath whose rectangle covers the whole page. Left in
# place it is inert, but any later step that lifts <path> elements out of their
# wrappers would promote it to visible art and flood the mark with a solid block.
body = re.sub(r"<defs>.*?</defs>", "", body, flags=re.S)
body = re.sub(r'\sclip-path="url\(#[^"]*\)"', "", body)
body = re.sub(r'\sinkscape:(groupmode|label)="[^"]*"', "", body)
# Retarget fill so CSS can theme the mark.
body = body.replace('fill="#333333"', 'fill="currentColor"')
assert "clipPath" not in body and "<defs" not in body, "clip artefacts survived"
print("art paths:", len(re.findall(r"<path", body)))


def write_svg(name, bbox, pad=1.0, title="", max_tx=None):
    art = body
    if max_tx is not None:
        # Keep only the paths inside the crop, so the file carries no art hidden
        # outside its own viewBox. Each path is placed by matrix(1,0,0,-1,tx,ty).
        kept = [
            m.group(0)
            for m in re.finditer(r"<path[^>]*/>", body)
            if (tx := re.search(r"matrix\(1,0,0,-1,([-\d.]+),", m.group(0)))
            and float(tx.group(1)) < max_tx
        ]
        art = "".join(kept)
        print(f"  {name}: kept {len(kept)} of {len(re.findall(r'<path[^>]*/>', body))} paths")
    x0, y0 = bbox.x0 - pad, bbox.y0 - pad
    w, h = bbox.width + pad * 2, bbox.height + pad * 2
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{x0:.3f} {y0:.3f} {w:.3f} {h:.3f}" '
        f'role="img" aria-label="{title}" fill="currentColor">'
        f"<title>{title}</title>{art}</svg>"
    )
    p = PUB / "brand" / name
    p.write_text(svg, encoding="utf-8")
    print("wrote", p.name, len(svg), "bytes", f"ratio={w / h:.3f}")


write_svg("marasi-lockup.svg", full_bbox, 1.0, "Marasi Al-Arz")
write_svg("marasi-anchor.svg", anchor_bbox, 1.0, "Marasi Al-Arz anchor monogram", max_tx=35)

# ── 2. Product photography: trim the dead white, cap the long edge ───────────
SHOTS = {
    "WhatsApp Image 2026-05-17 at 4.55.53 PM.jpeg": "burger-dill-pickles.jpg",
    "WhatsApp Image 2026-07-27 at 4.17.12 PM.jpeg": "jalapeno-pepper.jpg",
    "melted cheese.jpg.jpeg": "cheddar-cheese-sauce.jpg",
}

# The factory at blue hour: manufacturing and export in a single frame. Kept
# wide and high-quality because it runs full-bleed behind the hero.
hero = Image.open(VIS / "pro bite.jpg.jpeg").convert("RGB")
hero.save(PUB / "factory-night.jpg", "JPEG", quality=86, optimize=True, progressive=True)
print(f"factory-night.jpg: {hero.size}  {(PUB / 'factory-night.jpg').stat().st_size // 1024}KB")

# The ProBite brand mark. Its white background is NOT removable: the script
# runs past the red banner, so the white letterforms are contiguous with the
# surrounding white and any key that clears the background also hollows out the
# word. The mark is therefore trimmed but left on its plate, and the UI sets it
# on a white chip — which is how it appears on the packaging anyway.
mark = Image.open(pathlib.Path(r"C:\Users\jim\temp\probite\public\logo.png")).convert("RGB")
bgm = Image.new("RGB", mark.size, mark.getpixel((2, 2)))
diffm = ImageChops.difference(mark, bgm).convert("L").point(lambda p: 255 if p > 18 else 0)
boxm = diffm.getbbox()
if boxm:
    padm = int(min(mark.size) * 0.02)
    mark = mark.crop((
        max(0, boxm[0] - padm), max(0, boxm[1] - padm),
        min(mark.width, boxm[2] + padm), min(mark.height, boxm[3] + padm),
    ))
mark.thumbnail((900, 900), Image.LANCZOS)
mark.save(PUB / "brand" / "probite.png", "PNG", optimize=True)
print(f"probite.png: {mark.size}  {(PUB / 'brand' / 'probite.png').stat().st_size // 1024}KB (white plate, trimmed)")

for src, dst in SHOTS.items():
    im = Image.open(VIS / src).convert("RGB")
    before = im.size
    # Trim against the corner pixel, with tolerance for the soft studio backdrop.
    bg = Image.new("RGB", im.size, im.getpixel((2, 2)))
    diff = ImageChops.difference(im, bg).convert("L").point(lambda p: 255 if p > 12 else 0)
    box = diff.getbbox()
    if box:
        pad = int(min(im.size) * 0.015)
        box = (
            max(0, box[0] - pad), max(0, box[1] - pad),
            min(im.width, box[2] + pad), min(im.height, box[3] + pad),
        )
        im = im.crop(box)
    im.thumbnail((1400, 1400), Image.LANCZOS)
    out = PUB / "products" / dst
    im.save(out, "JPEG", quality=88, optimize=True, progressive=True)
    print(f"{dst}: {before} -> {im.size}  {out.stat().st_size // 1024}KB")

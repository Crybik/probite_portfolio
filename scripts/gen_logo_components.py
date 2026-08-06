"""Emit the Marasi Al-Arz mark as React components.

Inlining the vector (rather than pointing an <img> at the SVG) is what lets the
mark inherit `currentColor`, so one file serves the light ground, the dark
ground and the reversed footer without a second asset.
"""
import re, pathlib

PUB = pathlib.Path(r"C:\Users\jim\temp\probite_portfolio\public\brand")
OUT = pathlib.Path(r"C:\Users\jim\temp\probite_portfolio\src\components\brand")
OUT.mkdir(parents=True, exist_ok=True)


def build(svg_name, comp_name, label_en, label_ar):
    svg = (PUB / svg_name).read_text(encoding="utf-8")
    view_box = re.search(r'viewBox="([^"]+)"', svg).group(1)
    paths = re.findall(r"<path[^>]*/>", svg)
    # The extracted art carries only transform/d/fill — all valid JSX already.
    jsx = "\n      ".join(p.replace("/>", " />").replace("  ", " ") for p in paths)

    src = f'''/* Generated from visuals/marasi al arz stamp (1).pdf — do not hand-edit.
   Regenerate with scratchpad/gen_logo_components.py if the mark changes. */

export function {comp_name}({{
  className,
  title,
}}: {{
  className?: string;
  /** Pass the Arabic name when the page is in Arabic. */
  title?: string;
}}) {{
  const label = title ?? "{label_en}";
  return (
    <svg
      viewBox="{view_box}"
      className={{className}}
      role="img"
      aria-label={{label}}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{{label}}</title>
      {jsx}
    </svg>
  );
}}
'''
    p = OUT / f"{comp_name}.tsx"
    p.write_text(src, encoding="utf-8")
    print(f"{p.name}: {len(paths)} paths, viewBox={view_box}, {len(src)} bytes  (ar label: {label_ar})")


build("marasi-lockup.svg", "MarasiLockup", "Marasi Al-Arz", "مراسي الأرز")
build("marasi-anchor.svg", "MarasiAnchor", "Marasi Al-Arz", "مراسي الأرز")

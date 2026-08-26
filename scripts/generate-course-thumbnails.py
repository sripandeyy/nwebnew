#!/usr/bin/env python3
"""Generate unique course thumbnails: themed photo background + centered course title."""

from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
import textwrap
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "src/app/domains/courseCatalog.ts"
OUT_DIR = ROOT / "public/courses"
FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial.ttf"

# Keyword hints for more relevant Unsplash Source imagery
THEME_KEYWORDS: dict[str, str] = {
    "dotnet": "software,code,developer",
    "agentic-ai": "artificial-intelligence,robot,future",
    "azure": "cloud,server,data-center",
    "aws": "cloud,server,technology",
    "ccna-200-301": "network,cisco,server",
    "cloud-computing": "cloud,technology,data",
    "data-analytics": "analytics,charts,data",
    "data-engineering": "database,pipeline,engineering",
    "data-science": "data-science,analytics,laptop",
    "data-structures": "programming,code,algorithm",
    "deep-learning": "neural-network,ai,brain",
    "devops": "devops,server,automation",
    "docker": "containers,devops,technology",
    "java-fullstack": "java,programming,developer",
    "generative-ai-llm": "ai,chatbot,technology",
    "manual-testing": "software-testing,quality,office",
    "metaverse": "virtual-reality,metaverse,technology",
    "quantum-computing": "quantum,physics,technology",
    "sap": "enterprise,business,software",
    "servicenow": "business,software,office",
    "web3": "blockchain,crypto,technology",
    "web-development": "web-development,coding,laptop",
    "ai-domain": "artificial-intelligence,technology",
    "bioinformatics": "biology,dna,laboratory",
    "blockchain": "blockchain,cryptocurrency",
    "cyber-security": "cybersecurity,network,security",
    "embedded-systems": "microchip,electronics,circuit",
    "vlsi": "microchip,semiconductor,technology",
    "signals-and-systems": "engineering,signals,electronics",
    "iot": "iot,smart-home,technology",
    "robotics": "robot,automation,engineering",
    "power-systems": "electricity,power,engineering",
    "hev": "electric-car,automotive,battery",
    "autocad-mech": "cad,engineering,design",
    "catia": "cad,automotive,design",
    "car-design": "car-design,automotive,sketch",
    "drone-engineering": "drone,aerial,engineering",
    "ic-engine-design": "engine,automotive,mechanical",
    "aspen-hysys": "chemical-plant,engineering,industry",
    "aspen-plus": "chemical-engineering,factory",
    "petroleum-engineering": "oil,energy,engineering",
    "construction-planning": "construction,architecture,building",
    "finance": "finance,business,stock",
    "digital-marketing": "marketing,social-media,digital",
    "hr-management": "human-resources,office,team",
    "stock-marketing": "stock-market,finance,trading",
    "supply-chain": "logistics,warehouse,shipping",
    "salesforce": "business,cloud,crm",
    "power-bi": "business-intelligence,charts,analytics",
    "microbiology": "microscope,laboratory,biology",
    "molecular-biology": "dna,laboratory,science",
    "medical-coding": "medical,hospital,healthcare",
    "pharmacovigilance": "pharmacy,medicine,healthcare",
    "psychology": "psychology,brain,therapy",
    "food-science": "food-science,laboratory,kitchen",
    "sensory-science": "food,tasting,laboratory",
    "graphic-design": "graphic-design,creativity,colors",
    "ui-ux": "ui-design,ux,interface",
    "ar-vr": "virtual-reality,augmented-reality",
    "machine-learning": "machine-learning,ai,data",
    "artificial-intelligence": "artificial-intelligence,robot",
    "python": "python,programming,code",
    "python-fullstack": "python,web,developer",
    "java": "java,programming,code",
    "android-app-development": "mobile-app,smartphone,developer",
    "selenium-java": "software-testing,automation",
    "probability-statistics": "statistics,mathematics,data",
    "computer-organization": "computer,hardware,circuit",
    "dbms": "database,server,data",
    "biostatistics": "statistics,biology,research",
    "clinical-sas": "clinical,research,healthcare",
    "genetic-engineering": "genetics,dna,laboratory",
    "nano-tech": "nanotechnology,science,laboratory",
    "acca-f4-business": "law,business,office",
    "entrepreneurship": "startup,entrepreneur,business",
    "investment-banking": "investment,banking,finance",
    "microsoft-excel": "excel,spreadsheet,business",
    "placement-preparation": "interview,career,graduation",
    "ai-for-economics": "economics,ai,analytics",
    "product-management": "product,strategy,business",
    "scld": "control-systems,engineering,laboratory",
}


def parse_courses(catalog_text: str) -> list[dict[str, str]]:
    blocks = re.split(r"\bcourse\(", catalog_text)[1:]
    courses: list[dict[str, str]] = []
    seen: set[str] = set()
    for block in blocks:
        slug_m = re.search(r'^\s*"([^"]+)"', block)
        title_m = re.search(r'^\s*"[^"]+",\s*\n?\s*"([^"]+)"', block)
        if not slug_m or not title_m:
            continue
        slug, title = slug_m.group(1), title_m.group(1)
        if slug in seen:
            continue
        seen.add(slug)
        courses.append({"slug": slug, "title": title})
    return courses


def flickr_tag_for(slug: str) -> str:
    if slug in THEME_KEYWORDS:
        return THEME_KEYWORDS[slug].split(",")[0]
    if slug.startswith("sap-"):
        return "business"
    return slug.split("-")[0] or "education"


def theme_for(slug: str) -> str:
    if slug in THEME_KEYWORDS:
        return THEME_KEYWORDS[slug]
    if slug.startswith("sap-"):
        return "sap,enterprise,business"
    parts = slug.replace("-", ",")
    return f"{parts},education,technology"


def fetch_background(slug: str, width: int = 960, height: int = 540) -> Image.Image:
    """Fetch a themed photo via loremflickr; fall back to procedural gradient."""
    seed = int(hashlib.md5(slug.encode()).hexdigest()[:8], 16)
    tag = flickr_tag_for(slug)
    urls = [
        f"https://loremflickr.com/{width}/{height}/{tag}/all?lock={seed}",
        f"https://loremflickr.com/{width}/{height}/{tag},{seed % 100}/all",
    ]
    for url in urls:
        tmp_path = ""
        try:
            with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
                tmp_path = tmp.name
            result = subprocess.run(
                ["curl", "-fsSL", "-A", "NyerasThumbnailBot/1.0", "-o", tmp_path, url],
                capture_output=True,
                timeout=30,
            )
            if result.returncode != 0:
                continue
            img = Image.open(tmp_path).convert("RGB")
            return img.resize((width, height), Image.Resampling.LANCZOS)
        except (OSError, subprocess.TimeoutExpired):
            continue
        finally:
            if tmp_path:
                Path(tmp_path).unlink(missing_ok=True)
    return procedural_background(slug, width, height)


def procedural_background(slug: str, width: int, height: int) -> Image.Image:
    seed = int(hashlib.md5(slug.encode()).hexdigest()[:8], 16)
    r1, g1, b1 = 40 + seed % 80, 30 + (seed >> 8) % 70, 90 + (seed >> 16) % 100
    r2, g2, b2 = 10 + (seed >> 4) % 50, 20 + (seed >> 12) % 60, 40 + (seed >> 20) % 80
    img = Image.new("RGB", (width, height), (r1, g1, b1))
    draw = ImageDraw.Draw(img)
    for y in range(height):
        t = y / height
        color = (
            int(r1 * (1 - t) + r2 * t),
            int(g1 * (1 - t) + g2 * t),
            int(b1 * (1 - t) + b2 * t),
        )
        draw.line([(0, y), (width, y)], fill=color)
    return img


def load_font(size: int, bold: bool = True) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    path = FONT_BOLD if bold else FONT_REG
    try:
        return ImageFont.truetype(path, size=size)
    except OSError:
        return ImageFont.load_default()


def wrap_title(title: str, max_chars: int = 18) -> str:
    lines = textwrap.wrap(title, width=max_chars)
    if len(lines) > 3:
        lines = textwrap.wrap(title, width=max_chars + 4)[:3]
        if len(lines) == 3 and len(title) > len("\n".join(lines)):
            lines[2] = lines[2].rstrip(".") + "…"
    return "\n".join(lines)


def render_thumbnail(title: str, slug: str) -> Image.Image:
    width, height = 960, 540
    base = fetch_background(slug, width, height)
    overlay = Image.new("RGBA", (width, height), (15, 10, 40, 100))
    img = Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")

    # light blur for polish while keeping photo visible
    img = img.filter(ImageFilter.GaussianBlur(radius=0.3))
    draw = ImageDraw.Draw(img)
    for i in range(40):
        alpha = int(180 * (i / 40) ** 2)
        draw.rectangle([(0, height - i * 3), (width, height)], fill=(0, 0, 0, 0))
    vignette = Image.new("L", (width, height), 0)
    vdraw = ImageDraw.Draw(vignette)
    vdraw.ellipse((-width * 0.2, -height * 0.2, width * 1.2, height * 1.2), fill=210)
    dark = Image.new("RGB", (width, height), (0, 0, 0))
    img = Image.composite(img, dark, vignette)

    draw = ImageDraw.Draw(img)
    text = wrap_title(title)
    font_size = 58 if len(text) <= 12 else 48 if len(text) <= 20 else 40
    font = load_font(font_size, bold=True)

    bbox = draw.multiline_textbbox((0, 0), text, font=font, align="center", spacing=8)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (width - tw) / 2
    y = (height - th) / 2 - 10

    # shadow
    draw.multiline_text((x + 2, y + 2), text, font=font, fill=(0, 0, 0), align="center", spacing=8)
    draw.multiline_text((x, y), text, font=font, fill=(255, 255, 255), align="center", spacing=8)

    # brand accent bar
    bar_w = min(tw + 80, width - 80)
    bar_x = (width - bar_w) / 2
    draw.rounded_rectangle(
        (bar_x, y - 28, bar_x + bar_w, y - 8),
        radius=6,
        fill=(102, 0, 204),
    )
    draw.text((bar_x + 16, y - 26), "NYERAS COURSE", font=load_font(14, bold=True), fill=(255, 255, 255))

    return img


def update_catalog_paths(courses: list[dict[str, str]]) -> None:
    text = CATALOG.read_text()
    for c in courses:
        slug = c["slug"]
        new_path = f'"/courses/{slug}.png"'
        pattern = rf'(course\(\s*"{re.escape(slug)}"[\s\S]*?)"/(?:courses/)?[^"]+\.(?:png|jpg|jpeg|webp)"'
        text, n = re.subn(pattern, rf"\1{new_path}", text)
        if n == 0:
            print(f"warn: could not update image path for {slug}")
    CATALOG.write_text(text)


def main() -> int:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    courses = parse_courses(CATALOG.read_text())
    assets_dir = ROOT.parent / ".cursor/projects/Users-challachinnaobulesh-Downloads-Nyeras-Main-Website-main/assets"
    if not assets_dir.exists():
        assets_dir = Path("/Users/challachinnaobulesh/.cursor/projects/Users-challachinnaobulesh-Downloads-Nyeras-Main-Website-main/assets")
    manifest = []
    for i, c in enumerate(courses, 1):
        slug, title = c["slug"], c["title"]
        out = OUT_DIR / f"{slug}.png"
        ai_asset = assets_dir / f"{slug}.png"
        if ai_asset.is_file():
            print(f"[{i}/{len(courses)}] {slug} (AI asset) …", flush=True)
            img = Image.open(ai_asset).convert("RGB").resize((960, 540), Image.Resampling.LANCZOS)
            img.save(out, format="PNG", optimize=True)
        else:
            print(f"[{i}/{len(courses)}] {slug} …", flush=True)
            img = render_thumbnail(title, slug)
            img.save(out, format="PNG", optimize=True)
        manifest.append({"slug": slug, "title": title, "file": f"/courses/{slug}.png"})
    (ROOT / "scripts/course-thumbnails-manifest.json").write_text(json.dumps(manifest, indent=2))
    update_catalog_paths(courses)
    print(f"Done. Generated {len(courses)} thumbnails.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

"""画像生成モジュール - Pillowを使用してテンプレートから画像を作成"""

import logging
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
TEMPLATES_DIR = BASE_DIR / "templates"
OUTPUT_DIR = BASE_DIR / "output"


def generate_image(post_config: dict, settings: dict, base_dir: Path | None = None) -> Path:
    """投稿設定に基づいて画像を生成する。

    Args:
        post_config: 投稿のYAML設定
        settings: グローバル設定
        base_dir: プロジェクトのベースディレクトリ

    Returns:
        生成された画像ファイルのパス
    """
    if base_dir is None:
        base_dir = BASE_DIR

    templates_dir = base_dir / "templates"
    output_dir = base_dir / "output"
    output_dir.mkdir(exist_ok=True)

    defaults = settings.get("defaults", {})
    template = post_config.get("template", {})

    # 出力サイズ
    output_size = tuple(template.get("output_size", defaults.get("output_size", [1080, 1080])))

    # 背景画像の読み込みまたは作成
    bg_name = template.get("background", defaults.get("background"))
    bg_path = templates_dir / "backgrounds" / bg_name if bg_name else None

    if bg_path and bg_path.exists():
        img = Image.open(bg_path).convert("RGBA")
        img = img.resize(output_size, Image.LANCZOS)
        logger.info("背景画像を読み込みました: %s", bg_path)
    else:
        img = _create_gradient_background(output_size)
        logger.info("デフォルトのグラデーション背景を生成しました")

    draw = ImageDraw.Draw(img)

    text_lines = template.get("text_lines", [])
    for line in text_lines:
        _draw_text_line(draw, line, defaults, templates_dir)

    overlay_name = template.get("overlay")
    if overlay_name:
        overlay_path = templates_dir / "overlays" / overlay_name
        if overlay_path.exists():
            _apply_overlay(img, overlay_path)
            logger.info("オーバーレイを適用しました: %s", overlay_path)

    output_img = img.convert("RGB")
    post_slug = post_config.get("_slug", "post")
    output_path = output_dir / f"{post_slug}.png"
    output_img.save(output_path, "PNG", quality=95)
    logger.info("画像を保存しました: %s", output_path)

    return output_path


def _create_gradient_background(size: tuple[int, int]) -> Image.Image:
    """グラデーション背景を生成する。"""
    width, height = size
    img = Image.new("RGBA", size)

    for y in range(height):
        ratio = y / height
        r = int(30 + 50 * ratio)
        g = int(30 + 30 * ratio)
        b = int(80 + 100 * ratio)
        for x in range(width):
            img.putpixel((x, y), (r, g, b, 255))

    return img


def _draw_text_line(
    draw: ImageDraw.ImageDraw,
    line_config: dict,
    defaults: dict,
    templates_dir: Path,
) -> None:
    """1行のテキストを描画する。"""
    text = line_config.get("text", "")
    if not text:
        return

    font_name = line_config.get("font", defaults.get("font", "NotoSansJP-Bold.ttf"))
    font_size = line_config.get("size", defaults.get("font_size", 56))
    font_color = line_config.get("color", defaults.get("font_color", "#FFFFFF"))
    position = tuple(line_config.get("position", [540, 540]))

    font_path = templates_dir / "fonts" / font_name
    if font_path.exists():
        font = ImageFont.truetype(str(font_path), font_size)
    else:
        logger.warning("フォントが見つかりません: %s（デフォルトフォントを使用）", font_path)
        font = ImageFont.load_default()

    draw.text(position, text, fill=font_color, font=font, anchor="mm")


def _apply_overlay(base: Image.Image, overlay_path: Path) -> None:
    """オーバーレイ画像を右下に合成する。"""
    overlay = Image.open(overlay_path).convert("RGBA")

    max_size = min(base.size) // 5
    if overlay.width > max_size or overlay.height > max_size:
        overlay.thumbnail((max_size, max_size), Image.LANCZOS)

    padding = 20
    x = base.width - overlay.width - padding
    y = base.height - overlay.height - padding
    base.paste(overlay, (x, y), overlay)

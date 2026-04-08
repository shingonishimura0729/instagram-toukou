"""メインオーケストレーター - 画像生成とInstagram投稿を統括"""

import argparse
import logging
import os
import sys
from pathlib import Path

import yaml

from src.image_generator import generate_image
from src.instagram_client import InstagramAPIError, post_image

BASE_DIR = Path(__file__).resolve().parent.parent

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


def load_yaml(path: Path) -> dict:
    """YAMLファイルを読み込む。"""
    with open(path, encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def load_settings(base_dir: Path) -> dict:
    """グローバル設定を読み込む。"""
    settings_path = base_dir / "config" / "settings.yaml"
    if not settings_path.exists():
        logger.warning("設定ファイルが見つかりません: %s", settings_path)
        return {}
    return load_yaml(settings_path)


def load_post_config(post_file: str, base_dir: Path) -> dict:
    """投稿設定を読み込む。"""
    post_path = base_dir / post_file
    if not post_path.exists():
        logger.error("投稿設定ファイルが見つかりません: %s", post_path)
        sys.exit(1)

    config = load_yaml(post_path)
    config["_slug"] = post_path.stem
    return config


def build_caption(post_config: dict, settings: dict) -> str:
    """キャプションを構築する。"""
    caption = post_config.get("caption", "").strip()

    if post_config.get("hashtags_append") and settings.get("hashtags"):
        hashtags = " ".join(settings["hashtags"])
        caption = f"{caption}\n{hashtags}"

    return caption


def cmd_generate(args: argparse.Namespace) -> None:
    """画像生成コマンド。"""
    settings = load_settings(BASE_DIR)
    post_config = load_post_config(args.post_file, BASE_DIR)

    output_path = generate_image(post_config, settings, BASE_DIR)
    logger.info("画像生成完了: %s", output_path)


def cmd_publish(args: argparse.Namespace) -> None:
    """Instagram投稿コマンド。"""
    settings = load_settings(BASE_DIR)
    post_config = load_post_config(args.post_file, BASE_DIR)
    ig_settings = settings.get("instagram", {})

    user_id = os.environ.get(ig_settings.get("user_id_env", "INSTAGRAM_USER_ID"))
    access_token = os.environ.get(ig_settings.get("access_token_env", "INSTAGRAM_ACCESS_TOKEN"))

    if not user_id or not access_token:
        logger.error(
            "Instagram認証情報が設定されていません。"
            "環境変数 INSTAGRAM_USER_ID と INSTAGRAM_ACCESS_TOKEN を設定してください。"
        )
        sys.exit(1)

    image_url = args.image_url
    if not image_url:
        logger.error("画像URLが指定されていません。--image-url オプションを使用してください。")
        sys.exit(1)

    caption = build_caption(post_config, settings)

    try:
        media_id = post_image(user_id, access_token, image_url, caption)
        logger.info("Instagram投稿成功！ メディアID: %s", media_id)
    except InstagramAPIError as e:
        logger.error("Instagram投稿失敗: %s", e)
        sys.exit(1)


def main() -> None:
    parser = argparse.ArgumentParser(description="Instagram自動投稿ツール")
    subparsers = parser.add_subparsers(dest="command", required=True)

    gen_parser = subparsers.add_parser("generate", help="画像を生成する")
    gen_parser.add_argument("post_file", help="投稿設定YAMLファイルのパス")
    gen_parser.set_defaults(func=cmd_generate)

    pub_parser = subparsers.add_parser("publish", help="Instagramに投稿する")
    pub_parser.add_argument("post_file", help="投稿設定YAMLファイルのパス")
    pub_parser.add_argument("--image-url", required=True, help="公開アクセス可能な画像URL")
    pub_parser.set_defaults(func=cmd_publish)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()

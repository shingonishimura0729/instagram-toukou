"""Instagram Graph API クライアント - 画像投稿を管理"""

import logging
import time

import requests

logger = logging.getLogger(__name__)

GRAPH_API_BASE = "https://graph.instagram.com/v25.0"


class InstagramAPIError(Exception):
    """Instagram API のエラー"""

    def __init__(self, message: str, error_type: str = "", code: int = 0):
        self.error_type = error_type
        self.code = code
        super().__init__(message)


def create_media_container(
    user_id: str,
    access_token: str,
    image_url: str,
    caption: str,
) -> str:
    """メディアコンテナを作成する（投稿のステップ1）。"""
    url = f"{GRAPH_API_BASE}/{user_id}/media"
    params = {
        "image_url": image_url,
        "caption": caption,
        "access_token": access_token,
    }

    response = requests.post(url, params=params, timeout=30)
    data = response.json()

    if "error" in data:
        err = data["error"]
        raise InstagramAPIError(
            err.get("message", "Unknown error"),
            err.get("type", ""),
            err.get("code", 0),
        )

    container_id = data.get("id")
    if not container_id:
        raise InstagramAPIError("コンテナIDがレスポンスに含まれていません")

    logger.info("メディアコンテナを作成しました: %s", container_id)
    return container_id


def check_container_status(access_token: str, container_id: str) -> str:
    """メディアコンテナのステータスを確認する。"""
    url = f"{GRAPH_API_BASE}/{container_id}"
    params = {"fields": "status_code", "access_token": access_token}

    response = requests.get(url, params=params, timeout=30)
    data = response.json()

    if "error" in data:
        err = data["error"]
        raise InstagramAPIError(
            err.get("message", "Unknown error"),
            err.get("type", ""),
            err.get("code", 0),
        )

    return data.get("status_code", "UNKNOWN")


def publish_media(user_id: str, access_token: str, container_id: str) -> str:
    """メディアコンテナを公開する（投稿のステップ2）。"""
    url = f"{GRAPH_API_BASE}/{user_id}/media_publish"
    params = {"creation_id": container_id, "access_token": access_token}

    response = requests.post(url, params=params, timeout=30)
    data = response.json()

    if "error" in data:
        err = data["error"]
        raise InstagramAPIError(
            err.get("message", "Unknown error"),
            err.get("type", ""),
            err.get("code", 0),
        )

    media_id = data.get("id")
    if not media_id:
        raise InstagramAPIError("メディアIDがレスポンスに含まれていません")

    logger.info("メディアを公開しました: %s", media_id)
    return media_id


def wait_for_container(access_token: str, container_id: str, max_retries: int = 10, interval: float = 3.0) -> None:
    """コンテナのステータスが FINISHED になるまで待機する。"""
    for attempt in range(1, max_retries + 1):
        status = check_container_status(access_token, container_id)
        logger.info("コンテナステータス確認 (%d/%d): %s", attempt, max_retries, status)

        if status == "FINISHED":
            return
        if status == "ERROR":
            raise InstagramAPIError(f"メディアコンテナの処理に失敗しました (ID: {container_id})")

        time.sleep(interval)

    raise InstagramAPIError(f"コンテナの処理がタイムアウトしました ({max_retries * interval}秒経過)")


def post_image(user_id: str, access_token: str, image_url: str, caption: str) -> str:
    """画像をInstagramに投稿する（一連のフローを実行）。"""
    container_id = create_media_container(user_id, access_token, image_url, caption)
    wait_for_container(access_token, container_id)
    media_id = publish_media(user_id, access_token, container_id)
    return media_id

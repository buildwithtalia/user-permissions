from typing import Awaitable, Optional
from .utils.to_async import to_async
from ..permissions import PermissionsService
from ...net.sdk_config import SdkConfig


class PermissionsServiceAsync(PermissionsService):
    """
    Async Wrapper for PermissionsServiceAsync
    """

    def list_permissions(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().list_permissions)(request_config=request_config)

from typing import Awaitable, Optional, List
from .utils.to_async import to_async
from ..users import UsersService
from ...net.sdk_config import SdkConfig
from ...models import UpdateUserPermissionsRequest, GrantUserPermissionRequest


class UsersServiceAsync(UsersService):
    """
    Async Wrapper for UsersServiceAsync
    """

    def list_users(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().list_users)(request_config=request_config)

    def get_user_permissions(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().get_user_permissions)(request_config=request_config)

    def update_user_permissions(
        self,
        request_body: List[UpdateUserPermissionsRequest],
        user_id: str,
        *,
        request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().update_user_permissions)(
            request_body, user_id, request_config=request_config
        )

    def grant_user_permission(
        self,
        request_body: GrantUserPermissionRequest,
        *,
        request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().grant_user_permission)(
            request_body, request_config=request_config
        )

    def delete_users(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().delete_users)(request_config=request_config)

    def create_new_user(
        self, request_body: dict, *, request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().create_new_user)(
            request_body, request_config=request_config
        )

    def list_users_copy(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> Awaitable[any]:
        return to_async(super().list_users_copy)(request_config=request_config)

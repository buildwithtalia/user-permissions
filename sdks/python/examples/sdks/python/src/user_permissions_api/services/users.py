from typing import List, Optional
from .utils.validator import Validator
from .utils.base_service import BaseService
from ..net.transport.user_permissions_api_response import (
    UserPermissionsApiResponse,
    UserPermissionsApiMetadata,
)
from ..net.transport.serializer import Serializer
from ..net.sdk_config import SdkConfig
from ..net.environment.environment import Environment
from ..models.utils.cast_models import cast_models
from ..models import GrantUserPermissionRequest, UpdateUserPermissionsRequest


class UsersService(BaseService):
    """
    Service class for UsersService operations.
    Provides methods to interact with UsersService-related API endpoints.
    Inherits common functionality from BaseService including authentication and request handling.
    """

    def __init__(self, *args, **kwargs):
        """Initialize the service and method-level configurations."""
        super().__init__(*args, **kwargs)
        self._list_users_config: SdkConfig = {"environment": Environment.LOCALHOST4000}
        self._get_user_permissions_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }
        self._update_user_permissions_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }
        self._grant_user_permission_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }
        self._delete_users_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }
        self._create_new_user_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }
        self._list_users_copy_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }

    def set_list_users_config(self, config: SdkConfig):
        """
        Sets method-level configuration for list_users.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._list_users_config = config
        return self

    def set_get_user_permissions_config(self, config: SdkConfig):
        """
        Sets method-level configuration for get_user_permissions.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._get_user_permissions_config = config
        return self

    def set_update_user_permissions_config(self, config: SdkConfig):
        """
        Sets method-level configuration for update_user_permissions.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._update_user_permissions_config = config
        return self

    def set_grant_user_permission_config(self, config: SdkConfig):
        """
        Sets method-level configuration for grant_user_permission.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._grant_user_permission_config = config
        return self

    def set_delete_users_config(self, config: SdkConfig):
        """
        Sets method-level configuration for delete_users.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._delete_users_config = config
        return self

    def set_create_new_user_config(self, config: SdkConfig):
        """
        Sets method-level configuration for create_new_user.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._create_new_user_config = config
        return self

    def set_list_users_copy_config(self, config: SdkConfig):
        """
        Sets method-level configuration for list_users_copy.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._list_users_copy_config = config
        return self

    @cast_models
    def list_users(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> UserPermissionsApiResponse[any]:
        """list_users

        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        resolved_config = self._get_resolved_config(
            self._list_users_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users",
                [],
                resolved_config,
            )
            .serialize()
            .set_method("GET")
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

    @cast_models
    def get_user_permissions(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> UserPermissionsApiResponse[any]:
        """get_user_permissions

        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        resolved_config = self._get_resolved_config(
            self._get_user_permissions_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users/1/permissions",
                [],
                resolved_config,
            )
            .serialize()
            .set_method("GET")
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

    @cast_models
    def update_user_permissions(
        self,
        request_body: List[UpdateUserPermissionsRequest],
        user_id: str,
        *,
        request_config: Optional[SdkConfig] = None,
    ) -> UserPermissionsApiResponse[any]:
        """update_user_permissions

        :param request_body: The request body.
        :type request_body: List[UpdateUserPermissionsRequest]
        :param user_id: user_id
        :type user_id: str
        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        Validator(UpdateUserPermissionsRequest).is_array().is_nullable().validate(
            request_body
        )
        Validator(str).validate(user_id)

        resolved_config = self._get_resolved_config(
            self._update_user_permissions_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users/{{userId}}/permissions",
                [],
                resolved_config,
            )
            .add_path("userId", user_id)
            .serialize()
            .set_method("PUT")
            .set_body(request_body)
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

    @cast_models
    def grant_user_permission(
        self,
        request_body: GrantUserPermissionRequest,
        *,
        request_config: Optional[SdkConfig] = None,
    ) -> UserPermissionsApiResponse[any]:
        """grant_user_permission

        :param request_body: The request body.
        :type request_body: GrantUserPermissionRequest
        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        Validator(GrantUserPermissionRequest).is_nullable().validate(request_body)

        resolved_config = self._get_resolved_config(
            self._grant_user_permission_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users/1/permissions",
                [],
                resolved_config,
            )
            .serialize()
            .set_method("POST")
            .set_body(request_body)
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

    @cast_models
    def delete_users(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> UserPermissionsApiResponse[any]:
        """delete_users

        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        resolved_config = self._get_resolved_config(
            self._delete_users_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users/{user_id}",
                [],
                resolved_config,
            )
            .serialize()
            .set_method("DELETE")
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

    @cast_models
    def create_new_user(
        self, request_body: dict, *, request_config: Optional[SdkConfig] = None
    ) -> UserPermissionsApiResponse[any]:
        """Creates a new user with the specified details and permissions.

        :param request_body: The request body.
        :type request_body: dict
        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        Validator(dict).is_nullable().validate(request_body)

        resolved_config = self._get_resolved_config(
            self._create_new_user_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users",
                [],
                resolved_config,
            )
            .serialize()
            .set_method("POST")
            .set_body(request_body)
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

    @cast_models
    def list_users_copy(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> UserPermissionsApiResponse[any]:
        """list_users_copy

        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        resolved_config = self._get_resolved_config(
            self._list_users_copy_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/users",
                [],
                resolved_config,
            )
            .serialize()
            .set_method("GET")
        )

        response, status, _ = self.send_request(serialized_request)
        return UserPermissionsApiResponse(
            data=response,
            raw=self._last_response.raw,
            metadata=UserPermissionsApiMetadata(
                headers=dict(self._last_response.headers), status_code=status
            ),
        )

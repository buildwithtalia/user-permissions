from typing import Optional
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


class PermissionsService(BaseService):
    """
    Service class for PermissionsService operations.
    Provides methods to interact with PermissionsService-related API endpoints.
    Inherits common functionality from BaseService including authentication and request handling.
    """

    def __init__(self, *args, **kwargs):
        """Initialize the service and method-level configurations."""
        super().__init__(*args, **kwargs)
        self._list_permissions_config: SdkConfig = {
            "environment": Environment.LOCALHOST4000
        }

    def set_list_permissions_config(self, config: SdkConfig):
        """
        Sets method-level configuration for list_permissions.

        :param SdkConfig config: Configuration dictionary to override service-level defaults.
        :return: The service instance for method chaining.
        """
        self._list_permissions_config = config
        return self

    @cast_models
    def list_permissions(
        self, *, request_config: Optional[SdkConfig] = None
    ) -> UserPermissionsApiResponse[any]:
        """list_permissions

        ...
        :raises RequestError: Raised when a request fails, with optional HTTP status code and details.
        ...
        :return: The parsed response data.
        :rtype: any
        """

        resolved_config = self._get_resolved_config(
            self._list_permissions_config, request_config
        )

        serialized_request = (
            Serializer(
                f"{resolved_config.get('base_url') or self.base_url or Environment.LOCALHOST4000.url or Environment.DEFAULT.url}/permissions",
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

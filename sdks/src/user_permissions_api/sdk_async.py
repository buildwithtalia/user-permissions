from typing import Union
from .net.environment import Environment
from .sdk import UserPermissionsApi
from .services.async_.users import UsersServiceAsync
from .services.async_.permissions import PermissionsServiceAsync


class UserPermissionsApiAsync(UserPermissionsApi):
    """
    UserPermissionsApiAsync is the asynchronous version of the UserPermissionsApi SDK Client.
    """

    def __init__(
        self, base_url: Union[Environment, str, None] = None, timeout: int = 60000
    ):
        super().__init__(base_url=base_url, timeout=timeout)

        self.users = UsersServiceAsync(base_url=self._base_url)
        self.permissions = PermissionsServiceAsync(base_url=self._base_url)

from typing import Union
from .utils.json_map import JsonMap
from .utils.base_model import BaseModel
from .utils.sentinel import SENTINEL


@JsonMap({})
class GrantUserPermissionRequest(BaseModel):
    """GrantUserPermissionRequest

    :param permission: permission, defaults to None
    :type permission: str, optional
    :param granted: granted, defaults to None
    :type granted: bool, optional
    """

    def __init__(
        self,
        permission: Union[str, None] = SENTINEL,
        granted: Union[bool, None] = SENTINEL,
        **kwargs
    ):
        """GrantUserPermissionRequest

        :param permission: permission, defaults to None
        :type permission: str, optional
        :param granted: granted, defaults to None
        :type granted: bool, optional
        """
        if permission is not SENTINEL:
            self.permission = self._define_str("permission", permission, nullable=True)
        if granted is not SENTINEL:
            self.granted = granted
        self._kwargs = kwargs

from typing import TypeVar, Generic, Dict, List, Union
from dataclasses import dataclass
from requests import Response

T = TypeVar("T")


@dataclass
class UserPermissionsApiMetadata:
    """
    Metadata for an HTTP response.

    :ivar headers: The HTTP response headers.
    :type headers: Dict[str, Union[str, List[str]]]
    :ivar status_code: The HTTP response status code.
    :type status_code: int
    """

    headers: Dict[str, Union[str, List[str]]]
    status_code: int


@dataclass
class UserPermissionsApiResponse(Generic[T]):
    """
    A wrapped HTTP response containing the response data, raw response, and metadata.

    :ivar data: The parsed response data.
    :type data: T
    :ivar raw: The raw Response object from the HTTP client.
    :type raw: Response
    :ivar metadata: The response metadata including headers and status code.
    :type metadata: UserPermissionsApiMetadata
    """

    data: T
    raw: Response
    metadata: UserPermissionsApiMetadata

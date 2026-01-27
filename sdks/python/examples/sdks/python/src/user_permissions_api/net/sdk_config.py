from typing import TypedDict, Optional

from ..net.environment import Environment


class RetryConfig(TypedDict, total=False):
    """
    Configuration for retry behavior.

    :ivar int attempts: Maximum number of retry attempts.
    :ivar int delay_ms: Delay in milliseconds between retries.
    """

    attempts: int
    delay_ms: int


class ValidationConfig(TypedDict, total=False):
    """
    Configuration for response validation.

    :ivar bool response_validation: Whether to validate responses against schemas.
    """

    response_validation: bool


class SdkConfig(TypedDict, total=False):
    """
    Configuration dictionary for SDK, service, method, and request-level overrides.

    Hierarchy (highest to lowest priority):
    - Request config (passed directly to method call)
    - Method config (set via set_<method_name>_config())
    - Service config (set via set_config())
    - SDK config (set at initialization)

    :ivar str base_url: Base URL for API requests. Can be a string URL or Environment enum.
    :ivar Environment environment: Environment enum value for base URL.
    :ivar int timeout: Request timeout in milliseconds.
    :ivar RetryConfig retry: Retry configuration.
    :ivar ValidationConfig validation: Validation configuration.
    """

    base_url: str
    environment: Environment
    timeout: int
    retry: RetryConfig
    validation: ValidationConfig

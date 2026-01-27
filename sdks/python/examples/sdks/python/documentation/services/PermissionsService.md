# PermissionsService

A list of all methods in the `PermissionsService` service. Click on the method name to view detailed information about that method.

| Methods                               | Description |
| :------------------------------------ | :---------- |
| [list_permissions](#list_permissions) |             |

## list_permissions

- HTTP Method: `GET`
- Endpoint: `/permissions`

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

result = sdk.permissions.list_permissions()

print(result)
```

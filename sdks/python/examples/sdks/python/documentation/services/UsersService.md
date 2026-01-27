# UsersService

A list of all methods in the `UsersService` service. Click on the method name to view detailed information about that method.

| Methods                                             | Description                                                    |
| :-------------------------------------------------- | :------------------------------------------------------------- |
| [list_users](#list_users)                           |                                                                |
| [get_user_permissions](#get_user_permissions)       |                                                                |
| [update_user_permissions](#update_user_permissions) |                                                                |
| [grant_user_permission](#grant_user_permission)     |                                                                |
| [delete_users](#delete_users)                       |                                                                |
| [create_new_user](#create_new_user)                 | Creates a new user with the specified details and permissions. |
| [list_users_copy](#list_users_copy)                 |                                                                |

## list_users

- HTTP Method: `GET`
- Endpoint: `/users`

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

result = sdk.users.list_users()

print(result)
```

## get_user_permissions

- HTTP Method: `GET`
- Endpoint: `/users/1/permissions`

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

result = sdk.users.get_user_permissions()

print(result)
```

## update_user_permissions

- HTTP Method: `PUT`
- Endpoint: `/users/{userId}/permissions`

**Parameters**

| Name         | Type                                                                            | Required | Description       |
| :----------- | :------------------------------------------------------------------------------ | :------- | :---------------- |
| request_body | [List[UpdateUserPermissionsRequest]](../models/UpdateUserPermissionsRequest.md) | ✅       | The request body. |
| user_id      | str                                                                             | ✅       |                   |

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

request_body = [
    {
        "permission": "read",
        "granted": True
    }
]

result = sdk.users.update_user_permissions(
    request_body=request_body,
    user_id="userId"
)

print(result)
```

## grant_user_permission

- HTTP Method: `POST`
- Endpoint: `/users/1/permissions`

**Parameters**

| Name         | Type                                                                  | Required | Description       |
| :----------- | :-------------------------------------------------------------------- | :------- | :---------------- |
| request_body | [GrantUserPermissionRequest](../models/GrantUserPermissionRequest.md) | ✅       | The request body. |

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment
from user_permissions_api.models import GrantUserPermissionRequest

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

request_body = GrantUserPermissionRequest(
    permission="admin",
    granted=True
)

result = sdk.users.grant_user_permission(request_body=request_body)

print(result)
```

## delete_users

- HTTP Method: `DELETE`
- Endpoint: `/users/{user_id}`

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

result = sdk.users.delete_users()

print(result)
```

## create_new_user

Creates a new user with the specified details and permissions.

- HTTP Method: `POST`
- Endpoint: `/users`

**Parameters**

| Name         | Type | Required | Description       |
| :----------- | :--- | :------- | :---------------- |
| request_body | dict | ✅       | The request body. |

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

request_body = {}

result = sdk.users.create_new_user(request_body=request_body)

print(result)
```

## list_users_copy

- HTTP Method: `GET`
- Endpoint: `/users`

**Return Type**

`any`

**Example Usage Code Snippet**

```python
from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(
    base_url=Environment.DEFAULT.value,
    timeout=10000
)

result = sdk.users.list_users()

print(result)
```

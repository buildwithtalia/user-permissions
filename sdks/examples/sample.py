from user_permissions_api import UserPermissionsApi, Environment

sdk = UserPermissionsApi(base_url=Environment.DEFAULT.value, timeout=10000)

result = sdk.users.list_users()

print(result)

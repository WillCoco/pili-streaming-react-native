/**
 * 动态获取android权限 hook 
 */
import React from 'react';
import { PermissionsAndroid, Permission, InteractionManager } from 'react-native';
import { isIOS } from '../constants/DeviceInfo';

const usePermissions = (permissions: Array<Permission>) => {
  if (isIOS()) {
    return true;
  }

  const [status, setStatus]: Array<any> = React.useState();

  const getPermissionAsync = async () => {
    try {
      const r: any = await PermissionsAndroid.requestMultiple(permissions);

      let granted = false;
      permissions.forEach((p) => {
        if (r[p] === 'granted') {
          granted = true;
        }
      })

      if (status !== granted) {
        setStatus(granted)
      }
    } catch (err) {
      console.log('权限获取失败', err)
    }
  }

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      getPermissionAsync();
    })
  }, [])

  return status
}

export default usePermissions;
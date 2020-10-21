/**
 * 应用状态方法
 */
import { UserModel } from './model';
import { StateModel } from './index';

/**
 * App与用户环境初始化
 * @param {登陆用户} data 返回的用户认证信息
 */
const setAppToken = (data) => {
  // data = {
  //   userID: 5,
  //   roleID: 12,
  //   groupID: 2,
  //   nickName: '研发测试',
  //   access_token: '1adb4be4-91e2-be64-3bb3',
  //   expires_in: 7200,
  //   refresh_token: '2f40510f4b308363c',
  // };

  // 初始化数据
  //data = data || cache.getState();

  let _rb = false;
  if (data) {
    // 过期时间戳默认2小时
    data.expires_in = data.expires_in || 120;
    // 令牌过期时间
    data.tokenTimeOut = new Date().getTime() + data.expires_in * 60 * 1000;

    //  console.log(new Date(parseInt(data.tokenTimeOut) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' '));
    let _user = new UserModel();
    // 过期时间戳默认2小时
    _user.tokenTimeOut = data.tokenTimeOut;
    _user.expires_in = data.expires_in;

    if (data.userID) {
      _user.userID = data.userID;
    }

    if (data.roleID) {
      _user.roleID = data.roleID;
    }

    if (data.groupID) {
      _user.groupID = data.groupID;
    }

    if (data.nickName) {
      _user.nickName = data.nickName;
    }

    // 应用编码 Key
    let _app = '10000';
    // console.log(_app);
    if (data.appKey) {
      _app.key = data.appKey;
    }

    // 应用验证码
    if (data.appSecret) {
      _app.secret = data.appSecret;
    }

    if (data.phone) {
      _user.phone = data.phone;
      // 禁止写入本地缓存
      delete data.phone;
    }

    if (data.access_token) {
      // 当前活动令牌
      _user.token = data.access_token;
      //

      console.log('store.setAppToken', '需补充存储方法');

      // 禁止写入本地缓存
      delete data.access_token;
    }

    if (data.refresh_token) {
      // 刷新令牌
      _user.tokenRefresh = data.refresh_token;
    }

    setUserState(_user);
    console.log('store.setAppToken', '缓存App票据认证逻辑方法');
    _rb = true;
  }
  return _rb;
};

/**
 * 用户注销登录
 */
const LoginOut = () => {
  // 当前用户
  setUserState(new UserModel());
  // removeSession();
  // removeCacheState();
  console.log('store.setAppToken', '用户注销登录逻辑方法');
  return true;
};

/**
 * 获取用户ID
 */
const getUserRoleID = () => {
  // 当前用户
  // const store = useGlobalStore();
  //console.log(store);
  const _roleID = StateModel.user.roleID || 0;
  //console.log(_roleID);
  return _roleID;
};

/**
 * 更新全部用户信息
 * @param {*} _user
 */
const setUserState = (_user) => {
  // console.log('setUserState', _user);
  StateModel.user = _user;
};

/**
 * 通用 meta.roles 配置验证权限
 * @param {*} to 跳转路由
 * @param {*} _roleID 登陆用户角色组ID
 */
const AuthHasPermission = function (roles, _roleID) {
  // 需要权限认证
  let _bool = false;

  _roleID = _roleID || getUserRoleID();

  if (roles && _roleID) {
    //  console.log(to.meta.roles);
    // 取出用户角色组
    // let _roleID = store.getters.roleID;
    // 通过vuex state获取当前的状态是否存在
    if (_roleID > 0) {
      // 默认权限，用户登陆过即可
      _bool = true;
    }
  }

  return _bool;
};

export { getUserRoleID, AuthHasPermission, LoginOut, setAppToken };

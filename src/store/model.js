/**
 * 用户对象
 */
class UserModel {
  /**
   * 初始化绑定用户对象
   * @param {*} option 传入参数
   */
  constructor(option) {
    for (let k in option) {
      this[k] = option[k];
    }
  }
  // 用户ID
  userID = 0;
  // 用户昵称
  nickName = '请登陆';
  // 用户角色组ID
  roleID = 0;
  // 组织ID
  groupID = 0;
  // 用户票据
  token = '';
  // 用户自动登陆刷新票据
  tokenRefresh = '';
  // 默认过期时间
  expires_in = 120;
  // 票据超时时间戳
  tokenTimeOut = 0;
  // 用户头像
  avator = '/static/img/avator.jpg';
  /** 未读消息条数 */
  messageInt = 0;
}

export { UserModel };

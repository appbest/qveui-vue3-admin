/**
 * 服务器地址
 */

let host = {
  /**
   * 数据请求服务器地址
   */
  base: process.env.BASE_API || '',

  /** 推送服务器 */
  io: 'wss://io.com',
  /**
   * 微信服务器地址
   */
  wechat: 'http://wx.com',
  /**
   * 静态文件库服务器地址
   */
  lib: 'http://lib.com/',
};

/** Api 连接库
 *  按规范书写格式
 */
const api = {
  // 登陆
  login: '/Auth/Login/',
  loginOAuth: '/Auth/OAuth/',
  loginOut: '/Auth/LoginOut/',
};

// 开发环境使用 easy-mock 数据，正式环境使用 json 文件
if (process.env.NODE_ENV === 'development') {
  host.base = 'http://localhost:5000';
  host.io = 'wss://localhost:5006';
}

/**
 * 毛玻璃背景动态图片
 */
const imgGlassList = () => {
  return [
    ['/static/img/bgm.jpg', ''],
    ['/static/img/bg_0.gif', 'filter:blur(0.2rem)'],
    ['/static/img/bg_1.gif', 'filter:blur(1rem)'],
    ['/static/img/bg_2.gif', 'filter:blur(0.2rem)'],
    [
      'https://cn.bing.com/th?id=OHR.FatBearWeek_ZH-CN2381854464_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      'filter:blur(0);',
    ],
    [
      'https://cn.bing.com/th?id=OHR.LaragangaMoth_ZH-CN2013788793_1024x768.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      'filter:blur(0) brightness(90%);',
    ],
    [
      'https://cn.bing.com/th?id=OHR.FraserRiver_ZH-CN1625992097_1024x768.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      '',
    ],
    [
      'https://cn.bing.com/th?id=OHR.GreatBlueShark_ZH-CN1757082635_1024x768.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      'filter:blur(0);',
    ],
  ];
};

export { api, host, imgGlassList };

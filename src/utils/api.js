import axios from 'axios'
import { Message, LoadingBar } from 'iview'
axios.interceptors.request.use(config => {
  LoadingBar.start();
  return config;
}, err => {
  Message.error({message: '请求超时!'});
  // return Promise.resolve(err);
})
axios.interceptors.response.use(resp => {
  console.log(resp)
  if (resp.data.status === 401 || resp.data.status == 403) {
      Message.error(resp.data.message);
      return;
  }
  if (resp.data.message) {
      Message.success(resp.data.message);
  }
  LoadingBar.finish();
  return resp;
  }, err => {
  console.log(err.response)
  if (err.response.status == 504 || err.response.status == 404) {
    Message.error('服务器被吃了⊙﹏⊙∥');
  } else if (err.response.status == 403) {
    Message.error(err.response.data.message);
  } else if (err.response.status == 401) {
    Message.error(err.response.data.message);
    if (err.response.data.message !== '用户名或密码错误') {
      sessionStorage.removeItem('wecoding_login_info');
      setTimeout(function () {
        window.location.href = '/index/signin';
      }, 2000);
    }
  } else {
    if (err.response.data.message) {
      Message.error(err.response.data.message);
    }else{
      Message.error('未知错误!');
    }
  }
  LoadingBar.error();
})
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import {appInfo} from '../constants/appInfos';
import { AxiosResponse } from '../constants/axiosResponse';
import { useDispatch, useSelector } from 'react-redux';
import { getData, saveData, saveToken } from '../utils/storageUtils';
import store from '../redux/store';
import { setToken } from '../redux/reducers/authReducers';

const axiosClient = axios.create({
  baseURL: appInfo.BASE_URL,
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  try {
    const state = store.getState(); // Lấy trạng thái hiện tại từ Redux store
    const token = state.authReducers.authData ? state.authReducers.authData.token : null; // Kiểm tra xem authData có tồn tại không
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error while setting authorization token:', error);
  }
  return config;
});

axiosClient.interceptors.response.use(
  async (res: any) => {
    try {
      // Kiểm tra nếu có token và phản hồi thành công (status === 200)
      if (res.headers.authorization && res.status === 200) {
        const token = res.headers.authorization;
        await saveToken(token); // Lưu token vào AsyncStorage
      }
      return res.data;
    } catch (error) {
      console.log('Error api:', error);
      throw new Error('Error');
    }
  },
  (error: any) => {
    if (error.response) {
      const errorData = error.response.data;
      throw new Error(JSON.stringify({ error: errorData, message: 'Đã xảy ra lỗi' }));
    } else {
      console.log('Error api:', JSON.stringify(error));
      throw new Error('Error');
    }
  }
);






export default axiosClient;

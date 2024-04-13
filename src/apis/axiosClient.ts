import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import queryString from 'query-string';
import { appInfo } from '../constants/appInfos';
import { AxiosResponse } from '../constants/axiosResponse';
import { saveToken } from '../utils/storageUtils';
import store from '../redux/store';

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
    } catch (error: any) {
      console.log('Error api:', error.message);
      throw new Error('Error');
    }
  },
  (error: any) => {
    if (error.response) {
      const errorData = error.response.data;
      throw new Error(JSON.stringify({ message: 'Đã xảy ra lỗi' }));
    } else {
      console.log('Error api:', error.message);
      throw new Error('Error');
    }
  }
);

export const uploadImage = async (url: string, formData: FormData) => {
  try {
    const response = await axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error uploading image:', error.message);
    throw new Error('Error uploading image');
  }
};

export default axiosClient;

import { appInfo } from '../constants/appInfos';
import axiosClient from './axiosClient';

class AuthAPI {
  HandleAuthentication = async (
    url: string,
    data?: any | FormData, // Sử dụng union type cho tham số data
    method?: 'get' | 'post' | 'put' | 'delete',
  ) => {
    let config: any = {
      method: method ?? 'get',
    };

    // Nếu là yêu cầu POST hoặc PUT và có dữ liệu
    if ((method === 'post' || method === 'put') && data instanceof FormData) {
      config = {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };
    } else {
      // Nếu không phải là FormData, truyền dữ liệu thông thường
      config = {
        ...config,
        data: data,
      };
    }

    // Gửi yêu cầu đến API
    return await axiosClient(`/api${url}`, config);
  };
}

const authenticationAPI = new AuthAPI();
export default authenticationAPI;

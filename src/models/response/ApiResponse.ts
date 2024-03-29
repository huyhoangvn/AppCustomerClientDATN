import { AxiosResponse } from 'axios';

export interface ApiResponse {
    list?: any[]; // Array type may vary, adjust as needed
    index?: Record<string, any>; // Adjust value type as needed
    success: boolean;
    msg: string;
    count?: number;
    totalPages?: number;
    currentPage?: number;
    error?: string;
}

//Không xài được với Axios Response do api trả về khác với định dạng Axios Response
//Để ghi nhớ thôi còn lại xài any nha
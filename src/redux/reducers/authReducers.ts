import { createSlice } from "@reduxjs/toolkit";
import { KhachHang } from "../../models/KhachHang";
import { CuaHang } from "../../models/CuaHang";

const initialState: KhachHang = {
    _id: '',
    TenKH: '',
    taiKhoan: '',
    gioiTinh: 0,
    hinhAnh: '',
    diaChi: '',
    sdt: '',
    trangThai: false,
};

const authSlide = createSlice({
    name: "auth",
    initialState: {
        authData:initialState
    },
    reducers: {
        addAuth: (state, action) => {
            state.authData = action.payload; // Update authData field in state
        },
        setToken: (state, action) => {
            state.authData.token = action.payload; // Update token field in authData
        },
        deleteToken: (state) => {
            state.authData.token = ''; // Reset token field in authData
        }
    },
});




export const authReducers = authSlide.reducer;

export const { addAuth, setToken, deleteToken } = authSlide.actions;
export const getAuth = (state: any) => state.authReducers; // Access entire auth state
export const getToken = (state: any) => state.authReducers.authData.token; // Access token field in authData


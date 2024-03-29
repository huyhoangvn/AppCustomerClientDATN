import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu dữ liệu cho dữ liệu lưu trữ
interface Data {
    idKH?: string;
    idCH?: string;
    idMon?: string;
    tenKH?: string;

    isChecked?: boolean;
    taiKhoan?: string
    matKhau?: string
}

// Lưu dữ liệu vào AsyncStorage
export const saveData = async (data: Data): Promise<void> => {
    try {
        await AsyncStorage.setItem('Data', JSON.stringify(data));
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

// Lấy dữ liệu từ AsyncStorage
export const getData = async (): Promise<Data | null> => {
    try {
        const Data = await AsyncStorage.getItem('Data');
        if (Data !== null) {
            // console.log('Data retrieved successfully:', JSON.parse(Data));
            return JSON.parse(Data);
        } else {
            console.log('No data found');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving data:', error);
        return null;
    }
};

// Cập nhật dữ liệu trong AsyncStorage
export const updateData = async (updatedData: Partial<Data>): Promise<void> => {
    try {
        const currentData = await getData();
        if (currentData) {
            const newData = { ...currentData, ...updatedData };
            await saveData(newData);
            console.log('Data updated successfully');
        } else {
            console.log('No data found to update');
        }
    } catch (error) {
        console.error('Error updating data:', error);
    }
};

// Xóa dữ liệu từ AsyncStorage
export const deleteData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Data deleted successfully:', key);
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};

// Lưu token vào AsyncStorage
export const saveToken = async (token: string): Promise<void> => {
    try {
        await AsyncStorage.setItem('Token', token);
        console.log('Token saved successfully');
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

// Lấy token từ AsyncStorage
export const getToken = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem('Token');
        if (token !== null) {
            return token;
        } else {
            console.log('No token found');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

// Xóa tất cả dữ liệu từ AsyncStorage
export const clearAllData = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
        console.log('All data cleared successfully');
    } catch (error) {
        console.error('Error clearing all data:', error);
    }
};

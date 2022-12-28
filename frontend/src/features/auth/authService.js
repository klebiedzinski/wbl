import axiosInstance from "../../config/axios_config";

// register user

export const registerUser = async (data) => {
    const response = await axiosInstance.post('/api/user/register', data);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
};

const authService = {
    registerUser
};

export default authService;



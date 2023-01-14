import { useState } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import axiosInstance from "../../config/axios_config";

export const useLogin = () => {

    const {dispatch} = useAuthContext();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        const response = axiosInstance.post("/user/login", {
            email,
            password
        })
        .then((response) => {
            if (response.data) {

                // save user data in local storage
                localStorage.setItem("user", JSON.stringify(response.data))

                // save user in context
                console.log(response.data)
                dispatch({type: "LOGIN", payload: response.data})

                setIsLoading(false);
                
            }
        })
        .catch((error) => {
            setIsLoading(false);
            setError(error.response.data.error)
        })
        
    };

    return {login, error, isLoading};
}
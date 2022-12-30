import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../config/axios_config";

export const useSignup = () => {

    const {dispatch} = useAuthContext();

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);
        console.log("wysyłam dane do serwera")
        
        const response = axiosInstance.post("/user/signup", {
            email,
            password
        })
        .then((response) => {
            if (response.data) {

                // save user data in local storage
                console.log("dokladnie to wrzuce", JSON.stringify(response.data))
                localStorage.setItem("user", JSON.stringify(response.data))

                // save user in context
                dispatch({type: "LOGIN", payload: response.data})

                setIsLoading(false);
                
            }
        }
        )
        .catch((error) => {
            setIsLoading(false);
            setError(error.response.data.error)
        }
        )

        
        
    };

    return {signup, error, isLoading};
}
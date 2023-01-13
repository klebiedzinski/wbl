// create custom hook for fetching data using axios and promises
import axiosInstance from "../config/axios_config";
import { useState, useEffect } from "react";
const useFetch = (url,token) => { 
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance
            .get(url,{headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }})
            .then((res) => {
                setData(res.data);
                setError(null);
            }
            )
            .catch((err) => {
                setError(err);
            }
            )
            .finally(() => {
                setIsLoading(false);
            }
            );
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
            

import axiosInstance from "../config/axios_config";
import { useState, useEffect } from "react";
const usePatch = (url, data) => {
    const [isPatched, setIsPatched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axiosInstance
            .patch(url, data)
            .then((res) => {
                setIsPatched(true);
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
    }, [url, data]);

    return { isPatched, isLoading, error };
}

export default usePatch;
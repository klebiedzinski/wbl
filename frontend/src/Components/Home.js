import { useEffect } from "react";
import axiosInstance from "../config/axios_config";
const Home = () => {
    // fetch data by axios
    useEffect(() => {
        axiosInstance.get("/teams")
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }, [])

    return ( 
        <div className="home">
            <h2>siema</h2>
            
        </div>
     );
}
 
export default Home;
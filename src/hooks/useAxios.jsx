import axios from "axios";

const  axiosInstanc = axios.create({
    baseURL: 'http://localhost:5000' 
});

const useAxiosPublic = () => {
    return axiosInstanc
};

export default useAxiosPublic;
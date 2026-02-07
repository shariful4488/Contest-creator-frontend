import axios from "axios";

const  axiosInstanc = axios.create({
    baseURL: 'https://create-contest-server.vercel.app' 
});

const useAxiosPublic = () => {
    return axiosInstanc
};

export default useAxiosPublic;
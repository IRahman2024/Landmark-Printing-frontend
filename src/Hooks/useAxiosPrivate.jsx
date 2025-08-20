import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'https://server-rosy-nine.vercel.app',
})
const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext);

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `${token}`;
        // console.log('request from interceptor ', token);
        config.headers.authorization = `${token}`
        return config;
    }, function (err) {
        return Promise.reject(err)
    });

    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (err) => {
        const status = err.response.status;
        // console.log('status error in interceptor ', status)
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(err);
    })

    return axiosSecure;
};

export default useAxiosSecure;
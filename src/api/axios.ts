import axios from "axios";
import store from "../store/store";
import { removeToken, setToken } from "../store/slices/tokenSlice";
import { clearUser } from "../store/slices/userSlice";


const CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
    TIMEOUT: 10000,
    REFRESH_TIMEOUT: 5000,
} as const;

const axiosBase = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: CONFIG.TIMEOUT,
    withCredentials: true
});

/*Using axiosBase to refresh the token might lead to an infinite loop 
as if it fails, it will try to refresh the token again and again*/
const axiosRefresh = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: CONFIG.REFRESH_TIMEOUT,
    withCredentials: true
});

axiosBase.interceptors.request.use((config) => {        
    const token = store.getState().token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    /*Only set the Content-Type header if it's not already set*/
    if (!config.headers['Content-Type']) {
        if (config.data instanceof FormData) {
            // Delete to let browser set it with boundary
            delete config.headers['Content-Type'];
        } else {
            config.headers['Content-Type'] = 'application/json';
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosBase.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    /****This would be here for now till i get around adding codes to the backend */
    const PUBLIC_ROUTES = [
        '/auth/signin',
        '/auth/signup',
        '/auth/refresh',
      ];

      const isPublicRoute = PUBLIC_ROUTES.some(route =>
        originalRequest.url.includes(route)
      );

      console.log(isPublicRoute);

    if(error.response?.status === 401 && !originalRequest._retry && !isPublicRoute){
        originalRequest._retry = true;
       try {
        const { data } = await axiosRefresh.post('/auth/refresh');
        console.log(data);
        store.dispatch(setToken(data.token));
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return axiosBase(originalRequest);
       } catch (refreshError) {
        store.dispatch(removeToken());
        store.dispatch(clearUser());
        /*Change this logout function to something SPA friendly*/
        //window.location.href = '/login';
        return Promise.reject(refreshError);
       }

    }

    return Promise.reject(error);
});



// Track if we're currently refreshing
// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
  
//   failedQueue = [];
// };

// Response interceptor - Handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
    
//     // If error is 401 and we haven't retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       // If we're already refreshing, queue this request
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => {
//           return api(originalRequest);
//         }).catch(err => {
//           return Promise.reject(err);
//         });
//       }
      
//       originalRequest._retry = true;
//       isRefreshing = true;
      
//       try {
//         // Call refresh endpoint
//         // The refresh token is automatically sent via cookie
//         await api.post('/auth/refresh');
        
//         // Refresh succeeded - new access token is now in cookie
//         processQueue(null, 'success');
//         isRefreshing = false;
        
//         // Retry the original request
//         return api(originalRequest);
//       } catch (refreshError) {
//         // Refresh failed - user needs to login again
//         processQueue(refreshError, null);
//         isRefreshing = false;
        
//         // Redirect to login
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       }
//     }
    
//     return Promise.reject(error);
//   }
// );



export default axiosBase;
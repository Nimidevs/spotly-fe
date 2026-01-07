import axiosBase from "../axios";

interface authData {
    email: string;
    password: string;
}

const authService = {
    signUp: async (data: authData) => {
        
            const response = await axiosBase.post('/auth/signup', data);
            return response.data;
        
    },
    signIn: async (data: authData) => {
        
            const response = await axiosBase.post('/auth/signin', data);
            return response.data;
        
    },
    signOut: async () => {
        
            const response = await axiosBase.post('/auth/signout');
            return response.data;
   
    },
    
}

export default authService;
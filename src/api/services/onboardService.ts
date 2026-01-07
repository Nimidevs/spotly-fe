import axiosBase from "../axios";

const onboardService = {
    joinReason: async (data: { reason: string }) => {
        const response = await axiosBase.put('/onboarding/join-reason', data);
        return response.data;
    },
    profileInfo: async (data: { firstname: string, lastname?: string, gender: 'MALE' | 'FEMALE', dateOfBirth: string, bio?: string }) => {
        const response = await axiosBase.put('/onboarding/profile-info', data);
        return response.data;
    },
    profileImage: async (data: FormData) => {
        const response = await axiosBase.put('/onboarding/avatar', data);
        return response.data;
    },
    locationPermission: async (data: { permission: string }) => {
        const response = await axiosBase.put('/onboarding/location-permission', data);
        return response.data;
    },
};

export default onboardService;
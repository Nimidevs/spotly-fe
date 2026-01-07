import { ChevronLeft, Loader2, Upload, X } from "lucide-react";
import { useNavigate } from "react-router";
import { ONBOARDING_ROUTES } from "../../utils/onboardingRoutes";
import { useState } from "react";
import onboardService from "../../api/services/onboardService";

export const ProfileImage = () => {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if(!imageFile || imageFile.size > 10 * 1024 * 1024) return;
        setAvatar(imageFile);
    }

    const handleNext = async () => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('avatar', avatar!);
            const response = await onboardService.profileImage(formData);
            if (response.success) {
                navigate(ONBOARDING_ROUTES.LOCATION_PERMISSION);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white flex">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-between p-10 relative">
            {/* Logo */}
            <div className="absolute top-10 left-10">
                <a
                    href="/"
                    className="text-2xl font-bold text-black tracking-tight hover:opacity-70 transition-opacity"
                >
                    spotly.
                </a>
            </div>

            {/* Main Content */}
            <div className="flex flex-col justify-center flex-1 max-w-lg">
                <span className="text-sm text-gray-600 font-medium mb-8">03 of 04</span>
                <h1 className="text-5xl font-bold text-black leading-tight mb-5">
                    Upload your profile image
                </h1>
                <p className="text-lg text-gray-500 leading-relaxed">
                    This will be used to identify you on the platform.
                </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => navigate(ONBOARDING_ROUTES.PROFILE_INFO)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    className={`px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors ${isLoading || !avatar ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={isLoading || !avatar}
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
                </button>
            </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[#fafafa]">
            {
                avatar ? (
                    <div className="flex items-center justify-center relative group">
                        <img src={URL.createObjectURL(avatar)} alt="Avatar" className="w-32 h-32" />
                        <button type="button" onClick={() => setAvatar(null)} className="absolute top-0 right-0 hidden group-hover:block">
                            <X className="w-6 h-6 text-black"/>
                        </button>
                    </div>
                ) : (
                    <label className="flex items-center w-3/4 justify-between border-2 border-dotted border-gray-300 rounded-lg p-4">
                        <input type="file" name="avatar" className="hidden" onChange={handleChange} accept="image/*" />
                        Upload Avatar
                        <div className="flex items-center gap-3">
                            <p className="text-gray-400">Upload</p>
                            <Upload className="w-6 h-6 text-gray-300"/>
                        </div>
                    </label>
                )
            }

            <div className="absolute bottom-10 text-sm text-gray-600 leading-relaxed">
                Note: We advise you to use a clear and well-lit image of <span className="font-bold">YOURSELF</span> as the images will be verified by our team.
            </div>
        </div>
    </div>
    )
}
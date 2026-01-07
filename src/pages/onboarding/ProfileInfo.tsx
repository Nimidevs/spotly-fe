import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ONBOARDING_ROUTES } from "../../utils/onboardingRoutes";
import { profileInfoSchema } from "../../validationSchemas";
import { useFormValidation } from "../../hooks/useFormValidation";
import { Loader2 } from "lucide-react";
import onboardService from "../../api/services/onboardService";

/*So when the profileInfo page loads the continue button is not rendered invalid why is that? i have a rough idea why, but i dont want error messages everywhere when the user just loads the page */


export default function ProfileInfo() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const { formData, handleChange, validateForm, errors, isValid, setFieldValue } = useFormValidation({
        schema: profileInfoSchema,
        initialValues: {
            firstname: "",
            lastname: "",
            gender: "" as "MALE" | "FEMALE",
            dateOfBirth: '', // Will be transformed to ISO string
            bio: "",
        },
    });

    const handleNext = async () => {
        if (!validateForm() || !isValid) return;
        try {
            setIsLoading(true);
            const response = await onboardService.profileInfo(formData);
            if (response.success) {
                navigate(ONBOARDING_ROUTES.PROFILE_IMAGE);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = e.target.value ? new Date(e.target.value) : new Date();
        handleChange(e);
        setFieldValue("dateOfBirth", date.toISOString().split("T")[0]);
    };

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
                    <span className="text-sm text-gray-600 font-medium mb-8">02 of 04</span>
                    <h1 className="text-5xl font-bold text-black leading-tight mb-5">
                        Tell us about yourself
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        We'll use this information to help you find the best people to connect with.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(ONBOARDING_ROUTES.JOIN_REASON)}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>
                    <button
                        type="button"
                        onClick={handleNext}
                        className={`px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors ${!isValid ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading || !isValid}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[#fafafa]">
                <form className="w-full max-w-lg space-y-5">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="firstname" className="text-sm font-medium text-black">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                        {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lastname" className="text-sm font-medium text-black">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                        {errors.lastname && <span className="text-red-500 text-sm">{errors.lastname}</span>}
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender" className="text-sm font-medium text-black">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
                        >
                            <option value="">Select your gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            {/* <option value="OTHER">Other</option>
                            <option value="PREFER_NOT_TO_SAY">Prefer not to say</option> */}
                        </select>
                        {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="dateOfBirth" className="text-sm font-medium text-black">
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleDateChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-black focus:outline-none focus:border-black transition-colors cursor-pointer"
                        />
                        {errors.dateOfBirth && <span className="text-red-500 text-sm">{errors.dateOfBirth}</span>}
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="bio" className="text-sm font-medium text-black">
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Tell us about yourself"
                            rows={5}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-black placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                        />
                        {errors.bio && <span className="text-red-500 text-sm">{errors.bio}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}
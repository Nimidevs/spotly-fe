import { Activity, Coffee, HelpCircle, Loader2, Lock, Network, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ONBOARDING_ROUTES } from "../../utils/onboardingRoutes";
import onboardService from "../../api/services/onboardService";

export default function JoinReason() {
    const navigate = useNavigate();
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleNext = async () => {
        
        try {
            setIsLoading(true);
            const response = await onboardService.joinReason({ reason: selectedReason!});
            if (response.success) {
                navigate(ONBOARDING_ROUTES.PROFILE_INFO);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    const reasons = [
        {
            label: "Casual Meetups",
            value: "CASUAL_MEETUP",
            description: "I want to meet new people and make new friends",
            icon: Coffee,
        },
        {
            label: "Networking",
            value: "NETWORKING",
            description: "I want to network with other professionals",
            icon: Network,
        },
        {
            label: "Friendship",
            value: "FRIENDSHIP",
            description: "I want to make new friends and build long-lasting relationships",
            icon: User,
        },
        {
            label: "Activity Partner",
            value: "ACTIVITY_PARTNER",
            description: "I want to find someone to do activities with",
            icon: Activity,
        },
        {
            label: "Other",
            value: "OTHER",
            description: "I have another reason",
            icon: HelpCircle,
        },
    ];

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
                    <span className="text-sm text-gray-600 font-medium mb-8">01 of 04</span>
                    <h1 className="text-5xl font-bold text-black leading-tight mb-5">
                        Why do you want to join Spotly?
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        Tell us why you would love to join Spotly, so we can help you find the best people to connect with.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={handleNext}
                        className={`px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors ${isLoading ? "opacity-50 cursor-not-allowed" : ""} ${!selectedReason ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading || !selectedReason}
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue"}
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[#fafafa]">
                <div className="max-w-lg w-full space-y-4">
                    {reasons.map((reason) => {
                        const IconComponent = reason.icon;
                        const isSelected = selectedReason === reason.value;
                        
                        return (
                            <label
                                key={reason.value}
                                className={`flex items-center justify-between p-5 border-2 rounded-lg cursor-pointer transition-all ${
                                    isSelected
                                        ? "border-black bg-white"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    {/* Icon Container */}
                                    <div
                                        className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                                            isSelected ? "bg-[#EBF934]" : "bg-white"
                                        }`}
                                    >
                                        <IconComponent className="w-6 h-6 text-black" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-black text-base mb-1">
                                            {reason.label}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {reason.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Radio Button */}
                                <div className="ml-4 shrink-0">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value={reason.value}
                                        checked={isSelected}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="w-5 h-5 cursor-pointer accent-black"
                                        style={{
                                            accentColor: '#000',
                                        }}
                                    />
                                </div>
                            </label>
                        );
                    })}
                </div>

                {/* Privacy Statement */}
                <div className="mt-10 flex items-start gap-2 text-sm text-gray-500 max-w-lg">
                    <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                    <p>
                        Spotly is committed to keep your activity private & give you controls to manage who can see your profile.
                    </p>
                </div>
            </div>
        </div>
    );
}

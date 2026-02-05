// import { ChevronLeft, MapPin } from "lucide-react";
// import { useNavigate } from "react-router";
// import { ONBOARDING_ROUTES } from "../../utils/onboardingRoutes";
// import { useEffect, useState } from "react";
// import onboardService from "../../api/services/onboardService";

// export const LocationPermission = () => {
//     const navigate = useNavigate();
//     const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | null>(null);


//     const handleGrantLocationPermission = async (status: string) => {
//         try {
//             const response = await onboardService.locationPermission({ permission: status });
//             if (response.status === 200) {
//                 console.log(response)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     // const requestLocationPermission = () => {
//     //     navigator.geolocation.getCurrentPosition((position) => {
//     //         console.log(position);
//     //         handleGrantLocationPermission("GRANTED");
//     //     }, (error) => {
//     //         handleGrantLocationPermission("DENIED");
//     //         console.log(error)
//     //     });
//     // }

//     useEffect(() => {
//         async function checkLocationPermission() {
//             if (!navigator.geolocation) {
//                 console.log("Geolocation is not supported by your browser");
//                 return;
//             }
//             const result = await navigator.permissions.query({ name: "geolocation" });
//             if(result.state === "granted") {
//                 setLocationPermission("granted");
//                 await handleGrantLocationPermission("GRANTED");
//             } else if (result.state === "denied") {
//                 setLocationPermission("denied");
//                 await handleGrantLocationPermission("DENIED");
//             } else if (result.state === "prompt") {
//                 setLocationPermission(null);
//                 navigator.geolocation.getCurrentPosition(async (position) => {
//                     console.log(position);
//                     await handleGrantLocationPermission("GRANTED");
//                 }, async (error) => {
//                     if(error.code === error.PERMISSION_DENIED) {
//                         setLocationPermission("denied");
//                         await handleGrantLocationPermission("DENIED");
//                     console.log(error)
//                 } else {
//                     console.log(error);
//                 }
//             },
//                 {
//                     enableHighAccuracy: true,
//                     timeout: 10000,
//                     maximumAge: 0
//                 });
//             }
//         }
//         checkLocationPermission();
//     }, []);


    
//     return (
//         <div className="min-h-screen bg-white flex">
//             {/* Left Side */}
//             <div className="flex-1 flex flex-col justify-between p-10 relative">
//                 {/* Logo */}
//                 <div className="absolute top-10 left-10">
//                     <a href="/" className="text-2xl font-bold text-black tracking-tight hover:opacity-70 transition-opacity">
//                         spotly.
//                     </a>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex flex-col justify-center flex-1 max-w-lg">
//                     <span className="text-sm text-gray-600 font-medium mb-8">04 of 04</span>
//                     <h1 className="text-5xl font-bold text-black leading-tight mb-5">
//                         Enable location access to discover people near you
//                     </h1>
//                     <p className="text-lg text-gray-500 leading-relaxed">
//                     Help us connect you with people in your area. Your location stays private and is only used to enhance your experience.
//                     </p>
//                 </div>

//                 {/* Navigation Buttons */}
//                 <div className="flex items-center gap-4">
//                     <button
//                         type="button"
//                         onClick={() => navigate(ONBOARDING_ROUTES.PROFILE_IMAGE)}
//                         className="px-6 py-3 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
//                     >
//                         <ChevronLeft className="w-5 h-5" />
//                         Previous
//                     </button>
//                 </div>
//             </div>

//             {/* Right Side */}
//             <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[#fafafa]">
//                 <div className="flex flex-col items-center justify-center">
//                     <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
//                         Grant Location Permission
//                         <MapPin className="w-6 h-6 text-white" />
//                     </button>
//                 </div>
//             </div>
//         </div>  
//     )
// }

import { ChevronLeft, MapPin, RefreshCw, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {setUser} from  "../../store/slices/userSlice";
import onboardService from "../../api/services/onboardService";
import { ONBOARDING_ROUTES } from "../../utils/onboardingRoutes";



export function LocationPermission() {
    const navigate = useNavigate();
    const [permissionState, setPermissionState] = useState<'checking' | 'prompt' | 'granted' | 'denied'>('checking');
    const [isLoading, setIsLoading] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    const dispatch = useDispatch();
    const savePermission = async (status: string) => {
        try {
            const response = await onboardService.locationPermission({ permission: status });
            alert(`${status === 'GRANTED' ? 'Get in joor' : 'Why now'}`)
            dispatch(setUser(response.user))
            navigate('/home')
        } catch (error) {
            console.error('Failed to save permission:', error);
        }
    };

    const checkInitialPermission = async () => {
        if (!navigator.geolocation) {
            setPermissionState('denied');
            return;
        }

        try {
            const result = await navigator.permissions.query({ name: "geolocation" });
            setPermissionState(result.state as 'prompt' | 'granted' | 'denied');

            // If already granted, save and proceed
            if (result.state === 'granted') {
                await savePermission('GRANTED');
                // navigate(ONBOARDING_ROUTES.COMPLETE);
            }

            // Listen for permission changes
            result.addEventListener('change', () => {
                setPermissionState(result.state as 'prompt' | 'granted' | 'denied');
            });
        } catch (error) {
            // Fallback if permissions API not supported
            console.log(error);
            setPermissionState('prompt');
        }
    };

    useEffect( () => {
        async function callCheckInitialPermission () {
            await checkInitialPermission();
        }
        callCheckInitialPermission();
    }, []); 

   
    const handleRequestLocation = () => {
        if (permissionState === 'denied') {
            setShowInstructions(true);
            return;
        }

        setIsLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log('Location obtained:', position.coords);
                await savePermission('GRANTED');
                setPermissionState('granted');
                setIsLoading(false);
               
            },
            async (error) => {
                setIsLoading(false);
                if (error.code === error.PERMISSION_DENIED) {
                    setPermissionState('denied');
                    await savePermission('DENIED');
                    setShowInstructions(true);
                } else {
                    console.error('Location error:', error);
                    alert('Failed to get location. Please try again.');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    // const handleSkip = async () => {
    //     setIsLoading(true);
    //     await savePermission('SKIPPED');
    //     setIsLoading(false);
    // };

    const getBrowserInstructions = () => {
        const isChrome = /Chrome/.test(navigator.userAgent);
        const isFirefox = /Firefox/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

        if (isChrome) {
            return [
                "Click the lock icon (🔒) in the address bar",
                "Find 'Location' and change it to 'Allow'",
                "Click 'Retry' below to continue"
            ];
        } else if (isFirefox) {
            return [
                "Click the shield/lock icon in the address bar",
                "Click permissions, then allow Location",
                "Click 'Retry' below to continue"
            ];
        } else if (isSafari) {
            return [
                "Go to Safari > Settings for This Website",
                "Change Location to 'Allow'",
                "Click 'Retry' below to continue"
            ];
        }

        return [
            "Check your browser's address bar for a location icon",
            "Change the location permission to 'Allow'",
            "Click 'Retry' below to continue"
        ];
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-between p-10 relative">
                {/* Logo */}
                <div className="absolute top-10 left-10">
                    <a href="/" className="text-2xl font-bold text-black tracking-tight hover:opacity-70 transition-opacity">
                        spotly.
                    </a>
                </div>

                {/* Main Content */}
                <div className="flex flex-col justify-center flex-1 max-w-lg">
                    <span className="text-sm text-gray-600 font-medium mb-8">04 of 04</span>
                    <h1 className="text-5xl font-bold text-black leading-tight mb-5">
                        Enable location access to discover people near you
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        Help us connect you with people in your area. Your location stays private and is only used to enhance your experience.
                    </p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(ONBOARDING_ROUTES.PROFILE_IMAGE)}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                        disabled={isLoading}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 flex flex-col items-center justify-center p-10 bg-[#fafafa]">
                {permissionState === 'checking' ? (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-gray-600">Checking permission status...</p>
                    </div>
                ) : showInstructions && permissionState === 'denied' ? (
                    <div className="max-w-md space-y-6">
                        <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        </div>
                        
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-black mb-2">
                                Location Access Blocked
                            </h3>
                            <p className="text-gray-600 mb-6">
                                You've previously blocked location access. To enable it:
                            </p>
                        </div>

                        <div className="bg-white rounded-lg p-6 space-y-3">
                            {getBrowserInstructions().map((instruction, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 text-sm">{instruction}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => {
                                    setShowInstructions(false);
                                    checkInitialPermission();
                                }}
                                className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Retry
                            </button>
                            {/* <button
                                onClick={handleSkip}
                                disabled={isLoading}
                                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors"
                            >
                                {isLoading ? 'Skipping...' : 'Skip for now'}
                            </button> */}
                        </div>
                    </div>
                ) : (
                    <div className="max-w-md space-y-8">
                        <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                            <MapPin className="w-12 h-12 text-black" />
                        </div>

                        <div className="space-y-6 text-left">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">1</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-1">Discover local spots</h3>
                                    <p className="text-gray-600 text-sm">Find trending places and hidden gems in your neighborhood.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">2</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-1">Connect with nearby users</h3>
                                    <p className="text-gray-600 text-sm">Meet people who share your interests in your area.</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0 mt-1">
                                    <span className="text-white text-sm font-bold">3</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-black mb-1">Your privacy matters</h3>
                                    <p className="text-gray-600 text-sm">We never share your exact location with other users.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleRequestLocation}
                                disabled={isLoading}
                                className="w-full px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Requesting...
                                    </>
                                ) : (
                                    <>
                                        Grant Location Permission
                                        <MapPin className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            {/* <button
                                onClick={handleSkip}
                                disabled={isLoading}
                                className="w-full px-6 py-3 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Skipping...' : 'Skip for now'}
                            </button> */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
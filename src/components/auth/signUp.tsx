import authService from "../../api/services/authService";
import type { OnboardFormProps } from "../../interfaces";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useAuthValidator } from "../../hooks/authValidatorHook";
import { setUser } from "../../store/slices/userSlice";
import { setToken } from "../../store/slices/tokenSlice";
import { useDispatch } from "react-redux";
import { ONBOARDING_ROUTES } from "../../utils/onboardingRoutes";
import { useNavigate } from "react-router";

const SignUp = ({ onSwitch }: OnboardFormProps) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { formData, error, handleChange, validateForm } = useAuthValidator();
  const navigate = useNavigate();
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await authService.signUp(formData);
      console.log(response);
      dispatch(setToken(response.token))
      dispatch(setUser(response.user))
      navigate(ONBOARDING_ROUTES.JOIN_REASON);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12 md:py-16 overflow-y-auto">
      <div className="max-w-md mx-auto w-full space-y-6">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black tracking-tight hover:opacity-70 transition-opacity inline-block">
            spotly.
          </h1>
        </div>

        {/* Headline */}
        <div>
          <h2 className="text-2xl md:text-3xl text-center font-bold text-black leading-tight">
            Join the community
          </h2>
          <p className="text-center text-gray-500 text-sm mt-2">
            Start connecting with people around you
          </p>
        </div>

        {/* Sign Up Buttons */}
        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors">
            Sign up with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSignUp} className="space-y-4" >
          <label className="flex flex-col gap-1">
          <input
            value={formData.email}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className={`w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors ${
              error?.email ? 'border-red-400' : ''
            }`}
          />
          <p className="text-red-500 text-xs">{error.email}</p>
          </label>
        
          <label className="flex flex-col gap-1">
            <div className={`flex items-center gap-2 w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors relative ${
              error?.password ? 'border-red-400' : ''
            }`}>
            <input
            value={formData.password}
            name="password"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="outline-none focus:outline-none w-full"
          />
          <button type="button" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeIcon className="w-5 h-5 text-gray-500" /> : <EyeOffIcon className="w-5 h-5 text-gray-500" />}
            </button>
            </div>
          <p className="text-red-500 text-xs">{error.password}</p>
          </label>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <button className="text-black font-semibold hover:underline" onClick={() => onSwitch('login')}>
            Sign in
          </button>
        </p>

        {/* Legal Text */}
        <p className="text-xs text-gray-500 text-center">
          By signing up you are agreeing to our{" "}
          <a href="#" className="text-black hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="text-black hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

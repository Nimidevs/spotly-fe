import type { OnboardFormProps } from "../../interfaces";
import { useAuthValidator } from "../../hooks/authValidatorHook";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import authService from "../../api/services/authService";
import { setToken } from "../../store/slices/tokenSlice";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const LogIn = ({ onSwitch }: OnboardFormProps) => {

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { formData, error, handleChange, validateForm } = useAuthValidator();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateForm()) return;
    try {
      const response = await authService.signIn(formData);
      console.log(response.user)
      dispatch(setToken(response.token))
      dispatch(setUser(response.user))
      navigate('/home')
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl text-center font-bold text-black leading-tight">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Continue your journey with us
          </p>
        </div>

        {/* Sign In with Google */}
        <div className="space-y-4">
          <button className="w-full px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleLogIn} className="space-y-4">
        <label className="flex flex-col gap-1">
          <input
            disabled={isLoading}
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
            disabled={isLoading}
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

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-black hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
  type="submit"
  className="w-full px-6 py-3 bg-black text-white font-semibold text-center rounded-lg hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
>
  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
</button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-black font-semibold hover:text-gray-700 transition-colors underline decoration-gray-300 hover:decoration-gray-500"
            onClick={() => onSwitch("signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LogIn;

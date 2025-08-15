import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleForms = () => {
    setIsRegistering((prev) => !prev);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Basic form validation
    const newErrors = {};
    if (isRegistering) {
      if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    }
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle your login or register logic here
    setLoading(true);
    try {
      if (isRegistering) {
        // await registerUser({ fullName, email, password })
        console.log('Registering:', { fullName, email, password });
      } else {
        // await loginUser({ email, password })
        console.log('Logging in:', { email, password });
      }
    } catch (error) {
      console.error(error);
      // Optionally set error messages here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="mx-auto bg-indigo-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isRegistering ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-gray-500 mt-2">
              {isRegistering ? 'Join our community today' : 'Sign in to your account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegistering && (
              <>
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 border ${
                      errors.fullName ? 'border-red-300' : 'border-gray-200'
                    } rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 border ${
                  errors.email ? 'border-red-300' : 'border-gray-200'
                } rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 border ${
                  errors.password ? 'border-red-300' : 'border-gray-200'
                } rounded-xl focus:ring-2 focus:ring-indigo-300 outline-none`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-70' : ''
                }`}
              >
                {loading
                  ? isRegistering
                    ? 'Creating account...'
                    : 'Signing in...'
                  : isRegistering
                    ? 'Create Account'
                    : 'Sign In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
              <span
                onClick={toggleForms}
                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                {isRegistering ? 'Sign in' : 'Register'}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          © 2025 MERN AUTHENTICATION. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;

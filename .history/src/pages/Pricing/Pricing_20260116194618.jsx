import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Zap, Crown, Star, Sparkles, Rocket, Gem, Trophy, Flame } from "lucide-react";

const Pricing = () => {
  const { currentUser: user, userData: dbUser, loading: authLoading } = useAuth();

  console.log("Auth User:", user);
  console.log("DB User:", dbUser);
  console.log("Auth Loading:", authLoading);

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 sm:px-6">
        <div className="text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-700">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-4 sm:px-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 max-w-md sm:max-w-lg w-full">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-800 mb-6">
            Please Log In
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10">
            You need to be logged in to view pricing and upgrade options.
          </p>
          <Link to="/login">
            <button className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg sm:text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-500 w-full sm:w-auto">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Logged in but dbUser not found
  if (!dbUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4 sm:px-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-8 sm:p-12 md:p-16 max-w-md sm:max-w-lg w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6">
            Profile Not Found
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
            Your account exists, but profile data is missing. This usually happens if the user was not created in MongoDB.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 break-all font-mono">
            Firebase UID: {user.uid}
          </p>
          <p className="text-gray-600 text-base sm:text-lg">
            Please contact admin or try logging out and in again.
          </p>
        </div>
      </div>
    );
  }

  // Already Premium
  if (dbUser.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-4 sm:px-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-10 sm:p-14 md:p-20 max-w-md sm:max-w-xl w-full">
          <Trophy className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-8 text-emerald-600" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-700 mb-6">
            You're Premium!
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8">
            Enjoy lifetime access to all premium lessons and features.
          </p>
          <div className="bg-emerald-100 rounded-2xl p-6 sm:p-8">
            <p className="text-2xl sm:text-3xl font-bold text-emerald-800">Lifetime Premium Member</p>
          </div>
        </div>
      </div>
    );
  }

  // Free user – show pricing
  const handleUpgrade = async () => {
    try {
      const res = await axios.post(
        "https://lessons-backend-six.vercel.app/api/stripe/create-checkout-session",
        {
          email: user.email,
          uid: user.uid,
        }
      );
      window.location.href = res.data.url;
    } catch (error) {
      console.error("Stripe error:", error);
      alert("Payment setup failed. Please try again later.");
    }
  };

  const features = [
    { feature: "Access to All Public Lessons", free: "Yes", premium: "Yes" },
    { feature: "Create Lessons", free: "Basic", premium: "Premium Lessons" },
    { feature: "View Premium Lessons", free: "No", premium: "Unlimited" },
    { feature: "Ad-Free Experience", free: "Ads Shown", premium: "No Ads" },
    { feature: "Priority in Featured Section", free: "No", premium: "Yes" },
    { feature: "Lifetime Access", free: "No", premium: "Forever" },
    { feature: "Premium Badge & Recognition", free: "No", premium: "Yes" },
    { feature: "Early Access to New Features", free: "No", premium: "Yes" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 sm:mb-6">
            Upgrade to Premium
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto px-4">
            Unlock the full experience with lifetime premium access – one-time payment only.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="p-6 sm:p-8 text-left text-lg sm:text-xl font-bold">Feature</th>
                  <th className="p-6 sm:p-8 text-center text-lg sm:text-xl font-bold">Free</th>
                  <th className="p-6 sm:p-8 text-center text-lg sm:text-xl font-bold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="p-5 sm:p-6 text-gray-800 font-medium text-base sm:text-lg">{row.feature}</td>
                    <td className="p-5 sm:p-6 text-center text-gray-600 font-semibold text-base sm:text-lg">
                      {row.free === "Yes" ? (
                        <span className="text-emerald-600 font-bold">Yes</span>
                      ) : row.free === "No" ? (
                        <span className="text-red-600 font-bold">No</span>
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="p-5 sm:p-6 text-center text-emerald-600 font-bold text-base sm:text-lg">
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-8 sm:p-12 md:p-16 text-center">
            <p className="text-xl sm:text-2xl text-gray-700 mb-4">One-Time Payment</p>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-indigo-700 mb-4">
              ৳1500
              <span className="text-2xl sm:text-3xl text-gray-600 ml-3">($15 USD - Test)</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12">
              Lifetime Access • No Subscription • Instant Activation
            </p>

            {/* Premium Button */}
            <button
              onClick={handleUpgrade}
              className="group relative inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-r from-white via-gray-50 to-white text-[#03373D] px-10 py-6 sm:px-14 md:px-16 lg:px-20 rounded-3xl text-2xl sm:text-3xl md:text-4xl font-extrabold shadow-2xl hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] hover:scale-105 sm:hover:scale-110 transition-all duration-700 transform border-4 border-indigo-400/30 w-full sm:w-auto overflow-hidden"
            >
              {/* Left Icons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Gem className="w-10 h-10 sm:w-11 md:w-12 text-indigo-600 group-hover:text-indigo-700 group-hover:scale-125 transition-all duration-500" />
                <Crown className="w-9 h-9 sm:w-10 md:w-11 text-yellow-500 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700" />
              </div>

              <span className="block">Upgrade to Premium Now</span>

              {/* Right Icons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Flame className="w-9 h-9 sm:w-10 md:w-11 text-orange-500 group-hover:translate-y-[-10px] group-hover:rotate-[-15deg] transition-all duration-700" />
                <Trophy className="w-10 h-10 sm:w-11 md:w-12 text-yellow-600 group-hover:rotate-180 group-hover:scale-125 transition-all duration-1000" />
                <Rocket className="w-10 h-10 sm:w-11 md:w-12 text-pink-500 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-700" />
              </div>

              {/* Glow Effects */}
              <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></span>
              <span className="absolute inset-0 rounded-3xl bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></span>
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-10 sm:mt-12 text-base sm:text-lg px-4">
          Secured by Stripe • No recurring charges • Full refund if not satisfied
        </p>
      </div>
    </div>
  );
};

export default Pricing;
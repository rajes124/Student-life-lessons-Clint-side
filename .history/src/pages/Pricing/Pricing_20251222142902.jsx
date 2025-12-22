import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Zap, Crown, Star, Sparkles, Rocket, Gem, Trophy, Flame } from "lucide-react"; // Assuming you're using lucide-react icons

const Pricing = () => {
  const { currentUser: user, userData: dbUser, loading: authLoading } = useAuth();

  
  console.log("Auth User:", user);
  console.log("DB User:", dbUser);
  console.log("Auth Loading:", authLoading);

  // Auth loading
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-20 h-20 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-3xl font-bold text-indigo-700">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 px-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-16 max-w-lg">
          <h1 className="text-5xl font-extrabold text-indigo-800 mb-6">
            Please Log In
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            You need to be logged in to view pricing and upgrade options.
          </p>
          <Link to="/login">
            <button className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:scale-110 transition-all duration-500">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-16 max-w-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-6">
            Profile Not Found
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Your account exists, but profile data is missing. This usually happens if the user was not created in MongoDB.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Firebase UID: {user.uid}
          </p>
          <p className="text-gray-600">
            Please contact admin or try logging out and in again.
          </p>
        </div>
      </div>
    );
  }

  // Already Premium
  if (dbUser.isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center px-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-20 max-w-xl">
          <div className="text-9xl mb-8">🎉</div>
          <h1 className="text-5xl font-extrabold text-emerald-700 mb-6">
            You're Premium! ⭐
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Enjoy lifetime access to all premium lessons and features.
          </p>
          <div className="bg-emerald-100 rounded-2xl p-8">
            <p className="text-3xl font-bold text-emerald-800">Lifetime Premium Member</p>
          </div>
        </div>
      </div>
    );
  }

  // Free user – show pricing
  const handleUpgrade = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/stripe/create-checkout-session",
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
    { feature: "Access to All Public Lessons", free: "✅", premium: "✅" },
    { feature: "Create Lessons", free: "✅ Basic", premium: "✅ Premium Lessons" },
    { feature: "View Premium Lessons", free: "❌", premium: "✅ Unlimited" },
    { feature: "Ad-Free Experience", free: "Ads Shown", premium: "No Ads" },
    { feature: "Priority in Featured Section", free: "❌", premium: "✅" },
    { feature: "Lifetime Access", free: "❌", premium: "✅ Forever" },
    { feature: "Premium Badge & Recognition", free: "❌", premium: "✅ ⭐" },
    { feature: "Early Access to New Features", free: "❌", premium: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
            Upgrade to Premium ⭐
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Unlock the full experience with lifetime premium access – one-time payment only.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <th className="p-8 text-left text-xl font-bold">Feature</th>
                <th className="p-8 text-center text-xl font-bold">Free</th>
                <th className="p-8 text-center text-xl font-bold">Premium</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-6 text-gray-800 font-medium text-lg">{row.feature}</td>
                  <td className="p-6 text-center text-gray-600 font-semibold">{row.free}</td>
                  <td className="p-6 text-center text-emerald-600 font-bold text-lg">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-16 text-center">
            <p className="text-2xl text-gray-700 mb-4">One-Time Payment</p>
           <h2 className="text-6xl font-extrabold text-indigo-700 mb-4">
  ৳1500 <span className="text-3xl text-gray-600">($15 USD - Test)</span>
</h2>
            <p className="text-xl text-gray-600 mb-10">Lifetime Access • No Subscription • Instant Activation</p>

            {/* Next-level upgraded button */}
            <button
              onClick={handleUpgrade}
              className="group relative inline-flex items-center gap-6 bg-gradient-to-r from-white via-gray-50 to-white text-[#03373D] px-16 py-7 rounded-3xl text-3xl md:text-4xl font-extrabold shadow-2xl hover:shadow-[0_0_60px_rgba(79,70,229,0.6)] hover:scale-110 transition-all duration-700 transform overflow-hidden border-4 border-indigo-400/30"
            >
              {/* Left Icons - more premium & animated */}
              <div className="flex items-center gap-4">
                <Gem className="w-12 h-12 text-indigo-600 group-hover:text-indigo-700 group-hover:scale-125 transition-all duration-500" />
                <Crown className="w-11 h-11 text-yellow-500 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700" />
              </div>

              Upgrade to Premium Now

              {/* Right Icons - more advanced & playful */}
              <div className="flex items-center gap-4">
                <Flame className="w-11 h-11 text-orange-500 group-hover:translate-y-[-10px] group-hover:rotate-[-15deg] transition-all duration-700" />
                <Trophy className="w-12 h-12 text-yellow-600 group-hover:rotate-180 group-hover:scale-125 transition-all duration-1000" />
                <Rocket className="w-12 h-12 text-pink-500 group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-700" />
              </div>

              {/* Background glow + shine effect */}
              <span className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"></span>
              <span className="absolute inset-0 rounded-3xl bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></span>
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-12 text-lg">
          Secured by Stripe • No recurring charges • Full refund if not satisfied
        </p>
      </div>
    </div>
  );
};

export default Pricing;
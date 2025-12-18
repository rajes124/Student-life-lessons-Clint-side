import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";


const Pricing = () => {
  const { user, dbUser } = useAuth();

  if (!dbUser) return null;

  if (dbUser.isPremium) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-green-600">
          🎉 You are Premium!
        </h2>
      </div>
    );
  }

  const handleUpgrade = async () => {
    const res = await axios.post(
      "http://localhost:3000/create-checkout-session",
      {
        email: user.email,
        uid: user.uid,
      }
    );
    window.location.href = res.data.url;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Upgrade to Premium ⭐
      </h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th>Feature</th>
            <th>Free</th>
            <th>Premium</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Lessons Access", "Limited", "Unlimited"],
            ["Create Lessons", "❌", "✅"],
            ["Premium Content", "❌", "✅"],
            ["Ads", "Yes", "No"],
            ["Priority Listing", "❌", "✅"],
            ["Lifetime Access", "❌", "✅"],
          ].map((row, i) => (
            <tr key={i} className="text-center border-t">
              {row.map((cell, j) => (
                <td key={j} className="p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-8">
        <button
          onClick={handleUpgrade}
          className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl shadow-lg hover:scale-105 transition"
        >
          Upgrade to Premium – ৳1500 (Lifetime)
        </button>
      </div>
    </div>
  );
};

export default Pricing;

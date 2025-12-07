import { motion } from "framer-motion";

const sampleContributors = [
  { id: 1, name: "Rahim", points: 120, avatar: "https://i.pravatar.cc/100?img=15" },
  { id: 2, name: "Sara", points: 110, avatar: "https://i.pravatar.cc/100?img=32" },
  { id: 3, name: "Nadeem", points: 105, avatar: "https://i.pravatar.cc/100?img=49" },
];

const TopContributors = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Top Contributors of the Week</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {sampleContributors.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-white border rounded-2xl shadow-md hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-14 h-14 rounded-full shadow-md"
              />
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-sm text-gray-500">Points: {user.points}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TopContributors;

import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

const sampleData = [
  { id: 1, title: "Consistency is More Powerful Than Motivation", saves: 980 },
  { id: 2, title: "Stop Comparing, Start Growing", saves: 850 },
  { id: 3, title: "Small Habits, Big Results", saves: 760 },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 }
  })
};

const MostSavedLessons = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Most Saved Lessons</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {sampleData.map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            animate="show"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-2xl shadow-md bg-white border hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{item.title}</h3>
              <Bookmark />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Saved {item.saves}+ times
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MostSavedLessons;

import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const TopContributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        const res = await api.get("/lessons/top-contributors");
        setContributors(res.data);
      } catch (error) {
        toast.error("Failed to load top contributors");

        
        setContributors([
          {
            name: "Alex Johnson",
            lessonCount: 42,
            photoURL: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Sarah Ahmed",
            lessonCount: 38,
            photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          },
          {
            name: "Rahim Khan",
            lessonCount: 35,
            photoURL: "https://randomuser.me/api/portraits/men/45.jpg",
          },
          {
            name: "Priya Singh",
            lessonCount: 31,
            photoURL: "https://randomuser.me/api/portraits/women/68.jpg",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTop();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading top contributors...</p>;
  }

  return (
    <section className="py-20 px-6 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-12">
        Top Contributors of the Week
      </h2>

      <div className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto">
        {contributors.map((user, index) => (
          <div key={index} className="text-center group">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 group-hover:ring-offset-8 transition-all">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="object-cover"
                />
              </div>
            </div>

            <h4 className="mt-6 text-xl font-semibold">{user.name}</h4>
            <p className="text-gray-600">
              {user.lessonCount} Lessons Shared
            </p>
            <div className="badge badge-success badge-lg mt-4">
              ⭐ Top Contributor
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;

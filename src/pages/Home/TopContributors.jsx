// src/pages/Home/TopContributors.jsx
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const TopContributors = () => {
  const axiosPublic = useAxiosPublic();

  const { data: contributors = [] } = useQuery({
    queryKey: ['top-contributors'],
    queryFn: async () => {
      const res = await axiosPublic.get('/users/top-contributors?limit=6');
      return res.data;
    }
  });

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Top Contributors of the Week</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {contributors.map((user, idx) => (
            <div key={user._id} className="text-center">
              <div className="relative">
                <img
                  src={user.photoURL || '/default-avatar.png'}
                  alt={user.name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
                />
                {idx < 3 && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {idx + 1}
                  </div>
                )}
              </div>
              <h3 className="mt-4 font-bold">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.lessonCount} lessons</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
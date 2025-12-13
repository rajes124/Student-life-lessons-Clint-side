// src/pages/Home/MostSavedLessons.jsx
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const MostSavedLessons = () => {
  const axiosPublic = useAxiosPublic();

  const { data: mostSaved = [] } = useQuery({
    queryKey: ['most-saved'],
    queryFn: async () => {
      const res = await axiosPublic.get('/lessons/most-saved?limit=6');
      return res.data;
    }
  });

  return (
    <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Most Saved Lessons This Week</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mostSaved.map((lesson, idx) => (
            <div key={lesson._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition relative">
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                #{idx + 1}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                <p className="text-gray-600 text-sm mb-4">by {lesson.creator?.name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">🔖 {lesson.favoritesCount || 0}</span>
                  <Link to={`/lesson/${lesson._id}`} className="text-indigo-600 font-medium">
                    Read Lesson →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostSavedLessons;
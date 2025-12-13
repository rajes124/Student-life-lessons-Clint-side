// src/pages/Home/FeaturedLessons.jsx
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const FeaturedLessons = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featured = [], isLoading } = useQuery({
    queryKey: ['featured-lessons'],
    queryFn: async () => {
      const res = await axiosPublic.get('/lessons/featured');
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-10">Loading featured lessons...</div>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Life Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(lesson => (
            <div key={lesson._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              {lesson.image && (
                <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{lesson.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-600 font-medium">{lesson.category}</span>
                  <Link to={`/lesson/${lesson._id}`} className="text-indigo-600 font-semibold hover:underline">
                    Read More →
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

export default FeaturedLessons;
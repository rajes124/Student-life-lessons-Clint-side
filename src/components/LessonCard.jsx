import { Link } from 'react-router-dom';

const LessonCard = ({ lesson, isPremiumUser }) => {
  const isPremiumLesson = lesson.accessLevel === 'Premium';

  if (isPremiumLesson && !isPremiumUser) {
    return <BlurCard lesson={lesson} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {lesson.image && (
        <img src={lesson.image} alt={lesson.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-indigo-700 mb-2">{lesson.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
            {lesson.category}
          </span>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
            {lesson.emotionalTone}
          </span>
          {isPremiumLesson && (
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm flex items-center">
              ⭐ Premium
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">By {lesson.creatorName}</p>
          <Link
            to={`/lesson/${lesson._id}`}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
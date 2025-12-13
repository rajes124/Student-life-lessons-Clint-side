import { Link } from 'react-router-dom';

const BlurCard = ({ lesson }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden group">
      {lesson.image && (
        <div className="w-full h-48 bg-gray-200 blur-md brightness-50">
          <img src={lesson.image} alt="" className="w-full h-full object-cover opacity-0" />
        </div>
      )}
      <div className="p-6 blur-md brightness-75">
        <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
        <p className="text-gray-600 mb-4">{lesson.description}</p>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-center text-white">
        <svg className="w-16 h-16 text-amber-400 mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <p className="text-2xl font-bold mb-2">Premium Lesson</p>
        <p className="text-center px-6 mb-6">Unlock full access to premium wisdom</p>
        <Link
          to="/pricing"
          className="px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg hover:bg-amber-600 transition"
        >
          Upgrade to Premium
        </Link>
      </div>
    </div>
  );
};

export default BlurCard;
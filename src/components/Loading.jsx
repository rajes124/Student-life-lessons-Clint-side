const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-medium text-indigo-700">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
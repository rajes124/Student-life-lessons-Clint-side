// src/dashboard/user/MyLessons.jsx
import React from 'react';

const MyLessons = () => {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Lessons</h1>
      <p className="text-gray-600">Here you will see all your created lessons in a table format.</p>
      
      {/* পরে এখানে টেবিল, এডিট/ডিলিট বাটন যোগ করবি */}
      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center mt-8">
        <p className="text-xl text-gray-500">Lessons Table Coming Soon...</p>
      </div>
    </div>
  );
};

export default MyLessons;
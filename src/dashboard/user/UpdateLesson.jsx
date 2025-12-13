// src/dashboard/user/UpdateLesson.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateLesson = () => {
  const { id } = useParams(); // :id থেকে লেসন আইডি নিবে

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Update Lesson {id ? `(ID: ${id})` : ''}
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-xl text-gray-600 mb-6">
            Here you can edit your lesson details (Title, Description, Category, Tone, Image, Visibility, Access Level).
          </p>

          {/* পরে এখানে প্রি-ফিল্ড ফর্ম + সাবমিট বাটন যোগ করবি */}
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-full h-96 flex items-center justify-center">
            <p className="text-xl text-gray-500">Update Form Coming Soon...</p>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateLesson;
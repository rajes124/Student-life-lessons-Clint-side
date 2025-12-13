import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // তোমার AuthContext
import toast from 'react-hot-toast';

const UpdateProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile(name, photoURL);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Display Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Photo URL</label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-70"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
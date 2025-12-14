const TopContributors = ({ contributors = [] }) => {
  const dummyContributors = [
    { name: "Alex Johnson", lessonsCount: 42, photoURL: "https://media.istockphoto.com/id/2105516746/photo/confident-student-holding-books-in-library.jpg?s=612x612&w=0&k=20&c=fOsYfzTKXdcLbaup4KEuOVWYeL7T6JTWjSG7QNE2VuE=" },
    { name: "Sarah Ahmed", lessonsCount: 38, photoURL: "https://media.istockphoto.com/id/1471599930/photo/portrait-of-college-student-holding-books-and-giving-toothy-smile.jpg?s=1024x1024&w=is&k=20&c=c_dXdGMPiDj6zCdVGF4CcZtcqND_7QWjSf5wZDMyK1A=" },
    { name: "Rahim Khan", lessonsCount: 35, photoURL: "https://media.gettyimages.com/id/1141685629/photo/young-smiling-student-holding-a-books-in-library-beautiful-woman-holding-a-books-in-bookstore.jpg?s=612x612&w=gi&k=20&c=pOdEC3ftU3prtnWf3OWcNdxx3q--5qraYkCwdSSSodQ=" },
    { name: "Priya Singh", lessonsCount: 31, photoURL: "https://media.istockphoto.com/id/597958694/photo/young-adult-male-student-in-the-lobby-of-a-university.jpg?s=612x612&w=0&k=20&c=QaNEzmcKrLJzmwOcu2lgwm1B7rm3Ouq2McYYdmoMGpU=" },
  ];

  const displayContributors = contributors.length > 0 ? contributors : dummyContributors;

  return (
    <section className="py-20 px-6 bg-base-200">
      <h2 className="text-4xl font-bold text-center mb-12">Top Contributors of the Week</h2>
      <div className="flex flex-wrap justify-center gap-12 max-w-7xl mx-auto">
        {displayContributors.map((user, index) => (
          <div key={index} className="text-center group">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 group-hover:ring-offset-8 transition-all">
                <img src={user.photoURL} alt={user.name} className="object-cover" />
              </div>
            </div>
            <h4 className="mt-6 text-xl font-semibold">{user.name}</h4>
            <p className="text-gray-600">{user.lessonsCount} Lessons Shared</p>
            <div className="badge badge-success badge-lg mt-4">⭐ Top Contributor</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopContributors;
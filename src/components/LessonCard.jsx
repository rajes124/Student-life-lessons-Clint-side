const LessonCard = ({ title = "Demo Lesson" }) => {
  return (
    <div className="border p-4 rounded">
      <h2>{title}</h2>
    </div>
  );
};

export default LessonCard;

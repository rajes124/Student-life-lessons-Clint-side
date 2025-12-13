const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Student Life Lessons</h3>
          <p className="text-indigo-200">Preserve wisdom. Grow together.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-indigo-200">
            <li><a href="/">Home</a></li>
            <li><a href="/public-lessons">Public Lessons</a></li>
            <li><a href="/pricing">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-indigo-200">support@studentlifelessons.com</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-amber-400">𝕏</a>
            <a href="#" className="text-2xl hover:text-amber-400">f</a>
            <a href="#" className="text-2xl hover:text-amber-400">in</a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-indigo-300">
        © 2025 Student Life Lessons. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
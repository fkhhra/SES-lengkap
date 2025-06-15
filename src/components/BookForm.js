import { useState, useEffect } from 'react';

export default function BookForm({ onSubmit, initialData = {}, loading }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: ''
  });

  // Initialize form only once with initialData
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        author: initialData.author || '',
        category: initialData.category || ''
      });
    }
  }, []); // Empty dependency array to run only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields are filled
    if (!formData.title.trim() || !formData.author.trim() || !formData.category.trim()) {
      alert('Please fill all fields');
      return;
    }
    onSubmit({
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Book Title</label>
        <input
          type="text"
          name="title"
          className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder-gray-500"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Author</label>
        <input
          type="text"
          name="author"
          className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder-gray-500"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-300">Category</label>
        <input
          type="text"
          name="category"
          className="w-full bg-gray-800 border border-gray-700 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 placeholder-gray-500"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter category"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors ${
          loading ? 'bg-blue-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-800'
        }`}
      >
        {loading ? 'Processing...' : 'Save Book'}
      </button>
    </form>
  );
}
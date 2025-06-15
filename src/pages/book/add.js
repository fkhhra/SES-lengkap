import { useRouter } from 'next/router';
import { useState } from 'react';
import BookForm from '../../components/BookForm';

export default function AddBook() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting:', formData);
      
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json();
      
      if (!res.ok) {
        console.error('Error response:', responseData);
        throw new Error(responseData.message || 'Failed to create book');
      }

      console.log('Book created:', responseData);
      router.push('/book');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'An error occurred while saving the book');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-white mb-2">Add New Book</h1>
          <p className="text-gray-400 text-sm">Fill the details below</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 text-sm rounded border border-red-800/50">
            {error}
          </div>
        )}

        <BookForm
          onSubmit={handleSubmit}
          loading={submitting}
        />

        <div className="mt-6 text-center">
          <button 
            onClick={() => router.push('/book')}
            className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            ← Back to Book List
          </button>
        </div>
      </div>
    </div>
  );
}
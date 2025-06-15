import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookForm from '../../components/BookForm';

export default function EditBook() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState({
    title: '',
    author: '',
    category: ''
  });

  useEffect(() => {
    if (!id) return;

    async function fetchBook() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/book/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch book');
        }
        const data = await res.json();
        setInitialData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/book/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        throw new Error('Failed to update book');
      }
      
      router.push('/book');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light text-white mb-2">Edit Book</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/30 text-red-300 text-sm rounded border border-red-800/50">
            {error}
          </div>
        )}

        <BookForm
          initialData={initialData}
          onSubmit={handleSubmit}
          loading={saving}
        />
      </div>
    </div>
  );
}
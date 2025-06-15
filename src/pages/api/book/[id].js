const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  try {
    switch (method) {
      case 'GET': {
        const fetchRes = await fetch(`${BACKEND_URL}/api/book/${id}`);
        if (!fetchRes.ok) {
          const errorData = await fetchRes.json();
          throw new Error(errorData.message || 'Failed to fetch book');
        }
        const data = await fetchRes.json();
        return res.status(200).json(data);
      }

      case 'PUT': {
        const { title, author, category } = req.body;

        if (!title?.trim() || !author?.trim() || !category?.trim()) {
          return res.status(422).json({ 
            message: 'All fields are required',
            fields: { title, author, category }
          });
        }

        const bookData = { 
          title: title.trim(), 
          author: author.trim(), 
          category: category.trim() 
        };

        const fetchRes = await fetch(`${BACKEND_URL}/api/book/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(bookData),
        });

        if (!fetchRes.ok) {
          const errorData = await fetchRes.json().catch(() => ({}));
          return res.status(fetchRes.status).json({
            message: 'Backend request failed',
            backendError: errorData
          });
        }

        const data = await fetchRes.json();
        return res.status(200).json(data);
      }

      case 'DELETE': {
        const fetchRes = await fetch(`${BACKEND_URL}/api/book/${id}`, {
          method: 'DELETE',
        });

        if (fetchRes.status === 204) {
          return res.status(204).end();
        }

        if (!fetchRes.ok) {
          const errorData = await fetchRes.json().catch(() => ({}));
          return res.status(fetchRes.status).json({
            message: 'Backend request failed',
            backendError: errorData
          });
        }

        const data = await fetchRes.json();
        return res.status(200).json(data);
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: error.message || 'Server error',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
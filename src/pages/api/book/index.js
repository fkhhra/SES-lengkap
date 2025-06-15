const BACKEND_URL = 'http://localhost:3333';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const fetchRes = await fetch(`${BACKEND_URL}/api/book`);
        if (!fetchRes.ok) {
          const errorData = await fetchRes.json();
          console.error('Backend GET error:', errorData);
          return res.status(fetchRes.status).json(errorData);
        }
        const data = await fetchRes.json();
        return res.status(200).json(data);
      }

      case 'POST': {
        const { title, author, category } = req.body;

        // Validate required fields
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

        const fetchRes = await fetch(`${BACKEND_URL}/api/book`, {
          method: 'POST',
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
        return res.status(201).json(data);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API route error:', error);
    return res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}
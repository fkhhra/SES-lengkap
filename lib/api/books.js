export async function getBooks() {
  try {
    const apiUrl = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000/api/book' 
      : '/api/book';

    const res = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Important for Next.js API routes
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('API Error Details:', {
        status: res.status,
        statusText: res.statusText,
        errorData
      });
      throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Fetch failed completely:', error);
    throw new Error(`Network error: ${error.message}`);
  }
}

export async function getBook(id) {
  const res = await fetch(`/api/book/${id}`);
  if (!res.ok) 
    throw new Error('Failed to fetch data');
  return res.json();
}

export async function createBook(title, author, category) {
  console.log('createBook args:', title, author, category);
  const res = await fetch(`/api/book`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, category }),
  });

  if (!res.ok) throw new Error('Failed to create book');
  return res.json();
}

export async function updateBook(id, title, author, category) {
  const res = await fetch(`/api/book/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, category }),
  });
  if (!res.ok) 
    throw new Error('Failed to update book');
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`/api/book/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) 
    throw new Error('Failed to delete book');
  return res.json(); 
  
}

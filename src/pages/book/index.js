import { useState, useEffect } from 'react'; // Add useEffect import here
import Link from 'next/link';
import { getBooks, deleteBook as apiDeleteBook } from '../../../lib/api/books';

export default function Booklist() {
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getBooks();
                setBook(data.data);
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const deleteBook = async (id) => {
        try {
            await apiDeleteBook(id);
            setBook(book.filter(b => b.id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header with Category Filter */}
                <div className="flex flex-col gap-6 mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-light text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                Books Library 
                            </h1>
                            <p className="text-gray-400 font-light text-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                {book.length} {book.length === 1 ? 'book' : 'books'} across {[...new Set(book.map(b => b.category))].length} categories
                            </p>
                        </div>
                        <Link
                            href="/book/add"
                            className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            <span className="text-lg">+</span>
                            <span>Add New Book</span>
                        </Link>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            className="px-4 py-2 rounded-full text-xs font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                            onClick={() => setFilter(null)}
                        >
                            All Categories
                        </button>
                        {[...new Set(book.map(b => b.category))].map(category => (
                            <button
                                key={category}
                                className="px-4 py-2 rounded-full text-xs font-medium bg-gray-800 text-blue-300 hover:bg-blue-900/30 transition-colors border border-blue-900/50"
                                onClick={() => setFilter(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-24">
                        <div className="inline-block p-10 max-w-md">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-6"></div>
                            <p className="text-gray-300 text-lg">Loading your library...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-24">
                        <div className="inline-block p-10 max-w-md bg-red-900/20 rounded-2xl border border-red-900/50">
                            <div className="text-red-400 mb-6 text-5xl">⚠️</div>
                            <p className="text-xl text-red-300 mb-4">Error loading books</p>
                            <p className="text-gray-400 mb-6">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Book List */}
                {!isLoading && !error && book.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {book
                            .filter(b => !filter || b.category === filter)
                            .map((b) => (
                                <div
                                    key={b.id}
                                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 group hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="flex-grow">
                                            <Link href={`/book/${b.id}`}>
                                                <h3 className="text-xl font-medium text-white hover:text-blue-400 transition-colors mb-3 line-clamp-2">
                                                    {b.title}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-400 text-sm mb-4 flex items-center">
                                                by {b.author}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                <span 
                                                    className={`px-3 py-1 rounded-full text-xs flex items-center ${
                                                        b.category === 'Fiction' ? 'bg-purple-900/30 text-purple-300 border border-purple-900/50' :
                                                        b.category === 'Non-Fiction' ? 'bg-blue-900/30 text-blue-300 border border-blue-900/50' :
                                                        b.category === 'Science' ? 'bg-green-900/30 text-green-300 border border-green-900/50' :
                                                        b.category === 'Biography' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-900/50' :
                                                        'bg-gray-800 text-gray-300'
                                                    }`}
                                                >
                                                    {b.category}
                                                </span>
                                                {b.pages && (
                                                    <span className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full flex items-center">
                                                        {b.pages} pages
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                                            <div className="text-xs text-gray-500">
                                                Added {new Date(b.createdAt || Date.now()).toLocaleDateString()}
                                            </div>
                                            <div className="flex space-x-3">
                                                <Link
                                                    href={`/book/add?id=${b.id}`}
                                                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs font-medium uppercase tracking-wider"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteBook(b.id)}
                                                    className="text-gray-400 hover:text-red-400 transition-colors text-xs font-medium uppercase tracking-wider"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : null}

                {/* Empty State */}
                {!isLoading && !error && book.length === 0 && (
                    <div className="text-center py-24">
                        <div className="inline-block p-10 max-w-md bg-gray-900/50 rounded-2xl backdrop-blur-sm border border-gray-800">
                            <div className="text-gray-400 mb-6 text-6xl">📚</div>
                            <p className="text-2xl text-gray-200 mb-4 font-light">Your library is empty</p>
                            <p className="text-gray-500 mb-8 text-sm">
                                Start building your digital collection by adding your first book
                            </p>
                            <Link
                                href="/book/add"
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                Add Your First Book
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
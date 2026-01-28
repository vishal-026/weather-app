import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search for a city..."
                    className="w-full px-6 py-3 text-lg text-white placeholder-gray-300 bg-white/20 border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md transition-all shadow-lg"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 px-4 py-1.5 bg-white/30 hover:bg-white/40 text-white rounded-full transition-colors border border-white/30"
                >
                    Search
                </button>
            </div>
        </form>
    );
}

export default SearchBar;

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchEngine = 'google' }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        if (searchEngine === 'duckduckgo') {
            searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        } else if (searchEngine === 'bing') {
            searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        } else if (searchEngine === 'yandex') {
            searchUrl = `https://yandex.com/search/?text=${encodeURIComponent(query)}`;
        }

        window.location.href = searchUrl;
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-8 relative z-10">
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${searchEngine.charAt(0).toUpperCase() + searchEngine.slice(1)}...`}
                    className="block w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:bg-white/20 focus:ring-2 focus:ring-white/30 transition-all shadow-lg"
                />
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-white/70 group-focus-within:text-white transition-colors" />
                </div>
            </div>
        </form>
    );
};

export default SearchBar;

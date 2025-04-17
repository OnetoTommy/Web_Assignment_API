import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="hero-section flex items-center justify-center">
      <div className="max-w-[800px] mx-auto px-4 text-center">
        <div className="fade-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="hero-title text-[80px] leading-tight mb-6">
            Find Your Perfect Car
          </h1>
          <p className="hero-subtitle text-[32px] mb-12">
            Experience the Future of Driving
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative max-w-[640px] mx-auto">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by model"
              className="apple-search text-lg py-4"
              aria-label="Search models"
            />
            <button
              type="submit"
              className="apple-button primary absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-16 fade-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-[#86868b] text-lg mb-4">
            Scroll down to explore more
          </p>
          <div className="animate-bounce">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block text-[#86868b]">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar; 
import React, { useState } from 'react';

const SearchSection = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="search-section">
      <div className="search-wrapper">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Find your favorite meal..."
        />
        <button onClick={handleSearch}>Go</button>
      </div>
    </section>
  );
};

export default SearchSection; 
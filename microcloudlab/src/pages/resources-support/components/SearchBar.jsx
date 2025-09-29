import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

/**
 * @module SearchBar
 */

/**
 * A search bar component with a search input, submit button, and quick search suggestions.
 * It manages its own state for the search query and loading status.
 *
 * @param {object} props - The properties for the component.
 * @param {Function} props.onSearch - A callback function to be executed when a search is submitted. It receives the search query as an argument.
 * @param {string} [props.placeholder="Search documentation, tutorials, and resources..."] - The placeholder text for the search input.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ onSearch, placeholder = "Search documentation, tutorials, and resources..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    await onSearch(searchQuery);
    setIsSearching(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            className="pl-12 pr-24 py-4 text-lg bg-surface border-2 border-border focus:border-primary rounded-xl shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 p-1 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          )}
          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={isSearching}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>
      
      {/* Quick Search Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-text-secondary">Popular searches:</span>
        {['Arduino basics', 'ESP32 tutorials', 'MQTT protocol', 'Real-time debugging', 'IoT security'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setSearchQuery(suggestion);
              onSearch(suggestion);
            }}
            className="px-3 py-1 text-sm bg-surface hover:bg-surface-hover text-text-secondary hover:text-primary border border-border rounded-full transition-smooth"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
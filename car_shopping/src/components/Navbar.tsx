import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="apple-nav">
        <div className="max-w-[980px] h-full mx-auto px-4 flex items-center justify-between">
          <div className="flex-1 flex justify-center">
            <Link to="/" className="text-[#f5f5f7] text-xl font-medium">
              
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-[#f5f5f7] opacity-80 hover:opacity-100"
            >
              <svg width="15" height="44" viewBox="0 0 15 44" xmlns="http://www.w3.org/2000/svg">
                <path d="m14.298 27.202-3.87-3.87c.701-1.153 1.104-2.507 1.104-3.952 0-4.181-3.39-7.571-7.571-7.571-4.181 0-7.571 3.39-7.571 7.571 0 4.181 3.39 7.571 7.571 7.571 1.445 0 2.799-.403 3.952-1.104l3.87 3.87c.19.19.443.29.698.29s.508-.1.698-.29c.387-.387.387-1.013 0-1.4zm-11.908-3.952c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" fill="#f5f5f7"/>
              </svg>
            </button>
            <Link to="/bag" className="text-[#f5f5f7] opacity-80 hover:opacity-100">
              <svg height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg">
                <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.0205a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.7188a2.1186 2.1186 0 0 0 2.1162-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1172-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7188a1.0182 1.0182 0 0 1 -1.0166-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.7188a1.0178 1.0178 0 0 1 1.0166 1.0166z" fill="#f5f5f7"/>
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {isSearchOpen && (
        <div className="fixed top-[44px] left-0 right-0 bg-black bg-opacity-95 p-4 z-50">
          <div className="max-w-[680px] mx-auto">
            <input
              type="search"
              placeholder="Search models"
              className="apple-search"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 
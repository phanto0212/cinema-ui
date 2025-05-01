import React, { useState } from 'react';
import { Search, Wrapper, SearchContainer } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function InputComponent({ fullWidth }) {
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchKey.trim()) {
      // Điều hướng sang trang search với query key
      navigate(`/movie/search?key=${encodeURIComponent(searchKey.trim())}`);
    }
  };

  const handleSearch = () => {
    if (searchKey.trim()) {
      navigate(`/movie/search?key=${encodeURIComponent(searchKey.trim())}`);
    }
  };

  return (
    <SearchContainer fullWidth={fullWidth}>
      <Wrapper fullWidth={fullWidth}>
        <input
          placeholder="Tìm phim, rạp"
          spellCheck={false}
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Search onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Search>
      </Wrapper>
    </SearchContainer>
  );
}

export default InputComponent;
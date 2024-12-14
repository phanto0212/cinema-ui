import React, { useState } from 'react';
import { Search, Wrapper } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function InputComponent() {
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchKey.trim()) {
      // Điều hướng sang trang search với query key
      navigate(`/movie/search?key=${encodeURIComponent(searchKey.trim())}`);
    }
  };

  return (
    <Wrapper>
      <input
        placeholder="Tìm phim, rạp"
        spellCheck={false}
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)} // Cập nhật giá trị nhập
        onKeyDown={handleKeyDown} // Lắng nghe sự kiện khi nhấn phím
      />
      <Search onClick={() => {
        if (searchKey.trim()) {
          navigate(`/movie/search?key=${encodeURIComponent(searchKey.trim())}`);
        }
      }}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Search>
    </Wrapper>
  );
}

export default InputComponent;

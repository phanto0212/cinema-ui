import React from 'react'
import { Search, Wrapper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function InputComponent() {
  return (
    <Wrapper>
        <input placeholder='Tìm phim, rạp' spellCheck={false} />
        <Search>
         <FontAwesomeIcon icon={faMagnifyingGlass}/> 
        </Search>
    </Wrapper>
  )
}

export default InputComponent
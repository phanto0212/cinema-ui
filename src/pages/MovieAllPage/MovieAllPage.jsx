import React, { useState } from 'react'
import { ContainerTitle, KindSelect, Movietitle, Wrapper } from './style';

function MovieAllPage() {
    const [selectedType, setSelectedType] = useState("now_showing");

    const handleChange = (e) => {
      setSelectedType(e.target.value);
      // Call API or handle data fetch based on selected option here
    };
  return (
    <div style={{padding: '0 120px', backgroundColor: '#0f172a',height: '4000px', marginTop: '91.5px' }}>
       <Wrapper>
          <ContainerTitle>
             <Movietitle>PHIM ĐANG CHIẾU</Movietitle>
             <KindSelect value={selectedType} onChange={handleChange}>
               <option value="now_showing">Phim Đang Chiếu</option>
               <option value="coming_soon">Phim Sắp Chiếu</option>
             </KindSelect>
          </ContainerTitle>
       </Wrapper>
    </div>
  )
}

export default MovieAllPage
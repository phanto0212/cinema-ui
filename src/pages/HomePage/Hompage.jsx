import React from 'react'
import SlideComponent from '../../components/SlideComponent/SlideComponent'
import slide0 from '../../assets/images/slide0.png'
import slide1 from '../../assets/images/slide1.jpg'
import slide2 from '../../assets/images/slide2.jpg'
import slide3 from '../../assets/images/slide3.jpg'
import slide4 from '../../assets/images/slide4.jpg'
function Hompage() {
  return (
    <div style={{padding: '0 120px', backgroundColor: '#050912',height: '1000px' }}>
      <SlideComponent arrImages = {[slide0, slide1, slide2, slide3, slide4]} />
    </div>
  )
}

export default Hompage
import React from 'react';
import { SliderComponents } from './style';

function SlideComponent({ arrImages }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 800, // Tăng thời gian chuyển slide
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // Tăng thời gian tự động chuyển slide
        cssEase: 'ease-in-out', // Thay đổi kiểu easing
    };

    return (
        <SliderComponents {...settings} >
            {arrImages.map((image, index) => (
                <img key={index} src={image} alt="slider" style={{ width: '100%', height: 'auto' }} />
            ))}
        </SliderComponents>
    );
}

export default SlideComponent;


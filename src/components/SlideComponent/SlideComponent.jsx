import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  SliderComponents, 
  SlideContent, 
  SlideTitle, 
  SlideSubtitle, 
  SlideButton,
  SlideContentWrapper,
  SlideOverlay,
  SlideTag
} from './style';

// Mẫu dữ liệu phim để demo
const slideData = [
    {
        tag: "Kinh dị Nhật",
        title: "Quỷ Ăn Tạng",
        subtitle: "Bí ẩn rùng rợn xoay quanh truyền thuyết về con quỷ chuyên săn lùng nội tạng người",
        buttonText: "Đặt ngay",
        path: "/movie/detail/"
    },
    {
        tag: "Bom tấn mới",
        title: "Venom: Đối Mặt Tử Thù",
        subtitle: "Eddie Brock và Venom phải đối mặt với kẻ thù mới nguy hiểm hơn bao giờ hết",
        buttonText: "Mua vé ngay",
        path: "/movie/detail/5"
      },
      {
        tag: "Phim Việt",
        title: "Cô Dâu Hào Môn",
        subtitle: "Bi kịch và toan tính trong một gia đình giàu có với những bí mật được chôn giấu",
        buttonText: "Đặt vé",
        path: "/movie/detail/"
      },
      {
        tag: "Tình cảm",
        title: "Ngày Xưa Có Một Chuyện Tình",
        subtitle: "Chuyện tình học trò ngọt ngào nhưng cũng đầy nước mắt dựa trên tiểu thuyết Nguyễn Nhật Ánh",
        buttonText: "Xem lịch chiếu",
        path: "/movie/detail/"
      },
      {
        tag: "Anime âm nhạc",
        title: "Bocchi the Rock!",
        subtitle: "Hành trình vượt qua sự nhút nhát để tỏa sáng trên sân khấu cùng ban nhạc nữ trung học",
        buttonText: "Mua vé anime",
        path: "/movie/detail/"
      }
];

function SlideComponent({ arrImages }) {
  const navigate = useNavigate();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    cssEase: 'cubic-bezier(0.45, 0, 0.55, 1)',
    pauseOnHover: true,
    adaptiveHeight: true,
    fade: true,
    beforeChange: (current, next) => {},
    afterChange: current => {},
  };

  return (
    <SliderComponents {...settings}>
      {arrImages.map((image, index) => (
        <div key={index}>
          <SlideOverlay />
          <img src={image} alt={`slide-${index}`} />
          <SlideContent>
            <SlideContentWrapper>
              <SlideTag>{slideData[index % slideData.length].tag}</SlideTag>
              <SlideTitle>{slideData[index % slideData.length].title}</SlideTitle>
              <SlideSubtitle>{slideData[index % slideData.length].subtitle}</SlideSubtitle>
              <SlideButton 
                onClick={() => navigate(slideData[index % slideData.length].path)}
              >
                {slideData[index % slideData.length].buttonText}
              </SlideButton>
            </SlideContentWrapper>
          </SlideContent>
        </div>
      ))}
    </SliderComponents>
  );
}

export default SlideComponent;
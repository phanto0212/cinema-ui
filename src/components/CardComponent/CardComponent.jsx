import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import { CloseOutlined } from '@ant-design/icons';
import { 
  CardDetail, 
  ContainerALl, 
  ContainerButton, 
  LinkButton, 
  ModalCustom, 
  NameCard, 
  NameCardHeader, 
  Overlay, 
  StyledCard, 
  TrailerContainer, 
  ViewTrailer 
} from "./style";


function CardComponent() {
  <style>

  </style>
  const [isModalVisible, setIsModalVisible] = useState(false);
  const playerRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
    // Nếu player đã được khởi tạo, quay lại đầu video
    if (playerRef.current) {
      playerRef.current.internalPlayer.seekTo(0); // Quay lại đầu video
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    if (playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo(); // Tạm dừng video
    }
  };

  const videoOptions = {
    width: '100%', // Đặt chiều rộng 100% để fit modal
    height: '100%', // Đặt chiều cao 100% để fit modal
    padding: '0',
    playerVars: {
      autoplay: 1, // Tự động phát video
      controls: 0, // Tắt các điều khiển
    },
  };

  return (
    <StyledCard
      hoverable
      cover={
        <img
          alt="Movie Poster"
          src="https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F10-2024%2Fvenom.jpg&w=1920&q=75"
          style={{ width: "400px", height: "355px", objectFit: "cover" }}
        />
      }
    >
      <Overlay>
        <NameCard>VENOM: KÈO CUỐI</NameCard>
        <CardDetail><span style={{ color: '#F3EA28' }}>Thể loại: </span>hành động khoa học viễn tưởng</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Tác giả: </span>Tom Hardy</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Đánh giá: </span>8.5/10</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Thời lượng: </span>109 phút</CardDetail>
      </Overlay>
      <NameCardHeader>Venom: Kèo cuối (P13)</NameCardHeader>
      <ContainerALl>
        <TrailerContainer onClick={showModal}>
          <img style={{ marginBottom: '4px' }} alt="icon" src="https://cinestar.com.vn/assets/images/icon-play-vid.svg" />
          <ViewTrailer>Xem Trailer</ViewTrailer>
        </TrailerContainer>
        <ContainerButton style={{ backgroundColor: '#ff7401' }}>
          <LinkButton style={{ color: '#fff' }}>Đặt vé</LinkButton>
        </ContainerButton>
      </ContainerALl>

      {/* Modal chứa video YouTube */}
      <ModalCustom 
        
        visible={isModalVisible} 
        onCancel={handleCancel} 
        footer={null} 
        centered
        width={900}
        height={500}
        styles={{
          body: { padding: 0, backgroundColor: 'transparent' }, // Làm trong suốt nội dung modal
          mask: { backgroundColor: 'rgba(0, 0, 0, 0.9)' } // Đặt overlay mờ 50%
        }}
        closeIcon={<CloseOutlined style={{ color: 'red', fontSize: '20px', margin:'0 0 19px 22px' }} />}
      >
        <div style={{ width: '100%', height: '450px', backgroundColor: 'transparent' }}> {/* Div chứa video fit modal */}
          <YouTube 
            videoId="6yCMRxGI4RA" // Thay VIDEO_ID với ID của video YouTube
            opts={videoOptions} 
            ref={playerRef} 
            style={{ width: '100%', height: '100%', padding: '0' }} // Video sẽ tự động fit vào div
          />
        </div>
      </ModalCustom>
    </StyledCard>
  );
}

export default CardComponent;

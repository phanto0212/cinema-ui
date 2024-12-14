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
import { useNavigate } from "react-router-dom";


function CardComponent({movie, onClick}) {
  
  <style>

  </style>
  const Navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const playerRef = useRef(null);
  function CardComponent({ movie, onClick }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const playerRef = useRef(null);

  const showModal = () => {
    setIsModalVisible(true);
    if (playerRef.current) {
      playerRef.current.internalPlayer.seekTo(0);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    if (playerRef.current) {
      playerRef.current.internalPlayer.pauseVideo();
    }
  };

  const videoOptions = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  // **Quan trọng: Thêm return để trả về JSX**
  return (
    <StyledCard
      hoverable
      cover={
        <img
          onClick={onClick}
          alt="Movie Poster"
          src={movie.poster_url}
          style={{ width: "400px", height: "355px", objectFit: "cover" }}
        />
      }
    >
      <Overlay>
        <NameCard>{movie.title}</NameCard>
        <CardDetail><span style={{ color: '#F3EA28' }}>Thể loại: </span>{movie.kind}</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Tác giả: </span>{movie.director}</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Đánh giá: </span>8.5/10</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Thời lượng: </span>{movie.duration}'</CardDetail>
      </Overlay>
      <NameCardHeader>{movie.title.length >23 ? `${movie.title.substring(0, 30)}...` : movie.title}</NameCardHeader>
      <ContainerALl>
        <TrailerContainer onClick={showModal}>
          <img style={{ marginBottom: '4px' }} alt="icon" src="https://cinestar.com.vn/assets/images/icon-play-vid.svg" />
          <ViewTrailer>Xem Trailer</ViewTrailer>
        </TrailerContainer>
        <ContainerButton style={{ backgroundColor: '#ff7401' }}>
          <LinkButton style={{ color: '#fff' }}>Đặt vé</LinkButton>
        </ContainerButton>
      </ContainerALl>

      <ModalCustom
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={900}
        height={500}
        styles={{
          body: { padding: 0, backgroundColor: 'transparent' },
          mask: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
        }}
        closeIcon={<CloseOutlined style={{ color: 'red', fontSize: '20px', margin: '0 0 19px 22px' }} />}
      >
        <div style={{ width: '100%', height: '450px', backgroundColor: 'transparent' }}>
          <YouTube
            videoId={movie.trailer_url}
            opts={videoOptions}
            ref={playerRef}
            style={{ width: '100%', height: '100%', padding: '0' }}
          />
        </div>
      </ModalCustom>
    </StyledCard>
  );
}


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
          onClick={onClick}
          alt="Movie Poster"
          src={movie.poster_url}
          style={{ width: "400px", height: "355px", objectFit: "cover" }}
        />
      }
    >
      <Overlay>
        <NameCard>{movie.title}</NameCard>
        <CardDetail><span style={{ color: '#F3EA28' }}>Thể loại: </span>{movie.kind}</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Tác giả: </span>{movie.director}</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Đánh giá: </span>8.5/10</CardDetail>
        <CardDetail><span style={{ color: '#F3EA28' }}>Thời lượng: </span>{movie.duration}'</CardDetail>
      </Overlay>
      <NameCardHeader>{movie.title.length > 20 ? `${movie.title.substring(0, 18)}...` : movie.title}</NameCardHeader>
      <ContainerALl>
        <TrailerContainer onClick={showModal}>
          <img style={{ marginBottom: '4px' }} alt="icon" src="https://cinestar.com.vn/assets/images/icon-play-vid.svg" />
          <ViewTrailer>Xem Trailer</ViewTrailer>
        </TrailerContainer>
        <ContainerButton onClick={()=>{Navigate(`/movie/detail/${movie.id}`)}} style={{ backgroundColor: '#ff7401' }}>
          <LinkButton   style={{ color: '#fff' }}>Đặt vé</LinkButton>
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
            videoId={movie.trailer_url}// Thay VIDEO_ID với ID của video YouTube
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

import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import { CloseOutlined } from '@ant-design/icons';
import {Col, Row} from 'antd'
import { CardDetail, MovieDescription, MovieDescription2, MovieDescriptionName, MovieHeaderName, Overlay, TrailerContainer, ViewTrailer, WrapperContainer } from './style'
import { faTag, faUser, faStar, faClock } from '@fortawesome/free-solid-svg-icons'; // Nhập các biểu tượng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalCustom} from '../CardComponent/style';
function MovieDetailComponent() {
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
    <div  >
        <Row style={{position: 'relative', top:'20px'}}>
          <Col span={10}>
            <img
              alt="Movie Poster"
              src="https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F10-2024%2Fvenom.jpg&w=1920&q=75"
              style={{ width: "550px", height: "750px", objectFit: "cover", border: '1px solid #726565', borderRadius: '8px' }}></img>
          </Col>
          <Col span={13.5} style={{marginLeft: '50px'}}>
             <WrapperContainer>
                <MovieHeaderName>VENOM: KÈO CUỐI (T13)</MovieHeaderName>
                <Overlay>
                  <CardDetail><span style={{ color: '#F3EA28' }}> <FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /> </span>hành động khoa học viễn tưởng</CardDetail>
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> </span>Tom Hardy</CardDetail>
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faStar} style={{ marginRight: '10px' }} /> </span>8.5/10</CardDetail>
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} /></span>109 phút</CardDetail>
                </Overlay>
                <MovieDescriptionName>MÔ TẢ</MovieDescriptionName>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                     <MovieDescription>Đạo diễn: Kelly Marcel</MovieDescription>
                     <MovieDescription>Diễn viên: Tom Hardy, Juno Temple, Chiwetel Ejiofor, Clark Backo, Stephen Graham</MovieDescription>
                     <MovieDescription>Khởi chiếu: Thứ Sáu, 25/10/2024</MovieDescription>
                </div>
                <MovieDescriptionName>NỘI DUNG PHIM</MovieDescriptionName>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                     <MovieDescription2>Tom Hardy sẽ tái xuất trong bom tấn Venom: The Last Dance </MovieDescription2>                   
                </div>
                <TrailerContainer onClick={showModal}>
                   <img style={{ marginBottom: '4px', width: '35px' }} alt="icon" src="https://cinestar.com.vn/assets/images/icon-play-vid.svg" />
                   <ViewTrailer>Xem Trailer</ViewTrailer>
                </TrailerContainer>
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
             </WrapperContainer>
          </Col>
          <Col span={0.5}  >
        
          </Col>
        </Row>
    </div>
  )
}

export default MovieDetailComponent
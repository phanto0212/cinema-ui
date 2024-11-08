import React, { useState, useRef } from "react";
import YouTube from "react-youtube";
import { CloseOutlined } from '@ant-design/icons';
import {Col, Row} from 'antd'
import { Address, CardDetail, Container, Container2, ContainerTicket, Date, DateSelection, Label, MovieDescription, MovieDescription2, MovieDescriptionName, MovieHeaderName, Overlay, Price, QuantityButton, QuantityContainer, QuantityDisplay, Row1, Screen, Seat, Seating, Select, ShowtimeButton, Showtimes, Subtitle, TheaterInfo, TheaterName, TheaterSelection, TicketBox, TicketCategory, TicketContainer, TicketType, Title1, TitleTicket, TrailerContainer, ViewTrailer, WrapperContainer } from './style'
import { faTag, faUser, faStar, faClock } from '@fortawesome/free-solid-svg-icons'; // Nhập các biểu tượng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalCustom} from '../CardComponent/style';
function MovieDetailComponent() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const playerRef = useRef(null);
  const [selectedDate, setSelectedDate] = React.useState("08/11");
  const [selectedShowtime, setSelectedShowtime] = React.useState("08:45");
  const [adultTicketCount, setAdultTicketCount] = useState(0);
  const [childTicketCount, setChildTicketCount] = useState(0);
  const seatsData = [
    // Hàng A
    { id: 'A01', status: 'available' }, { id: 'A02', status: 'booked' }, { id: 'A03', status: 'available' },
    { id: 'A04', status: 'available' }, { id: 'A05', status: 'booked' }, { id: 'A06', status: 'available' },
    { id: 'A07', status: 'booked' }, { id: 'A08', status: 'available' }, { id: 'A09', status: 'available' },
    { id: 'A10', status: 'booked' }, { id: 'A11', status: 'available' }, { id: 'A12', status: 'booked' },
    { id: 'A13', status: 'available' }, { id: 'A14', status: 'available' }, { id: 'A15', status: 'booked' },
    { id: 'A16', status: 'available' }, { id: 'A17', status: 'booked' }, { id: 'A18', status: 'available' },
    { id: 'A19', status: 'available' }, { id: 'A20', status: 'booked' },
  
    // Hàng B
    { id: 'B01', status: 'available' }, { id: 'B02', status: 'booked' }, { id: 'B03', status: 'available' },
    { id: 'B04', status: 'available' }, { id: 'B05', status: 'booked' }, { id: 'B06', status: 'available' },
    { id: 'B07', status: 'booked' }, { id: 'B08', status: 'available' }, { id: 'B09', status: 'available' },
    { id: 'B10', status: 'booked' }, { id: 'B11', status: 'available' }, { id: 'B12', status: 'booked' },
    { id: 'B13', status: 'available' }, { id: 'B14', status: 'available' }, { id: 'B15', status: 'booked' },
    { id: 'B16', status: 'available' }, { id: 'B17', status: 'booked' }, { id: 'B18', status: 'available' },
    { id: 'B19', status: 'available' }, { id: 'B20', status: 'booked' },
  
    // Hàng C
    { id: 'C01', status: 'available' }, { id: 'C02', status: 'booked' }, { id: 'C03', status: 'available' },
    { id: 'C04', status: 'available' }, { id: 'C05', status: 'booked' }, { id: 'C06', status: 'available' },
    { id: 'C07', status: 'booked' }, { id: 'C08', status: 'available' }, { id: 'C09', status: 'available' },
    { id: 'C10', status: 'booked' }, { id: 'C11', status: 'available' }, { id: 'C12', status: 'booked' },
    { id: 'C13', status: 'available' }, { id: 'C14', status: 'available' }, { id: 'C15', status: 'booked' },
    { id: 'C16', status: 'available' }, { id: 'C17', status: 'booked' }, { id: 'C18', status: 'available' },
    { id: 'C19', status: 'available' }, { id: 'C20', status: 'booked' },
  
    // Hàng D
    { id: 'D01', status: 'available' }, { id: 'D02', status: 'booked' }, { id: 'D03', status: 'available' },
    { id: 'D04', status: 'available' }, { id: 'D05', status: 'booked' }, { id: 'D06', status: 'available' },
    { id: 'D07', status: 'booked' }, { id: 'D08', status: 'available' }, { id: 'D09', status: 'available' },
    { id: 'D10', status: 'booked' }, { id: 'D11', status: 'available' }, { id: 'D12', status: 'booked' },
    { id: 'D13', status: 'available' }, { id: 'D14', status: 'available' }, { id: 'D15', status: 'booked' },
    { id: 'D16', status: 'available' }, { id: 'D17', status: 'booked' }, { id: 'D18', status: 'available' },
    { id: 'D19', status: 'available' }, { id: 'D20', status: 'booked' },
  
    // Hàng E
    { id: 'E01', status: 'available' }, { id: 'E02', status: 'booked' }, { id: 'E03', status: 'available' },
    { id: 'E04', status: 'available' }, { id: 'E05', status: 'booked' }, { id: 'E06', status: 'available' },
    { id: 'E07', status: 'booked' }, { id: 'E08', status: 'available' }, { id: 'E09', status: 'available' },
    { id: 'E10', status: 'booked' }, { id: 'E11', status: 'available' }, { id: 'E12', status: 'booked' },
    { id: 'E13', status: 'available' }, { id: 'E14', status: 'available' }, { id: 'E15', status: 'booked' },
    { id: 'E16', status: 'available' }, { id: 'E17', status: 'booked' }, { id: 'E18', status: 'available' },
    { id: 'E19', status: 'available' }, { id: 'E20', status: 'booked' },
  
    // Hàng F
    { id: 'F01', status: 'available' }, { id: 'F02', status: 'booked' }, { id: 'F03', status: 'available' },
    { id: 'F04', status: 'available' }, { id: 'F05', status: 'booked' }, { id: 'F06', status: 'available' },
    { id: 'F07', status: 'booked' }, { id: 'F08', status: 'available' }, { id: 'F09', status: 'available' },
    { id: 'F10', status: 'booked' }, { id: 'F11', status: 'available' }, { id: 'F12', status: 'booked' },
    { id: 'F13', status: 'available' }, { id: 'F14', status: 'available' }, { id: 'F15', status: 'booked' },
    { id: 'F16', status: 'available' }, { id: 'F17', status: 'booked' }, { id: 'F18', status: 'available' },
    { id: 'F19', status: 'available' }, { id: 'F20', status: 'booked' },
  
    // Hàng G
    { id: 'G01', status: 'available' }, { id: 'G02', status: 'booked' }, { id: 'G03', status: 'available' },
    { id: 'G04', status: 'available' }, { id: 'G05', status: 'booked' }, { id: 'G06', status: 'available' },
    { id: 'G07', status: 'booked' }, { id: 'G08', status: 'available' }, { id: 'G09', status: 'available' },
    { id: 'G10', status: 'booked' }, { id: 'G11', status: 'available' }, { id: 'G12', status: 'booked' },
    { id: 'G13', status: 'available' }, { id: 'G14', status: 'available' }, { id: 'G15', status: 'booked' },
    { id: 'G16', status: 'available' }, { id: 'G17', status: 'booked' }, { id: 'G18', status: 'available' },
    { id: 'G19', status: 'available' }, { id: 'G20', status: 'booked' },
  
    // Hàng H
    { id: 'H01', status: 'available' }, { id: 'H02', status: 'booked' }, { id: 'H03', status: 'available' },
    { id: 'H04', status: 'available' }, { id: 'H05', status: 'booked' }, { id: 'H06', status: 'available' },
    { id: 'H07', status: 'booked' }, { id: 'H08', status: 'available' }, { id: 'H09', status: 'available' },
    { id: 'H10', status: 'booked' }, { id: 'H11', status: 'available' }, { id: 'H12', status: 'booked' },
    { id: 'H13', status: 'available' }, { id: 'H14', status: 'available' }, { id: 'H15', status: 'booked' },
    { id: 'H16', status: 'available' }, { id: 'H17', status: 'booked' }, { id: 'H18', status: 'available' },
    { id: 'H19', status: 'available' }, { id: 'H20', status: 'booked' },
  ];
  
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const handleSeatClick = (seat) => {
    if (seat.status === 'available') {
      setSelectedSeats((prevSelectedSeats) =>
        prevSelectedSeats.includes(seat.id)
          ? prevSelectedSeats.filter((s) => s !== seat.id)
          : [...prevSelectedSeats, seat.id]
      );
    }
  };

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
        
      <Container2>
        <Title1>LỊCH CHIẾU</Title1>

        {/* Date Selection */}
        <DateSelection>
          <Date
            selected={selectedDate === "08/11"}
            onClick={() => setSelectedDate("08/11")}
          >
            <p>08/11</p>
            <span style={{fontWeight: '500'}}>Thứ Sáu</span>
          </Date>
          <Date
            selected={selectedDate === "09/11"}
            onClick={() => setSelectedDate("09/11")}
          >
            <p>09/11</p>
            <span style={{fontWeight: '500'}} >Thứ Bảy</span>
          </Date>
          <Date
            selected={selectedDate === "10/11"}
            onClick={() => setSelectedDate("10/11")}
          >
            <p>10/11</p>
            <span style={{fontWeight: '500'}} >Chủ Nhật</span>
          </Date>
          <Date
            selected={selectedDate === "10/11"}
            onClick={() => setSelectedDate("10/11")}
          >
            <p>10/11</p>
            <span style={{fontWeight: '500'}} >Chủ Nhật</span>
          </Date>
          <Date
            selected={selectedDate === "10/11"}
            onClick={() => setSelectedDate("10/11")}
          >
            <p>10/11</p>
            <span style={{fontWeight: '500'}} >Chủ Nhật</span>
          </Date>
        </DateSelection>

        {/* Theater Selection */}
        <div style={{ maxWidth: '800px', margin: '60px 0 20px 250px'}}>
        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems:'center',justifyContent:'space-between'}}>
        <Subtitle>DANH SÁCH RẠP</Subtitle>
        <TheaterSelection>
          <Select name="city" id="city">
            <option value="hue">Huế</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hochiminh">TP Hồ Chí Minh</option>
          </Select>
        </TheaterSelection>

        </div>
        {/* Theater Information */}
        <TheaterInfo>
          <div style={{display: 'flex',flexDirection:'column', justifyContent:'left'}}>
          <TheaterName>Cinestar Huế</TheaterName>
          <Address>25 Hai Bà Trưng, Vĩnh Ninh, Thành phố Huế, Thừa Thiên Huế</Address>
          <p>Standard</p>
          </div>
          <Showtimes>
            <ShowtimeButton
              selected={selectedShowtime === "08:45"}
              onClick={() => setSelectedShowtime("08:45")}
            >
              08:45
            </ShowtimeButton>
            <ShowtimeButton
              selected={selectedShowtime === "12:45"}
              onClick={() => setSelectedShowtime("12:45")}
            >
              12:45
            </ShowtimeButton>
            <ShowtimeButton
              selected={selectedShowtime === "20:10"}
              onClick={() => setSelectedShowtime("20:10")}
            >
              20:10
            </ShowtimeButton>
          </Showtimes>
        </TheaterInfo>
        </div>
      </Container2>
      <ContainerTicket>
      <TitleTicket>CHỌN LOẠI VÉ</TitleTicket>
      <TicketContainer>
        <TicketBox>
          <TicketType>NGƯỜI LỚN</TicketType>
          <TicketCategory>ĐƠN</TicketCategory>
          <Price>45,000 VNĐ</Price>
          <QuantityContainer>
            <QuantityButton onClick={() => setAdultTicketCount(Math.max(adultTicketCount - 1, 0))}>-</QuantityButton>
            <QuantityDisplay>{adultTicketCount}</QuantityDisplay>
            <QuantityButton onClick={() => setAdultTicketCount(adultTicketCount + 1)}>+</QuantityButton>
          </QuantityContainer>
        </TicketBox>
        <TicketBox>
          <TicketType>NGƯỜI LỚN</TicketType>
          <TicketCategory>ĐÔI</TicketCategory>
          <Price>95,000 VNĐ</Price>
          <QuantityContainer>
            <QuantityButton onClick={() => setChildTicketCount(Math.max(childTicketCount - 1, 0))}>-</QuantityButton>
            <QuantityDisplay>{childTicketCount}</QuantityDisplay>
            <QuantityButton onClick={() => setChildTicketCount(childTicketCount + 1)}>+</QuantityButton>
          </QuantityContainer>
        </TicketBox>
      </TicketContainer>
    </ContainerTicket>
        
        <Container>
      <Screen>Màn hình</Screen>
      <Seating>
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
          <Row1 key={row}>
            <Label>{row}</Label>
            {seatsData
              .filter((seat) => seat.id.startsWith(row))
              .map((seat) => (
                <Seat
                  key={seat.id}
                  status={seat.status}
                  selected={selectedSeats.includes(seat.id)}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.id}
                </Seat>
              ))}
          </Row1>
        ))}
      </Seating>
    </Container>
    </div>
  )
}

export default MovieDetailComponent
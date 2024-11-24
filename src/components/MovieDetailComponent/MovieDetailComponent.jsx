import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import { CloseOutlined } from '@ant-design/icons';
import {Col, Row} from 'antd'
import { vi } from "date-fns/locale"; // Import locale tiếng Việt
import removeAccents from 'remove-accents';
import { Address, CardDetail, Container, Container2, ContainerTicket, StyleDate, DateSelection, Label, MovieDescription, MovieDescription2, MovieDescriptionName, MovieHeaderName, Overlay, Price, QuantityButton, QuantityContainer, QuantityDisplay, Row1, Screen, Seat, Seating, Select, ShowtimeButton, Showtimes, Subtitle, TheaterInfo, TheaterName, TheaterSelection, TicketBox, TicketCategory, TicketContainer, TicketType, Title1, TitleTicket, TrailerContainer, ViewTrailer, WrapperContainer } from './style'
import { faTag, faUser, faStar, faClock } from '@fortawesome/free-solid-svg-icons'; // Nhập các biểu tượng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ModalCustom} from '../CardComponent/style';
import FooterTicketInfo from "../FooterTicketInfo/FooterTicketInfo";
import ComboComponent from "../ComboComponent/ComboComponent";
import { format, addDays } from "date-fns"; // Thư viện để xử lý ngày tháng
import newRequest from "../../utils/request";
function MovieDetailComponent({movie, idParams}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [location, setLocation] = useState("hanoi")
  const playerRef = useRef(null);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedShowtime, setSelectedShowtime] = React.useState("");
  const [adultTicketCount, setAdultTicketCount] = useState(0);
  const [childTicketCount, setChildTicketCount] = useState(0);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null);  // State để lưu id rạp được chọn
  const [cinemas, setCinemas] = useState([])
  const [showtime, setShowtime] = useState([])
  const [seats, setSeats] = useState([])
  const handleTheaterSelect = (id) => {
    setSelectedTheaterId(id);  // Cập nhật ID rạp được chọn
  };
  const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Kạn", "Bắc Giang", "Bắc Ninh", 
    "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước", "Bình Thuận", "Cà Mau", 
    "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", 
    "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", 
    "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", 
    "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", 
    "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", 
    "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", 
    "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", 
    "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", 
    "Vĩnh Phúc", "Yên Bái"
  ];
  const getNextDates = (numDays) => {
    const today = new Date(); // Ngày hôm nay
    const year = today.getFullYear(); // Lấy năm hiện tại
  
    return Array.from({ length: numDays }, (_, i) => {
      const nextDate = addDays(today, i); // Thêm i ngày vào hôm nay
  
      // Định dạng ngày thành "dd/MM"
      const formattedDate = format(nextDate, "dd/MM");
  
      // Định dạng ngày thành "yyyy-MM-dd" để lưu vào cơ sở dữ liệu
      const dbFormattedDate = format(nextDate, "yyyy-MM-dd");
  
      // Lấy tên ngày bằng tiếng Việt
      const dayName = format(nextDate, "EEEE", { locale: vi });
  
      return {
        date: formattedDate,    // Định dạng ngày cho người dùng (dd/MM)
        dayName: dayName,       // Tên ngày (ví dụ: "Chủ Nhật")
        value: dbFormattedDate  // Giá trị ngày cho cơ sở dữ liệu (yyyy-MM-dd)
      };
    });
  };
  
  const dates = getNextDates(5); // Lấy 5 ngày tiếp theo
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
  const fetchCinema = async()=>{
    try{
       const reponse = await newRequest.post('/api/cinema/get/all/city',{
        movie_id: idParams,  // ID phim
        city: location,    // Tên thành phố
        day_book: selectedDate // Ngày đặt vé
       });
       setCinemas(reponse.data.cinemas || [])
    }
    catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
   fetchCinema()
  },[selectedDate,location])

  const fetchShowtime = async()=>{
    try{
       const reponse = await newRequest.post('/api/showtime/get/all/showtime',{
        movie_id: idParams,  // ID phim
        cinema_id: selectedTheaterId,    // Tên thành phố
        day_show: selectedDate // Ngày đặt vé
       });
       setShowtime(reponse.data.showtimes || [])

    }
    catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
     fetchShowtime(selectedShowtime)
  },[idParams, selectedTheaterId, selectedDate])
   const fetchSeats = async()=>{
    try{
          const reponse = await newRequest.get(`/api/seat/get/by/showtime/${selectedShowtime}`)
          setSeats(reponse.data.seats || [])
    }
    catch(error){
      console.error(error)
    }
   }
   useEffect(()=>{
    fetchSeats(selectedShowtime)
   },[selectedShowtime])
  return (
    <div  >
        <Row style={{position: 'relative', top:'20px'}}>
          <Col span={10}>
            <img
              alt="Movie Poster"
              src={movie.poster_url}
              style={{ width: "550px", height: "800px", objectFit: "cover", border: '1px solid #726565', borderRadius: '8px' }}></img>
          </Col>
          <Col span={13.5} style={{marginLeft: '50px', maxWidth:'650px'}}>
             <WrapperContainer>
                <MovieHeaderName>{movie.title}</MovieHeaderName>
                <Overlay>
                  <CardDetail><span style={{ color: '#F3EA28' }}> <FontAwesomeIcon icon={faTag} style={{ marginRight: '10px' }} /> </span>{movie.kind}</CardDetail>
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> </span>{movie.director}</CardDetail>
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faStar} style={{ marginRight: '10px' }} /> </span>8.5/10</CardDetail>
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faClock} style={{ marginRight: '10px' }} /></span>{movie.duration}'</CardDetail>
                </Overlay>
                <MovieDescriptionName>MÔ TẢ</MovieDescriptionName>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                     <MovieDescription>Đạo diễn: {movie.director}</MovieDescription>
                     <MovieDescription>Diễn viên: {movie.actors}</MovieDescription>
                     <MovieDescription>Khởi chiếu: {movie.release_date}</MovieDescription>
                </div>
                <MovieDescriptionName>NỘI DUNG PHIM</MovieDescriptionName>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                     <MovieDescription2>{movie.text_description} </MovieDescription2>                   
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
            videoId={movie.trailer_url} // Thay VIDEO_ID với ID của video YouTube
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

        
        <DateSelection>
          {dates.map(({ date, dayName, value }, index) => (
        <StyleDate
          key={index}
          selected={selectedDate === value}
          onClick={() => setSelectedDate(value)}
        >
          <p>{date}</p>
          <span style={{ fontWeight: "500" }}>{dayName}</span>
        </StyleDate>
      ))}
          
        </DateSelection>

        {/* Theater Selection */}
        <div style={{ maxWidth: '800px', margin: '60px 0 20px 250px'}}>
        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems:'center',justifyContent:'space-between'}}>
        <Subtitle>DANH SÁCH RẠP</Subtitle>
        <TheaterSelection>
          <Select name="city" id="city" value={location} onChange={(e)=>setLocation(e.target.value)} >
          {provinces.map((province, index) => (
            <option 
              key={index} 
              value={removeAccents (province).toLowerCase().replace(/ /g, "")}
            >
           {province}
          </option>
          ))}
          </Select>
        </TheaterSelection>

        </div>
        {/* Theater Information */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        {cinemas.length > 0 ? (cinemas.map((cinema) => (
        <TheaterInfo
          key={cinema.cinemaId}
          selected={selectedTheaterId === cinema.cinemaId}  // Kiểm tra xem rạp này có được chọn hay không
          onClick={() => handleTheaterSelect(cinema.cinemaId)}  // Gọi handle khi click vào rạp
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
            <TheaterName>{cinema.cinemaName}</TheaterName>
            <Address>{cinema.address}</Address>
            <p>Standard</p>
          </div>
        </TheaterInfo>
      ))) : (
        <p>Không có rạp chiếu</p>
      )}
        </div>
        {cinemas.length > 0 && <TitleTicket style={{margin: '70px 0 20px 0'}}>CHỌN GIỜ CHIẾU</TitleTicket>}
        <Showtimes>
          { showtime.map((showtime,index)=>(

            <ShowtimeButton key={index} 
              selected={selectedShowtime === showtime.id}
              onClick={() => setSelectedShowtime(showtime.id)}
            >
              {showtime.time_show}
            </ShowtimeButton> 
          ))}
            
          </Showtimes>
        </div>
      </Container2>
      {selectedShowtime !== "" && <ContainerTicket>
      <TitleTicket>CHỌN LOẠI VÉ</TitleTicket>
      <TicketContainer>
        <TicketBox>
          <TicketType>NGƯỜI LỚN</TicketType>
          <TicketCategory>ĐƠN</TicketCategory>
          <Price>{movie.child_price} VNĐ</Price>
          <QuantityContainer>
            <QuantityButton onClick={() => setAdultTicketCount(Math.max(adultTicketCount - 1, 0))}>-</QuantityButton>
            <QuantityDisplay>{adultTicketCount}</QuantityDisplay>
            <QuantityButton onClick={() => setAdultTicketCount(adultTicketCount + 1)}>+</QuantityButton>
          </QuantityContainer>
        </TicketBox>
        <TicketBox>
          <TicketType>NGƯỜI LỚN</TicketType>
          <TicketCategory>ĐÔI</TicketCategory>
          <Price>{movie.adult_price} VNĐ</Price>
          <QuantityContainer>
            <QuantityButton onClick={() => setChildTicketCount(Math.max(childTicketCount - 1, 0))}>-</QuantityButton>
            <QuantityDisplay>{childTicketCount}</QuantityDisplay>
            <QuantityButton onClick={() => setChildTicketCount(childTicketCount + 1)}>+</QuantityButton>
          </QuantityContainer>
        </TicketBox>
      </TicketContainer>
    </ContainerTicket>}
        
    {seats.length>0 &&  <Container>
        <Screen>Màn hình</Screen>
      <Seating>
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map((row) => (
          <Row1 key={row}>
            <Label>{row}</Label>
            { seats
              .filter((seat) => seat.seat_number.startsWith(row))
              .map((seat) => (
                <Seat
                  key={seat.id}
                  status={seat.status}
                  selected={selectedSeats.includes(seat.id)}
                  onClick={() => handleSeatClick(seat)}
                >
                  {seat.seat_number}
                </Seat>
              ))}
          </Row1>
        ))}
      </Seating>
    </Container>}
    <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
    <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
    <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
    <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
          <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
          <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
          <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
          <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
          <ComboComponent image="https://api-website.cinestar.com.vn/media/.thumbswysiwyg/pictures/PICCONNEW/CNS034_COMBO_PARTY.png?rand=1723084117"
          title="COMBO SOLO"
          description="1 Bắp Ngọt 60oz + 1 Coke 32oz"
          price="84,000" />
    </div>
    {/* <FooterTicketInfo /> */}
    </div>
  )
}

export default MovieDetailComponent
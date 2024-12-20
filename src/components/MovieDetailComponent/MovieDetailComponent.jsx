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
import SockJS from "sockjs-client";
import { Client, Stomp} from "@stomp/stompjs";
import MovieApp from "../MovieAppComponent/MovieApp";
function MovieDetailComponent({movie, idParams}) {
  const [nameCinema, setNameCinema] = useState("")
  const [totalPrice,setTotalPrice] = useState(0)
  const [showtime_hour,setShowtime_hour] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screen, setScreen] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [location, setLocation] = useState("hanoi")
  const playerRef = useRef(null);
  const [selectedDate, setSelectedDate] = React.useState("");
  const [selectedShowtime, setSelectedShowtime] = React.useState(0);
  const [adultTicketCount, setAdultTicketCount] = useState(0);
  const [childTicketCount, setChildTicketCount] = useState(0);
  const [maxSeats,setMaxSeats] = useState(0)
  const [selectedTheaterId, setSelectedTheaterId] = useState(0);  // State để lưu id rạp được chọn
  const [cinemas, setCinemas] = useState([])
  const [showtime, setShowtime] = useState([])
  const [seats, setSeats] = useState([])
  const [combos, setCombos] = useState([])
  const [selectedCombos, setSelectedCombos] = useState([]);
  const [changeBook, setChangeBook] = useState(0)
  const [rate, setRate] = useState(0)
const fetchRate =  async(movieId)=>{
  try{
     const reponse = await newRequest.get(`/api/rate/get/rate/${movieId}`)
     if(reponse.status==200 && reponse.data.rate !==0){
      setRate(reponse.data.rate || 0)
     }
  }
  catch(error){
    console.log(error)
  }
}
useEffect(()=>{
  fetchRate(movie.id)
},[])
  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws'); // Kết nối WebSocket
    const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: (str) => console.log(str), // Log WebSocket events
    });

    stompClient.onConnect = () => {
        console.log(`Connected to WebSocket for movie ${idParams}`);

        // Subscribe đến topic `/topic/payment/{ticketId}`
        stompClient.subscribe(`/topic/movie/${idParams}`, (message) => {
          setChangeBook(prev => prev + 1); // Đảm bảo cập nhật đúng state
        });
    };

    stompClient.onStompError = (frame) => {
        console.error('STOMP Error:', frame);
    };

    stompClient.activate(); // Bắt đầu kết nối

    // Cleanup khi component unmount
    return () => {
        stompClient.deactivate();
    };
}, [idParams]);
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
  const handleClear = ()=>{
    setCinemas([])
    setSelectedShowtime(0)
    setSelectedTheaterId(0)
    setSeats([])
  }
  const handleQuantityChangeCombo = (combo_id, name, quantity, price) => {
    console.log('Price in handleQuantityChangeCombo:', combos); // Kiểm tra giá trị price
  
    setSelectedCombos((prevCombos) => {
      // Tìm combo trong danh sách hiện tại
      const existingCombo = prevCombos.find((combo) => combo.combo_id === combo_id);
      
      if (existingCombo) {
        // Cập nhật số lượng và giá nếu combo đã tồn tại
        return quantity > 0
          ? prevCombos.map((combo) =>
              combo.combo_id === combo_id ? { ...combo, quantity, price } : combo
            )
          : prevCombos.filter((combo) => combo.combo_id !== combo_id); // Xóa nếu quantity = 0
      }
      
      // Thêm combo mới nếu chưa tồn tại, bao gồm price
      return [...prevCombos, { combo_id, name, quantity, price }];
    });
  };
  
  

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
  useEffect(() => {
    let totalpriceCombo = 0;

    // Duyệt qua selectedCombos để tính tổng
    if (selectedCombos.length > 0) {
      for (let i = 0; i < selectedCombos.length; i++) {
        const selectedCombo = selectedCombos[i];
        
        // Tìm thông tin combo trong mảng combos dựa trên id
        const comboDetails = combos.find(combo => combo.id === selectedCombo.combo_id);
        
        // Nếu tìm thấy combo, tính giá trị
        if (comboDetails) {
          totalpriceCombo += comboDetails.price * selectedCombo.quantity;
        }
      }
    }
    
    console.log('Total price of selected combos:', totalpriceCombo);
  
    const ticketTotal =
      adultTicketCount * movie.adult_price +
      childTicketCount * movie.child_price +
      totalpriceCombo;
  
    setTotalPrice(ticketTotal);
    setMaxSeats(childTicketCount + adultTicketCount);
    
  }, [adultTicketCount, childTicketCount, selectedCombos, movie]);
     useEffect(()=>{
      setSelectedSeats([]);
     },[adultTicketCount, childTicketCount])
  const dates = getNextDates(5); // Lấy 5 ngày tiếp theo
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const handleSeatClick = (seat) => {
    // Hàm kiểm tra điều kiện ghế cách xa nhau
    const isFarEnough = (newSeatId) => {
      const distance = maxSeats; // Khoảng cách tối thiểu (số ghế giữa các ghế đã chọn)
      return selectedSeats.every((selectedSeatId) => {
        const distanceBetweenSeats = Math.abs(newSeatId - selectedSeatId);
        return distanceBetweenSeats <= distance-1;
      });
    };
  
    if (selectedSeats.length >= maxSeats) {
      if (selectedSeats.includes(seat.id)) {
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.includes(seat.id)
            ? prevSelectedSeats.filter((s) => s !== seat.id)
            : [...prevSelectedSeats, seat.id]
        );
      } else {
        if (maxSeats === 0) {
          alert(`Bạn hãy chọn loại ghế và số lượng trước nhé`);
          return;
        }
        alert(`Bạn chỉ được chọn tối đa ${maxSeats} ghế.`);
        return;
      }
    } else {
      if (seat.status === 'available') {
        // Kiểm tra điều kiện ghế cách xa nhau trước khi chọn
        if (!isFarEnough(seat.id)) {
          alert(`Ghế của bạn phải cách xa nhau ít nhất ${maxSeats} ghế.`);
          return;
        }
        
        setSelectedSeats((prevSelectedSeats) =>
          prevSelectedSeats.includes(seat.id)
            ? prevSelectedSeats.filter((s) => s !== seat.id)
            : [...prevSelectedSeats, seat.id]
        );
      }
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
  const fetchCombo = async()=>{
    try{
     const reponse = await newRequest.post('/api/combo/get/all')
     setCombos(reponse.data.combos || [])
    }
    catch(error){
      console.log(error)
    }
  }
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
     fetchCombo()
  },[idParams, selectedTheaterId, selectedDate])
  useEffect(() => {
    const fetchSeats = async () => {
        try {
            const response = await newRequest.get(`/api/seat/get/by/showtime/${selectedShowtime}`);
            setSeats(response.data.seats || []);
            setScreen(response.data.screen || []);
        } catch (error) {
            console.error(error);
        }
    };

    if (selectedShowtime) {
        fetchSeats();
    }
}, [selectedShowtime, changeBook]);
   useEffect(()=>{
    console.log(selectedSeats)
   },[selectedSeats])
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
                  <CardDetail><span style={{ color: '#F3EA28' }}><FontAwesomeIcon icon={faStar} style={{ marginRight: '10px' }} /> </span>{rate}/10</CardDetail>
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
                <div style={{marginTop:'10px'}}>
                   <MovieApp movieId={movie.id}/>
                </div>
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
          onClick={() => {setSelectedDate(value); handleClear()}}
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
          onClick={() => {handleTheaterSelect(cinema.cinemaId); setNameCinema(cinema.cinemaName)}}  // Gọi handle khi click vào rạp
        >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
            <TheaterName>{cinema.cinemaName}</TheaterName>
            <Address>{cinema.address}</Address>
            <p>Standard</p>
          </div>
        </TheaterInfo>
      ))) : (
        <p style={{color: '#999'}} >Không có rạp chiếu</p>
      )}
        </div>
        {selectedTheaterId !== 0 && <TitleTicket style={{margin: '70px 0 20px 0'}}>CHỌN GIỜ CHIẾU</TitleTicket>}
        <Showtimes>
          {selectedTheaterId !== 0 && showtime.map((showtime,index)=>(

            <ShowtimeButton key={index} 
              selected={selectedShowtime === showtime.id}
              onClick={() => {setSelectedShowtime(showtime.id); setShowtime_hour(showtime.time_show)  }}
            >
              {showtime.time_show}
            </ShowtimeButton> 
          ))}
            
          </Showtimes>

        </div>
      </Container2>
      {selectedShowtime !== 0 && <ContainerTicket>
      <TitleTicket>CHỌN LOẠI VÉ</TitleTicket>
      <TicketContainer>
        <TicketBox>
          <TicketType>NGƯỜI LỚN</TicketType>
          <TicketCategory>ĐƠN</TicketCategory>
          <Price>{movie.adult_price} VNĐ</Price>
          <QuantityContainer>
            <QuantityButton onClick={() => setAdultTicketCount(Math.max(adultTicketCount - 1, 0))}>-</QuantityButton>
            <QuantityDisplay>{adultTicketCount}</QuantityDisplay>
            <QuantityButton onClick={() => setAdultTicketCount(adultTicketCount + 1)}>+</QuantityButton>
          </QuantityContainer>
        </TicketBox>
        <TicketBox>
          <TicketType>TRẺ CON</TicketType>
          <TicketCategory>Đơn</TicketCategory>
          <Price>{movie.child_price} VNĐ</Price>
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
    {selectedShowtime!== 0 && <div style={{marginBottom:'200px', display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'}}>
    {combos.map((combo, index) => (
  <ComboComponent
    key={index}
    combo_id={combo.id} // id của combo
    image={combo.avt_url}
    title={combo.name}
    description={combo.description}
    price={combo.price}
    onQuantityChange={handleQuantityChangeCombo} // Truyền hàm quản lý số lượng
  />
))}
    </div>}
    {selectedTheaterId && <FooterTicketInfo cinemaName={nameCinema} nameMovie={movie.title} amountAdult={adultTicketCount} 
    amountChild={childTicketCount} totalPrice={totalPrice} seats={seats} selectedSeats={selectedSeats} showtime_hour={showtime_hour}
    screen={screen} selectedCombos={selectedCombos} selectedShowtime={selectedShowtime} movie={movie} />  }
    
    </div>
  )
}

export default MovieDetailComponent
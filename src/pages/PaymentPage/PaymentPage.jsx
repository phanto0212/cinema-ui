import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import newRequest from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
// Container chính
const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px;
  background-color: #141e30;
  height: 100%;
  margin-top: 91.5px;
  flex-wrap: wrap;
`;

// Phần thanh toán
const PaymentSection = styled.div`
  flex: 1;
  max-width: 500px;
  max-height: 500px;
  background-color: #1d2b41;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  margin-right: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

// Phần thông tin vé phim
const TicketInfoSection = styled.div`
  flex: 2;
  max-width: 500px;
  max-height: 500px;
  background-color: #246eb9;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
`;

// Tiêu đề phần
const Header = styled.h2`
  color: yellow;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-size: 24px;
  letter-spacing: 1px;
  font-weight: bold;
`;

// Nút thanh toán VNPay
const VNPayButton = styled.div`
  background-color: #ffcb00;
  color: black;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffd700;
  }

  img {
    width: 60px;
    margin-right: 15px;
  }
`;

// Thông tin vé phim
const TicketDetails = styled.div`
  color: white;
  line-height: 1.8;
  font-size: 16px;
`;

// Nút Quay lại và Thanh toán
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

// Nút (Quay lại, Thanh toán)
const Button = styled.button`
  background-color: yellow;
  color: black;
  border: none;
  padding: 15px 30px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ffd700;
    transform: translateY(-3px);
  }
`;

// Component chính
const PaymentPage = () => {
    const params = useParams()
    const id = params.ticketId
    const [cinema, setCinema] = useState([])
    const [movie, setMovie] = useState([])
    const [showtime, setShowtime] = useState([])
    const [line_combos, setLine_combos] = useState([])
    const [screen, setScreen] = useState([])
    const [line_tickets, setLine_tickets] = useState([])
    const [ticket, setTicket] = useState([])
    const Navigate = useNavigate()
    useEffect(() => {
      const socket = new SockJS('http://localhost:8081/ws'); // Kết nối WebSocket
      const stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log(str), // Log WebSocket events
      });

      stompClient.onConnect = () => {
          console.log(`Connected to WebSocket for ticket ${id}`);

          // Subscribe đến topic `/topic/payment/{ticketId}`
          stompClient.subscribe(`/topic/payment/${id}`, (message) => {
              alert(`Notification: ${message.body}`);
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
  }, [id]);
    const fetchInfoTicket = async()=>{
        try{
           const reponse = await newRequest.post(`/api/ticket/get/info/${id}`)
           setMovie(reponse.data.movie || [])
           setShowtime(reponse.data.showtime || [])
           setLine_combos(reponse.data.line_combos || [])
           setScreen(reponse.data.screen || [])
           setLine_tickets(reponse.data.line_tickets || [])
           setCinema(reponse.data.cinema || [])
           setTicket(reponse.data.ticket || [])
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
      fetchInfoTicket()
    }, [])
    const handlePayment = async (price, TicketId, userId) => {
      try {
          const response = await newRequest.get(`/api/v1/payment/vn-pay?amount=${price}&bankCode=NCB&bookingId=${TicketId}&userId=${userId}`);
          const paymentUrl = response.data.data.paymentUrl;
          window.open(paymentUrl, '_blank');
      } catch (error) {
          console.log('error', error);
      }
  };
  return (
    <div>
        <HeaderComponent />
    <div  style={{backgroundColor:'#141e30', height:'1000px', marginTop:'91.5px'}}>
      <Container>
        {/* Phần thanh toán */}
        <PaymentSection>
          <Header>Thanh toán</Header>
          <VNPayButton>
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.pn3RUm1xk1HiAxWIgC6CIwHaHa&pid=Api&P=0&h=220"
              alt="VNPay"
            />
            Thanh toán qua VNPay
          </VNPayButton>
        </PaymentSection>

        {/* Phần thông tin vé phim */}
        <TicketInfoSection>
          <Header>Thông tin vé phim</Header>
          <TicketDetails>
            <p><strong>Phim:</strong> {movie.title}</p>
            <p><strong>Rạp:</strong> {cinema.name}</p>
            <p><strong>Thời gian:</strong> {showtime.time_show} ngày {showtime.day_show}</p>
            <p><strong>Phòng chiếu:</strong> {screen.screen_number}</p>
            <p><strong>Số vé:</strong> {line_tickets.length}</p>
            <p><strong>Loại vé:</strong> Người Lớn</p>
            <p><strong>Loại ghế:</strong> Ghế Thường</p>
            <p><strong>Số ghế:</strong> {line_tickets.map((seat,index)=>(<span key={index} >{seat} ,</span>))}</p>
            <p>
  <strong>Bắp nước:</strong>
  {line_combos.length > 0 
    ? line_combos.map((combo, index) => (
        <span key={index}>{combo.name} x{combo.quantity}, </span>
      ))
    : "Không có combo nao ca"}
</p>
            <p><strong>Số tiền cần thanh toán:</strong> <span style={{ color: "yellow", fontWeight: 'bold' }}>{ticket.price} VND</span></p>
          </TicketDetails>

          <Footer>
            <Button onClick={()=>Navigate("/")}>Quay Lại</Button>
            <Button onClick={()=>handlePayment(ticket.price, ticket.ticket_id, ticket.user_id)}>Thanh Toán</Button>
          </Footer>
        </TicketInfoSection>
      </Container>
    </div>
    </div>
  );
};

export default PaymentPage;

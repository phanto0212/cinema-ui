import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import newRequest from "../../utils/request";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import Snowfall from "../../components/SnowComponent/Snowfall";
import Modal from "../../components/ModalComponent/Modal";
import { css } from 'styled-components';
import { 
  FaCreditCard, 
  FaFilm, 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaTicketAlt, 
  FaCouch,
  FaUtensils, 
  FaDollarSign,
  FaArrowLeft, 
  FaShieldAlt,
  FaCheck,
  FaLock,
  FaSpinner
} from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container chính
const PageWrapper = styled.div`
  background: linear-gradient(135deg, #1a1b2f 0%, #252a4f 50%, #1e1f35 100%);
  min-height: 100vh;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 35%, rgba(41, 46, 93, 0.8) 0%, transparent 25%),
      radial-gradient(circle at 75% 60%, rgba(30, 31, 53, 0.8) 0%, transparent 25%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  max-width: 1200px;
  margin: 110px auto 0;
  margin-top: 91.5px;
  flex-wrap: wrap;
  gap: 30px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 1024px) {
    padding: 30px;
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin: 0;
  padding-top: 30px;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #ff7401, #ff9249);
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

// Phần thanh toán
const PaymentSection = styled.div`
  flex: 1;
  min-width: 320px;
  max-width: 450px;
  background: rgba(30, 31, 53, 0.7);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.2s;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff7401, #ff9249);
    border-radius: 4px 4px 0 0;
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    max-width: 100%;
    width: 100%;
  }
`;

// Phần thông tin vé phim
const TicketInfoSection = styled.div`
  flex: 2;
  min-width: 320px;
  max-width: 600px;
  background: rgba(30, 31, 53, 0.7);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: ${fadeIn} 0.6s ease-out;
  opacity: 0;
  animation-fill-mode: forwards;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff7401, #ff9249);
    border-radius: 4px 4px 0 0;
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    max-width: 100%;
    width: 100%;
  }
`;

// Tiêu đề phần
const Header = styled.h2`
  color: white;
  margin-bottom: 25px;
  font-size: 24px;
  letter-spacing: 0.5px;
  font-weight: 700;
  text-align: left;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #ff7401;
  }
`;

// Phần phương thức thanh toán
const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
`;

// Lựa chọn phương thức thanh toán
const PaymentMethod = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${props => props.selected ? '#ff7401' : 'rgba(255, 255, 255, 0.1)'};
  padding: 15px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  ${props => props.selected && css`
    background: rgba(255, 116, 1, 0.1);
    box-shadow: 0 5px 15px rgba(255, 116, 1, 0.1);
  `}
  
  &::before {
    content: '';
    position: absolute;
    left: ${props => props.selected ? '0' : '-10px'};
    top: 0;
    bottom: 0;
    width: 4px;
    background: #ff7401;
    transition: all 0.3s ease;
  }
`;

const PaymentLogo = styled.div`
  width: 60px;
  height: 40px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const PaymentName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const PaymentDescription = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
`;

const PaymentSelection = styled.div`
  margin-left: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#ff7401' : 'rgba(255, 255, 255, 0.3)'};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${props => props.selected ? '#ff7401' : 'transparent'};
    transition: all 0.2s ease;
  }
`;

// Security Note
const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    color: #4CAF50;
    font-size: 18px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
    font-size: 13px;
  }
`;

// Thông tin vé phim
const TicketDetails = styled.div`
  color: white;
  line-height: 1.8;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: baseline;
  padding-bottom: 8px;
  ${props => !props.noBorder && css`
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  `}
  
  svg {
    color: #ff7401;
    margin-right: 10px;
    font-size: 16px;
    flex-shrink: 0;
  }
`;

const DetailLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  color: white;
  font-weight: 500;
`;

const PriceDetail = styled(DetailRow)`
  margin-top: 15px;
  padding: 15px;
  border: 1px solid rgba(255, 116, 1, 0.3);
  border-radius: 10px;
  background: rgba(255, 116, 1, 0.1);
  
  svg {
    color: #ffcb00;
  }
`;

const PriceValue = styled.span`
  color: #ffcb00;
  font-size: 22px;
  font-weight: 700;
`;

// Combo Pills
const ComboPills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
`;

const ComboPill = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 13px;
  color: white;
  display: flex;
  align-items: center;
  
  svg {
    font-size: 12px;
    margin-right: 5px;
    color: #ff7401;
  }
`;

// Nút chuyển hướng và thanh toán
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 15px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// Nút (Quay lại, Thanh toán)
const Button = styled.button`
  padding: 0;
  border: none;
  outline: none;
  background: ${props => props.primary ? 
    'linear-gradient(90deg, #ff7401, #ff9249)' : 
    'rgba(255, 255, 255, 0.1)'
  };
  color: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  height: 48px;
  padding: 0 25px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.primary ? 
    '0 4px 15px rgba(255, 116, 1, 0.2)' : 
    'none'
  };
  
  ${props => props.primary && css`
    border: none;
  `}
  
  ${props => !props.primary && css`
    border: 1px solid rgba(255, 255, 255, 0.1);
  `}
  
  svg {
    margin-right: 8px;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: ${props => props.primary ? 
      '0 6px 20px rgba(255, 116, 1, 0.3)' : 
      '0 6px 20px rgba(0, 0, 0, 0.1)'
    };
    
    ${props => !props.primary && css`
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.2);
    `}
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0) 100%);
    transition: all 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  @media (max-width: 576px) {
    width: 100%;
  }
`;
const SpinnerIcon = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
  margin-right: 8px;
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [header, setHeader] = useState('')
    const [message, setMessage] = useState('')
    const [handleOnClose, setHandleOnClose] = useState(null)
    const [selectedPayment, setSelectedPayment] = useState('vnpay');
    const [isLoading, setIsLoading] = useState(false);
    
    const Navigate = useNavigate()
    
    const fetchInfoTicket = async() => {
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
    
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
      fetchInfoTicket()
    }, [])

    useEffect(() => {
      const socket = new SockJS('https://cinema-be-1.onrender.com/ws');
      const stompClient = new Client({
          webSocketFactory: () => socket,
          debug: (str) => console.log('WebSocket Log:', str),
      });

      stompClient.onConnect = () => {
          console.log(`Connected to WebSocket for ticket ${id}`);

          stompClient.subscribe(`/topic/payment/${id}`, (message) => {
            const response = message.body;

            if (response === "success") {
              setHeader('Thanh toán thành công')
              setMessage('Vé của bạn đã thanh toán thành công! Chúng tôi đã gửi thông tin vé qua email của bạn.')
              setIsModalOpen(true)
              setHandleOnClose(() => {
                return () => {
                  setIsModalOpen(false);
                  Navigate(`/my/ticket`);
                };
              });
            } else if (response === "fail") {
              setHeader('Thanh toán thất bại')
              setMessage('Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.')
              setIsModalOpen(true)
              setHandleOnClose(() => {
                return () => {
                  setIsModalOpen(false);
                  Navigate('/');
                };
              });
            } else {
              console.warn("Thông báo không xác định:", response);
            }
          });
      };

      stompClient.onStompError = (frame) => {
          console.error('STOMP Error:', frame);
      };

      stompClient.activate();

      return () => {
          if (stompClient.active) {
              stompClient.deactivate();
          }
      };
    }, [id, movie.id]);
    
    const handlePayment = async (price, TicketId, userId) => {
      try {
          setIsLoading(true);
          const response = await newRequest.get(`/api/v1/payment/vn-pay?amount=${price}&bankCode=NCB&bookingId=${TicketId}&userId=${userId}`);
          const paymentUrl = response.data.data.paymentUrl;
          window.open(paymentUrl, '_blank');
      } catch (error) {
          console.log('error', error);
          setHeader('Lỗi kết nối')
          setMessage('Không thể kết nối đến cổng thanh toán. Vui lòng thử lại sau.')
          setIsModalOpen(true)
      } finally {
          setIsLoading(false);
      }
    };
    
    // Format currency
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      }).format(amount);
    };
    
    return (
      <PageWrapper>
        <Snowfall/>
        <HeaderComponent />
        <PageTitle>Thanh toán vé phim</PageTitle>
        <Container>
          {/* Phần thanh toán */}
          <PaymentSection>
            <Header>
              <FaCreditCard /> Phương thức thanh toán
            </Header>
            
            <PaymentMethods>
              <PaymentMethod 
                selected={selectedPayment === 'vnpay'} 
                onClick={() => setSelectedPayment('vnpay')}
              >
                <PaymentLogo>
                  <img
                    src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                    alt="VNPay"
                  />
                </PaymentLogo>
                <PaymentInfo>
                  <PaymentName>Thanh toán qua VNPay</PaymentName>
                  <PaymentDescription>Quét mã QR hoặc chuyển khoản</PaymentDescription>
                </PaymentInfo>
                <PaymentSelection selected={selectedPayment === 'vnpay'} />
              </PaymentMethod>
              
              {/* <PaymentMethod 
                selected={selectedPayment === 'card'}
                onClick={() => setSelectedPayment('card')}
              >
                <PaymentLogo>
                  <FaCreditCard style={{ fontSize: '30px', color: '#ff7401' }} />
                </PaymentLogo>
                <PaymentInfo>
                  <PaymentName>Thẻ tín dụng/Ghi nợ</PaymentName>
                  <PaymentDescription>Visa, Mastercard, JCB</PaymentDescription>
                </PaymentInfo>
                <PaymentSelection selected={selectedPayment === 'card'} />
              </PaymentMethod> */}
            </PaymentMethods>
            
            <SecurityNote>
              <FaLock />
              <p>Thông tin thanh toán của bạn được bảo mật bởi công nghệ mã hóa SSL 256-bit</p>
            </SecurityNote>
            
            <Footer>
              <Button 
                onClick={() => Navigate(-1)}
              >
                <FaArrowLeft /> Quay lại
              </Button>
              
              <Button 
                primary
                onClick={() => handlePayment(ticket.price, ticket.ticket_id, ticket.user_id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <SpinnerIcon />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <FaShieldAlt /> Thanh toán an toàn
                  </>
                )}
              </Button>
            </Footer>
          </PaymentSection>

          {/* Phần thông tin vé phim */}
          <TicketInfoSection>
            <Header>
              <FaTicketAlt /> Chi tiết đặt vé
            </Header>
            
            <TicketDetails>
              <DetailRow>
                <FaFilm />
                <DetailLabel>Phim:</DetailLabel>
                <DetailValue>{movie.title}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <FaMapMarkerAlt />
                <DetailLabel>Rạp:</DetailLabel>
                <DetailValue>{cinema.name}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <FaClock />
                <DetailLabel>Thời gian:</DetailLabel>
                <DetailValue>{showtime.time_show} ngày {showtime.day_show}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <FaFilm />
                <DetailLabel>Phòng chiếu:</DetailLabel>
                <DetailValue>{screen.screen_number}</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <FaUsers />
                <DetailLabel>Số vé:</DetailLabel>
                <DetailValue>{line_tickets.length} vé - Người lớn</DetailValue>
              </DetailRow>
              
              <DetailRow>
                <FaCouch />
                <DetailLabel>Số ghế:</DetailLabel>
                <DetailValue>
                  {line_tickets.join(', ')}
                </DetailValue>
              </DetailRow>
              
              <DetailRow noBorder>
                <FaUtensils />
                <DetailLabel>Bắp nước:</DetailLabel>
                <DetailValue>
                  {line_combos.length > 0 ? (
                    <ComboPills>
                      {line_combos.map((combo, index) => (
                        <ComboPill key={index}>
                          <FaCheck /> {combo.name} x{combo.quantity}
                        </ComboPill>
                      ))}
                    </ComboPills>
                  ) : (
                    "Không có combo nào"
                  )}
                </DetailValue>
              </DetailRow>
              
              <PriceDetail>
                <FaDollarSign />
                <DetailLabel>Tổng tiền:</DetailLabel>
                <PriceValue>{formatCurrency(ticket.price)}</PriceValue>
              </PriceDetail>
            </TicketDetails>
          </TicketInfoSection>
        </Container>
        
        <Modal 
          isOpen={isModalOpen} 
          header={header} 
          message={message} 
          onClose={handleOnClose}
        />
      </PageWrapper>
    );
};

export default PaymentPage;
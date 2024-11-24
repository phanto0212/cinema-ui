import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";
export const WrapperContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`
export const MovieHeaderName = styled.h1`
font-family: "Serif", sans-serif;
font-size : 2.5rem;
color: #fff;
margin-top: 15px;
`;
export const Overlay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #fff;
  
`;
export const CardDetail = styled.p`
position: relative;
font-family: "Serif", sans-serif;
padding-bottom: 7px;
font-size: 1.2rem;
color:#fff;
margin-right: 20px;
`;
export const MovieDescriptionName = styled.h1`
font-family: "Serif", sans-serif;
font-size : 1.5rem;
color: #fff;
margin-top: 15px;
margin-bottom: 30px;
`;
export const MovieDescription = styled.p`
font-family: "Fantasy", sans-serif;
font-size : 0.9rem;
color: #fff;
margin-top: 3px;

`;
export const MovieDescription2 = styled.p`
font-family: "Fantasy", sans-serif;
font-size : 1.1rem;
color: #fff;
margin-top: 3px;

`;
export const ModalCustom = styled(Modal)`
  & .ant-modal-content {
    background-color: transparent !important; /* Đặt nền modal trong suốt */
    box-shadow: none !important; /* Xóa bóng modal */
    border: none !important; /* Xóa viền modal */
    padding: 0;
  }

  & .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.5) !important; /* Điều chỉnh độ trong suốt của overlay */
  }
`;
export const TrailerContainer = styled.div`
display: flex;
flex-direction: row;
margin: 20px 0 10px 0;
width: 160px;
`;
export const ViewTrailer = styled.a`
text-decoration: underline;
font-size: 1.3rem;
color: #fff;
margin-left: 4px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0f172a;
  min-height: 100vh;
  color: #fff;
  padding-top: 100px;
`;

export const Screen = styled.div`
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
`;

export const Seating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Row1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const Label = styled.span`
  font-size: 1em;
  margin-right: 10px;
  color: #fff;
`;

export const Seat = styled.button`
  width: 40px;
  height: 40px;
  margin: 5px;
  border-radius: 8px;
  border: none;
  background-color: ${({ status, selected }) => 
    selected ? '#ffd700' : status === 'booked' ? '#888' : '#fff'};
  color: ${({ selected, status }) => 
    selected || status === 'booked' ? '#663399' : '#3b3b98'};
  cursor: ${({ status }) => (status === 'booked' ? 'not-allowed' : 'pointer')};
  font-weight: bold;

  &:hover {
    background-color: ${({ status }) => (status === 'available' ? 'tranparent' : '#888')};
  }
`;
export const GlobalStyle1 = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  body {
    background: linear-gradient(to right, #3b3b98, #283c86);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #fff;
  }
`;

// Container styles
export const Container2 = styled.div`
  text-align: center;
  margin-top: 100px;
`;

// Title styles
export const Title1 = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
  color: #fff;
`;

// Date selection styles
export const DateSelection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-bottom: 1.5em;
`;

export const StyleDate = styled.div`
  padding: 0.4em 0.4em;
  border: 1px solid #ffd700;
  border-radius: 10px;
  font-size: 22px;
  font-weight: 600; 
  min-width: 120px;
  color: ${props => (props.selected ? '#3b3b98' : '#ffd700')};
  background-color: ${props => (props.selected ? '#ffd700' : 'transparent')};
  cursor: pointer;

  & p, & span {
    margin: 0;
  }
`;

// Subtitle styles
export const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #fff;
`;

// Theater selection styles
export const TheaterSelection = styled.div`
  margin-bottom: 1em;
`;

export const Select = styled.select`
  padding: 0.7em 3em;
  border: 2px solid #ffd700;
  border-radius: 5px;
  background:#0F172A;
  color: #fff;
`;

// Theater info styles
export const TheaterInfo = styled.div`
  width: 100%;
  background-color: #6a0dad;
  padding: 1em;
  border-radius: 10px;
  margin-top: 20px;
  color: #ffd700;
  border: ${(props) => (props.selected ? '2px solid #FFD700' : 'none')};  /* Thêm border khi chọn rạp */
  cursor: pointer;  /* Thêm con trỏ để biết có thể click vào */
  transition: border 0.3s ease;  /* Thêm hiệu ứng border khi click */
`;

export const TheaterName = styled.h3`
  margin-bottom: 0.5em;
  color: #ffd700;
`;

export const Address = styled.p`
  margin: 0.5em 0;
`;

export const Showtimes = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 1em;
`;

export const ShowtimeButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.selected ? '#ffd700' : '#3b3b98')};
  color: ${props => (props.selected ? '#3b3b98' : '#ffd700')};
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ffd700;
    color: #3b3b98;
  }
`;
export const ContainerTicket = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  color: white;
`;

export const TitleTicket = styled.h2`
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
`;

export const TicketContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const TicketBox = styled.div`
  background-color: #2e2e4d;
  border: 1px solid #64648a;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  text-align: center;
`;

export const TicketType = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 5px;
`;

export const TicketCategory = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;
`;

export const Price = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
`;

export const QuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #64648a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #4d4d73;
  }
`;

export const QuantityDisplay = styled.div`
  width: 30px;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 10px;
`;
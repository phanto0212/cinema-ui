import styled, { createGlobalStyle } from "styled-components";
import { Modal } from "antd";

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const MovieHeaderName = styled.h1`
  font-family: "Serif", sans-serif;
  font-size: 2.5rem;
  color: #fff;
  margin-top: -7px;
  
  @media (max-width: 1024px) {
    font-size: 2rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
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
  color: #fff;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding-bottom: 5px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const MovieDescriptionName = styled.h1`
  font-family: "Serif", sans-serif;
  font-size: 1.5rem;
  color: #fff;
  margin-top: 12px;
  margin-bottom: 12px;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-top: 10px;
    margin-bottom: 8px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const MovieDescription = styled.p`
  font-family: "Fantasy", sans-serif;
  font-size: 0.9rem;
  color: #fff;
  margin-top: 3px;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const MovieDescription2 = styled.p`
  font-family: "Fantasy", sans-serif;
  font-size: 1.1rem;
  color: #fff;
  margin-top: 3px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ModalCustom = styled(Modal)`
  & .ant-modal-content {
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0;
  }

  & .ant-modal-mask {
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  
  @media (max-width: 768px) {
    width: 90vw !important;
    
    .ant-modal-body {
      height: auto !important;
    }
    
    & div[style*="height: 450px"] {
      height: 300px !important;
    }
  }
  
  @media (max-width: 480px) {
    & div[style*="height: 450px"] {
      height: 240px !important;
    }
  }
`;

export const TrailerContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0 10px 0;
  width: 160px;
  
  @media (max-width: 480px) {
    margin: 15px 0 8px 0;
  }
`;

export const ViewTrailer = styled.a`
  text-decoration: underline;
  font-size: 1.3rem;
  color: #fff;
  margin-left: 4px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #292e5d;
  min-height: 100vh;
  color: #fff;
  padding-top: 100px;
  
  @media (max-width: 768px) {
    padding-top: 50px;
    padding: 50px 10px;
  }
`;

export const Screen = styled.div`
  text-align: center;
  font-size: 1.5em;
  margin-bottom: 20px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
  
  @media (max-width: 768px) {
    font-size: 1.2em;
    margin-bottom: 15px;
    width: 90%;
  }
`;

export const Seating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

export const Row1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-width: min-content;
  
  @media (max-width: 768px) {
    margin-bottom: 5px;
  }
`;

export const Label = styled.span`
  font-size: 1em;
  margin-right: 10px;
  color: #fff;
  
  @media (max-width: 480px) {
    font-size: 0.9em;
  }
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
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 0.9em;
  }
  
  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin: 3px;
    font-size: 0.8em;
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
  
  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

// Title styles
export const Title1 = styled.h1`
  font-size: 2em;
  margin-bottom: 1em;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 1.7em;
    margin-bottom: 0.8em;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5em;
  }
`;

// Date selection styles
export const DateSelection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1em;
  margin-bottom: 1.5em;
  overflow-x: auto;
  padding: 10px 0;
  
  @media (max-width: 768px) {
    gap: 0.5em;
    justify-content: flex-start;
    padding-left: 10px;
  }
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
  flex-shrink: 0;

  & p, & span {
    margin: 0;
  }
  
  @media (max-width: 768px) {
    font-size: 18px;
    min-width: 100px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
    min-width: 90px;
    padding: 0.3em;
  }
`;

// Subtitle styles
export const Subtitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1em;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 1.3em;
  }
  
  @media (max-width: 480px) {
    font-size: 1.2em;
  }
`;

// Theater selection styles
export const TheaterSelection = styled.div`
  margin-bottom: 1em;
  
  @media (max-width: 768px) {
    margin-bottom: 0.5em;
  }
`;

export const Select = styled.select`
  padding: 0.7em 3em;
  border: 2px solid #ffd700;
  border-radius: 5px;
  background: #292e5d;
  color: #fff;
  
  @media (max-width: 768px) {
    padding: 0.6em 2em;
  }
  
  @media (max-width: 480px) {
    padding: 0.5em 1.5em;
    font-size: 0.9em;
  }
`;

// Theater info styles
export const TheaterInfo = styled.div`
  width: 100%;
  background-color: #6a0dad;
  padding: 1em;
  border-radius: 10px;
  margin-top: 20px;
  color: #ffd700;
  border: ${(props) => (props.selected ? '2px solid #FFD700' : 'none')};
  cursor: pointer;
  transition: border 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.8em;
    margin-top: 15px;
  }
  
  @media (max-width: 480px) {
    padding: 0.7em;
    margin-top: 10px;
  }
`;

export const TheaterName = styled.h3`
  margin-bottom: 0.5em;
  color: #ffd700;
  
  @media (max-width: 480px) {
    font-size: 1em;
    margin-bottom: 0.3em;
  }
`;

export const Address = styled.p`
  margin: 0.5em 0;
  
  @media (max-width: 480px) {
    font-size: 0.9em;
    margin: 0.3em 0;
  }
`;

export const Showtimes = styled.div`
  display: flex;
  gap: 1em;
  margin-top: 1em;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 0.7em;
  }
  
  @media (max-width: 480px) {
    gap: 0.5em;
  }
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
  
  @media (max-width: 480px) {
    padding: 0.5em 0.8em;
    font-size: 0.9em;
  }
`;

export const ContainerTicket = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  color: white;
  
  @media (max-width: 768px) {
    margin-top: 70px;
  }
  
  @media (max-width: 480px) {
    margin-top: 50px;
  }
`;

export const TitleTicket = styled.h2`
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.7rem;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
`;

export const TicketContainer = styled.div`
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    width: 90%;
  }
`;

export const TicketBox = styled.div`
  background-color: #2e2e4d;
  border: 1px solid #64648a;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  text-align: center;
  
  @media (max-width: 1024px) {
    width: 400px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 15px;
  }
`;

export const TicketType = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const TicketCategory = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const Price = styled.div`
  font-size: 1rem;
  margin-bottom: 15px;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
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
  
  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 1.1rem;
  }
`;

export const QuantityDisplay = styled.div`
  width: 30px;
  text-align: center;
  font-size: 1.2rem;
  margin: 0 10px;
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;
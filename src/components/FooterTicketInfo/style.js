import styled from "styled-components";
export const TicketInfo = styled.div`
  background-color: #0F172A;
  color: white;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

export const MovieTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
  margin-right: 30px;
`;

export const MovieDetails = styled.div`
  font-size: 16px;
  color: #c7c7c7;
  margin-bottom: 20px;
  margin-right: 30px;
`;

export const SelectedSeats = styled.div`
  display:flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const PaymentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 100px;
  margin-bottom: 10px;
  
`;

export const Timer = styled.div`
  background-color: #ffeb3b;
  color: #1a2a40;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;

  text-align: center;
  margin: 0 5px;
`;

export const TotalAmount = styled.div`
 
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;

  text-align: center;
  margin: 0 5px;
`;

export const BookButton = styled.button`
  background-color: #ffeb3b;
  color: #1a2a40;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  
  text-align: center;
  margin: 0 5px;
  &:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}
`;
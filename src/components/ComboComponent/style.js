import styled from "styled-components"

export const Container = styled.div`
  background-color: #1a2a40;
  padding: 20px;
  color: white;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const ComboContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const ComboCard = styled.div`
  background-color: #1c1e2e;
  padding: 20px;
  width: 250px;
  border-radius: 10px;
  text-align: center;
`;

export const ComboImage = styled.img`
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: transform 0.3s ease; /* Thêm transition để hiệu ứng mượt hơn */

  &:hover {
    transform: scale(1.2) rotate(10deg); /* Xoay nhẹ sang phải khi hover */
  }
`;


export const ComboTitle = styled.h3`
  font-size: 18px;
  color: #fdd835;
  margin: 10px 0;
`;

export const ComboDescription = styled.p`
  font-size: 14px;
  color: #ffffff;
`;

export const Price = styled.p`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;

export const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

export const QuantityButton = styled.button`
  background-color: #4a4f63;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
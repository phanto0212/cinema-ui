import { Card } from "antd";
import styled from "styled-components";

export const { Meta } = Card;

export const StyledCard = styled(Card)`
  width: 300px;
  overflow: hidden;
  border-radius: 8px;
  border:none;
  background-color: #050912;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  
  /* Ảnh phóng to khi hover */
  .ant-card-cover img {
    transition: transform 0.3s ease;
  }

  &:hover .ant-card-cover img {
    transform: scale(1.1);
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  text-align: center;
  padding: 10px;
  border-radius: 8px;
  
  /* Hiển thị thông tin khi hover */
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

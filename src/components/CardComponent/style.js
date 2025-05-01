import { Card } from "antd";
import styled from "styled-components";
import { Modal } from "antd"; 
export const { Meta } = Card;

export const StyledCard = styled(Card)`
  width: 300px;
  overflow: hidden;
  border-radius: 8px;
  border: none;
  background-color: #292e5d;
  transition: transform 0.3s ease;
  
  .ant-card-body {
    padding: 0px;
  }
  
  /* Ảnh phóng to khi hover */
  .ant-card-cover img {
    transition: transform 0.3s ease;
    width: 100% !important;
    height: 355px !important;
    object-fit: cover !important;
  }

  &:hover .ant-card-cover img {
    transform: scale(1.1);
  }
  
  /* Responsive cho mobile và tablet */
  @media (max-width: 768px) {
    width: 100%;
    
    .ant-card-cover img {
      height: 300px !important;
    }
  }
  
  @media (max-width: 480px) {
    .ant-card-cover img {
      height: 250px !important;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 76%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  padding-right: 30px;
  
  /* Hiển thị thông tin khi hover */
  ${StyledCard}:hover & {
    opacity: 1;
  }
  
  /* Responsive cho mobile */
  @media (max-width: 768px) {
    height: 71%;
    padding-right: 20px;
    
    /* Trên mobile, hiển thị overlay khi tap/touch */
    ${StyledCard}:active & {
      opacity: 1;
    }
  }
`;

export const MovieName = styled.div``;

export const NameCard = styled.h2`
  position: relative;
  top: -50px;
  right: -23px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  
  @media (max-width: 480px) {
    top: -30px;
    right: -15px;
    font-size: 0.9rem;
  }
`;

export const CardDetail = styled.p`
  position: relative;
  top: -20px;
  right: -23px;
  padding-bottom: 7px;
  font-size: 0.8rem;
  color: #fff;
  margin-right: 20px;
  
  @media (max-width: 480px) {
    top: -15px;
    right: -15px;
    padding-bottom: 4px;
    font-size: 0.7rem;
    margin-right: 15px;
  }
`;

export const NameCardHeader = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  color: #fff;
  z-index: 1;
  margin: 30px 0 30px 10px;
  
  &:hover {
    color: #F3EA28;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 20px 0 20px 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin: 15px 0 15px 15px;
  }
`;

export const ContainerALl = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    padding: 0 15px 15px;
  }
`;

export const TrailerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 140px;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const ViewTrailer = styled.a`
  text-decoration: underline;
  font-size: 1.2rem;
  color: #fff;
  margin-left: 4px;
  margin-top: 3px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const LinkButton = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  color: #333;
  z-index: 1; /* Đảm bảo nội dung nằm trên lớp gradient */
  width: 100%;
  padding: 8px 12px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 15px;
    font-weight: 600;
  }
  
  @media (max-width: 480px) {
    font-size: 16px; /* Tăng kích thước font trên mobile để dễ đọc */
    padding: 12px 16px; /* Tăng padding để vùng touch lớn hơn */
    letter-spacing: 0.5px; /* Tăng khoảng cách chữ để dễ đọc */
  }
  
  /* Cải thiện khả năng tương tác trên thiết bị touch */
  @media (hover: none) {
    &:active {
      transform: scale(0.98);
      opacity: 0.9;
    }
  }
`;
export const TrailerIcon = styled.img`
  margin-bottom: -2px;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    width: 22px;
    height: 22px;
    margin-bottom: 5px;
  }
  
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    margin-bottom: 6px;
    margin-right: 5px; /* Thêm khoảng cách với chữ */
  }
  
  /* Hiệu ứng hover trên desktop */
  @media (min-width: 1025px) {
    ${TrailerContainer}:hover & {
      transform: scale(1.1);
    }
  }
`;
export const ContainerButton = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 3px 6px;
  height: 40px;
  width: 110px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 4px;
  margin-bottom: 4px;
  overflow: hidden; /* Đảm bảo gradient không tràn ra ngoài */
  background-color: #F3EA28;
  
  /* Lớp phủ gradient */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%; /* Bắt đầu gradient từ ngoài bên trái */
    width: 200%; /* Chiều rộng gradient lớn hơn để đủ trượt qua */
    height: 100%;
    background: linear-gradient(90deg, purple, #F3EA28);
    transition: left 0.5s ease; /* Chuyển động từ từ */
    z-index: 0;
  }

  /* Khi hover, gradient trượt từ trái qua phải */
  &:hover::after {
    left: 0;
  }

  /* Màu chữ khi hover */
  &:hover ${LinkButton} {
    color: white;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    margin: 0;
  }
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
  
  @media (max-width: 768px) {
    & .ant-modal-content {
      width: 95% !important;
      margin: 0 auto;
    }
  }
`;
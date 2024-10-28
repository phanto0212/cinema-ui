import { Card } from "antd";
import styled from "styled-components";
import { Modal } from "antd"; 
export const { Meta } = Card;

export const StyledCard = styled(Card)`
  width: 300px;
  overflow: hidden;
  border-radius: 8px;
  border:none;
  background-color:#0f172a;
  // #050912
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
   .ant-card-body {
    padding: 0px;
    
  }
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
  height: 76%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s ease;
  
  padding: 10px;
  
  
  /* Hiển thị thông tin khi hover */
  ${StyledCard}:hover & {
    opacity: 1;
  }
`;

export const MovieName = styled.div`

`;
export const NameCard = styled.h2`
position: relative;
top: -50px;
right: -23px;
font-size:1.3rem;
font-weight: 700;
color: #fff;

`;
export const CardDetail = styled.p`
position: relative;
top: -20px;
right: -23px;
padding-bottom: 7px;
font-size: 0.8rem;
color:#fff;
margin-right: 20px;
`;
export const NameCardHeader = styled.div`
font-size: 1.4rem;
font-weight: 400;
color: #fff;
z-index: 1;
align-item:center;
margin: 30px 0 30px 25px;
&:hover{
color: #F3EA28;
}
`;
export const ContainerALl = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;
export const TrailerContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 140px;



`;
export const ViewTrailer = styled.a`
text-decoration: underline;
font-size: 1.2rem;
color: #fff;
margin-left: 4px;
`;
export const LinkButton = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  color: #333;
  z-index: 1; /* Đảm bảo nội dung nằm trên lớp gradient */
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
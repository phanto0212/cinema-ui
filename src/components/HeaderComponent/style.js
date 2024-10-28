import { Row } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled(Row)`
padding: 23px 120px;
background-color: #0f172a;
border-bottom: 1px solid #292828;
color: #fff;
position: fixed;
top: 0;
width: 100%;
z-index: 1000; /* Đảm bảo header nằm trên các phần tử khác */
`;
export const WrapperHeaderText = styled.span`
font-size: 25px;
font-weight: bold;
text-align: center;
margin-bottom: 20px;
text-align: center;
position : relative;
margin-bottom:5px;
cursor: pointer;
color: #fff;
`;
export const Container = styled.div`
  display: flex;
  align-items: center;
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
  width: 150px;
  cursor: pointer;
  margin-right: 20px;
  overflow: hidden; /* Đảm bảo gradient không tràn ra ngoài */
  background-color: #f8ee13;
  
  /* Lớp phủ gradient */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%; /* Bắt đầu gradient từ ngoài bên trái */
    width: 200%; /* Chiều rộng gradient lớn hơn để đủ trượt qua */
    height: 100%;
    background: linear-gradient(90deg, purple, blue);
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


export const Icon = styled(FontAwesomeIcon)`
margin-right: 6px;
`
export const User = styled.div`
display: flex;
align-item:center;
justify-content: space-between;
color: #fff;
`
export const LoginAndSignup = styled.div`
font-size: 1.1rem;
font-weight: 600;
margin-left: 4px;
cursor: pointer;
  &:hover {
    color: #f3ea28; /* Màu thay đổi khi hover */
  }
`
export const UserIcon = styled(FontAwesomeIcon)`
  color: #fff;
  font-size: 20px;
  margin-right: 10px;
  margin-top: 3px;
  &:hover {
    color: #dac6fb; /* Màu thay đổi khi hover */
  }
`;
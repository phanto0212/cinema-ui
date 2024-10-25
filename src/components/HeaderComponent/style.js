import { Row } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled(Row)`
padding: 23px 120px;
background-color: #050912;
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

export const ContainerButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Đảm bảo nội dung được căn giữa */
  border-radius: 6px;
  padding: 3px 6px; /* Thêm padding để button dễ nhìn hơn */
  height: 40px;
  width:150px;
  cursor: pointer;
  margin-right:20px;

  &:hover {
    background-color: #f0f0f0; /* Màu sắc nhẹ khi hover */
  }
`;
export const LinkButton = styled.a`
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  text-align: center; /* Căn giữa văn bản trong link */
  width:100%;

 
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
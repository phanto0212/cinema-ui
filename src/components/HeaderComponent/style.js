import { Row } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Wrapper = styled(Row)`
padding: 23px 120px;
background-color: #0f172a;
color: #fff;
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
color: #dac6fb;
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
  width:130px;
  cursor: pointer;
  margin-left:15px;

  &:hover {
    background-color: #f0f0f0; /* Màu sắc nhẹ khi hover */
  }
`;
export const LinkButton = styled.a`
  font-size: 17px;
  font-weight: 800;
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
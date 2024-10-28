import styled from "styled-components";
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
margin-bottom: 8px;
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
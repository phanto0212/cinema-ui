import React from 'react'
import {Col} from 'antd'
import { faTicketAlt, faMapMarkerAlt, faPizzaSlice, faUser } from '@fortawesome/free-solid-svg-icons';

import { Container, ContainerButton, Icon, LinkButton, LoginAndSignup, User, UserIcon, Wrapper, WrapperHeaderText } from './style'
import InputComponent from '../InputComponent/InputComponent';
function HeaderComponent() {
  return (
    <div>
    <Wrapper>
      <Col span={5}>
      <WrapperHeaderText>Nhom8's Cinema</WrapperHeaderText></Col>
      <Col span={11}>
        <Container>
        <ContainerButton style={{backgroundColor: '#f8ee13'}}><LinkButton style={{color: '#333'}} ><Icon icon={faTicketAlt} size="1x" />Đặt vé</LinkButton></ContainerButton>
        <ContainerButton style={{backgroundColor: '#639'}}><LinkButton style={{color: '#fff'}} ><Icon icon={faPizzaSlice} size="1x" /><span style={{color: '#F3EA28'}}>Chọn rạp</span></LinkButton></ContainerButton>
        <ContainerButton style={{backgroundColor: '#ff7401'}}><LinkButton style={{color: '#fff'}} ><Icon icon={faMapMarkerAlt } size="1x" />Lịch chiếu</LinkButton></ContainerButton>
        </Container> 
        
      </Col>
      <Col span={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
        <InputComponent />
        <User>
          <UserIcon icon={faUser}/>
          <LoginAndSignup>Đăng nhập</LoginAndSignup>
        </User>
      </Col>
    </Wrapper>
    </div>
  )
}

export default HeaderComponent
import React, { useEffect, useState } from 'react'
import {Col, Menu, Dropdown} from 'antd'
import { faTicketAlt, faMapMarkerAlt, faPizzaSlice, faUser } from '@fortawesome/free-solid-svg-icons';

import { Container, ContainerButton, Icon, LinkButton, LoginAndSignup, User, UserIcon, Wrapper, WrapperHeaderText } from './style'
import InputComponent from '../InputComponent/InputComponent';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
function HeaderComponent() {
  const Navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUser(token)
    }
  }, []);
  const handleToCart = ()=>{
    const token = localStorage.getItem('authToken');
    if(token){
      Navigate('/order')
    }
    else{
      Navigate('/sign-in')
    }
  }
  const fetchUser = async (token) => {
    try {
        const response = await newRequest.get('/api/auth/get/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setUser(response.data.user); // Cập nhật state với dữ liệu user
    } catch (error) {
        console.log('error:', error);
    }
};
const handleLogout = () =>{
  localStorage.removeItem('authToken')
  Navigate('/login')
}
  // const HandleNavigateSignUp = () => {
  //   Navigate('/sign-up');
  // };

  // const HandleNavigateSignin = () => {
  //   Navigate('/sign-in');
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('authToken');
  //   setIsLoggedIn(false);
  //   Navigate('/sign-in');  // Điều hướng về trang chủ sau khi đăng xuất
  // };

  const userMenu = (
    <Menu>
      <Menu.Item onClick={()=> Navigate('/profile')} key="1">Quản lý trang cá nhân</Menu.Item>
      <Menu.Item onClick={handleLogout} key="2">Đăng xuất</Menu.Item>
    </Menu>
  );
  return (
    <div >
    <Wrapper>
      <Col span={5}>
      <WrapperHeaderText onClick={()=> Navigate('/')}>Nhom8's Cinema</WrapperHeaderText></Col>
      <Col span={11}>
        <Container>
        <ContainerButton onClick={()=> Navigate('/all/movie')} style={{backgroundColor: '#ff7401'}} ><LinkButton style={{color: '#fff'}} ><Icon icon={faTicketAlt} size="1x" />Đặt vé</LinkButton></ContainerButton>
        <ContainerButton style={{backgroundColor: '#ff7401'}} ><LinkButton style={{color: '#fff'}} ><Icon icon={faPizzaSlice} size="1x" />Chọn rạp</LinkButton></ContainerButton>
        <ContainerButton style={{backgroundColor: '#ff7401'}}><LinkButton style={{color: '#fff'}} ><Icon icon={faMapMarkerAlt } size="1x" />Lịch chiếu</LinkButton></ContainerButton>
        </Container> 
        {/* style={{backgroundColor: '#f8ee13'}} style={{color: '#333'}} */}
      </Col>
      <Col span={8} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} >
        <InputComponent />
        {isLoggedIn ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <User>
                <UserIcon icon={faUser} />
                <LoginAndSignup>{user?.username || 'Người dùng'}</LoginAndSignup>
              </User>
            </Dropdown>
          ) : (
            <User>
              <UserIcon icon={faUser} />
              <LoginAndSignup onClick={() => Navigate('/login')}>Đăng nhập</LoginAndSignup>
            </User>
          )}
      </Col>
    </Wrapper>
    </div>
  )
}

export default HeaderComponent
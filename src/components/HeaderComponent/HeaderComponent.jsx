import React, { useEffect, useState } from 'react';
import { Col, Menu, Dropdown } from 'antd';
import { faTicketAlt, faMapMarkerAlt, faPizzaSlice, faUser } from '@fortawesome/free-solid-svg-icons';
import { Container, ContainerButton, Icon, LinkButton, LoginAndSignup, User, UserIcon, Wrapper, WrapperHeaderText } from './style';
import InputComponent from '../InputComponent/InputComponent';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';

function HeaderComponent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Kiểm tra token và fetch user thông tin
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchUser(token);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem('authToken')]);

  const fetchUser = async (token) => {
    try {
      const response = await newRequest.get('/api/auth/get/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setIsLoggedIn(false); // Nếu có lỗi, đánh dấu là chưa đăng nhập
    }
  };

  const handleToCart = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/order');
    } else {
      navigate('/sign-in');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate('/profile')} key="1">
        Quản lý trang cá nhân
      </Menu.Item>
      <Menu.Item onClick={handleLogout} key="2">
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Wrapper>
        <Col span={5}>
          <WrapperHeaderText onClick={() => navigate('/')}>
            Nhom8's Cinema
          </WrapperHeaderText>
        </Col>
        <Col span={11}>
          <Container>
            <ContainerButton onClick={() => navigate('/all/movie')} style={{ backgroundColor: '#ff7401' }}>
              <LinkButton style={{ color: '#fff' }}>
                <Icon icon={faTicketAlt} size="1x" /> Đặt vé
              </LinkButton>
            </ContainerButton>
            <ContainerButton onClick={() => navigate('/my/ticket')} style={{ backgroundColor: '#ff7401' }}>
              <LinkButton style={{ color: '#fff' }}>
                <Icon icon={faPizzaSlice} size="1x" /> Vé của tôi
              </LinkButton>
            </ContainerButton>
            <ContainerButton style={{ backgroundColor: '#ff7401' }}>
              <LinkButton style={{ color: '#fff' }}>
                <Icon icon={faMapMarkerAlt} size="1x" /> Lịch chiếu
              </LinkButton>
            </ContainerButton>
          </Container>
        </Col>
        <Col span={8} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
              <LoginAndSignup onClick={() => navigate('/login')}>Đăng nhập</LoginAndSignup>
            </User>
          )}
        </Col>
      </Wrapper>
    </div>
  );
}

export default HeaderComponent;

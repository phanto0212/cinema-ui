import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import SideBarCoponent from '../../components/SideBarComponent/SideBarCoponent';
import CustomerInfoCoponent from '../../components/CustomerInfoComponent/CustomerInfoCoponent';
import ChangePasswordCoponent from '../../components/ChangePasswordComponent/ChangePasswordCoponent';
import newRequest from '../../utils/request';
import Snowfall from '../../components/SnowComponent/Snowfall';
const AppContainer = styled.div`
  display: flex;
  background-color: #1a1a2e;
  color: white;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px;
`;
function InfoPage() {
  const [user, setUser] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser(token);
    }
  }, [localStorage.getItem('authToken')]);

  const fetchUser = async (token) => {
    try {
      const response = await newRequest.get('/api/auth/get/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user || []);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, []);
  return (
    <>
    <Snowfall />
    <div style={{marginTop:'91.5px'}}>
  <AppContainer>
    <SideBarCoponent />
    <Content>
      <h2>Thông tin khách hàng</h2>
      <CustomerInfoCoponent user={user} />
      <ChangePasswordCoponent />
    </Content>
  </AppContainer>
    </div>
    </>
    
  )
}

export default InfoPage
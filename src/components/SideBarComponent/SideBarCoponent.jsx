import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaTicketAlt, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import deptrai from '../../assets/images/deptrai.jpg'
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
const SidebarContainer = styled.div`

  width: 250px;
  background: linear-gradient(135deg, #6a0dad, #4b0082);
  color: white;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Avatar = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-right: 30px;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 2px solid white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 500;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;

  &:hover {
    color: #d1d1d1;
    transform: translateX(5px);
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 10px 0;
`;

function SideBarComponent() {
  const [k, setK] = useState(0)
  const [user, setUser] = useState([])
  const Navigate =  useNavigate()
  const handleLogout = ()=>{
    localStorage.removeItem('authToken')
    Navigate("/login")
  }
  const fetchUser = async (token) => {
    try {
      const response = await newRequest.get('/api/auth/get/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setK((prev) => {
        if (prev === 3) {
          clearInterval(interval); // Dừng interval
          console.log('hello', prev); // Dùng giá trị `prev` đúng
          return prev; // Không tăng giá trị nữa
        }
        return prev + 1; // Tăng giá trị
      });
    }, 1000);
  
    return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser(token);
    }
  }, [k]);
  return (
    <SidebarContainer>
      <Avatar>
        <img src={deptrai} alt="avatar" />
        <h3>{user.username}</h3>
      </Avatar>
      <NavItem onClick={()=>Navigate("/my/info")}>
        <FaUser />
        Thông tin khách hàng
      </NavItem>
      <NavItem onClick={()=>Navigate("/my/ticket")}>
        <FaHistory />
        Lịch sử đặt vé
      </NavItem>
      <Divider />
      <NavItem onClick={handleLogout}>
        <FaSignOutAlt />
        Đăng xuất
      </NavItem>
    </SidebarContainer>
  );
}

export default SideBarComponent;



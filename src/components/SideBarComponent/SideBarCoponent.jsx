import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUser, FaTicketAlt, FaHistory, FaSignOutAlt, FaCrown, FaRegBell, FaRegCreditCard } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import newRequest from '../../utils/request';
import deptrai from '../../assets/images/deptrai.jpg';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const SidebarContainer = styled.div`
  width: 280px;
  background: linear-gradient(165deg, #1e1f35 0%, #292e5d 50%, #1e1f35 100%);
  color: white;
  height: 100vh;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(41, 46, 93, 0.8) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 116, 1, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const SidebarHeader = styled.div`
  padding: 30px;
  position: relative;
  text-align: center;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 116, 1, 0.5), 
      transparent
    );
  }
`;

const HeroBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: linear-gradient(90deg, #ff7401, #ff9249);
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  letter-spacing: 0.5px;
  opacity: 0;
  animation: ${fadeIn} 0.8s forwards;
  animation-delay: 0.6s;
  box-shadow: 0 3px 8px rgba(255, 116, 1, 0.3);
`;

const Avatar = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 0.5s forwards;

  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    padding: 3px;
    background: rgba(0, 0, 0, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
      border-color: rgba(255, 116, 1, 0.5);
    }
  }

  h3 {
    margin: 5px 0 3px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    position: relative;
    display: inline-block;
  }
  
  p {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    margin: 0;
  }
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  background: #4CAF50;
  border-radius: 50%;
  position: absolute;
  bottom: 35px;
  right: 85px;
  border: 2px solid #1e1f35;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.3);
  animation: ${pulse} 2s infinite;
`;

const PremiumBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  color: #5D4037;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  margin-top: 8px;
  box-shadow: 0 3px 8px rgba(255, 165, 0, 0.3);
  
  svg {
    margin-right: 4px;
    font-size: 10px;
  }
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
`;

const NavSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h4`
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
  padding-left: 15px;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  padding: 12px 15px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  margin-bottom: 8px;
  background: ${props => props.active ? 'rgba(255, 116, 1, 0.15)' : 'transparent'};
  color: ${props => props.active ? '#ff7401' : 'white'};
  animation: ${fadeIn} 0.3s forwards;
  animation-delay: ${props => props.delay || '0s'};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: ${props => props.active ? '#ff7401' : '#fff'};
    transform: translateX(5px);
  }
  
  svg {
    font-size: 18px;
    color: ${props => props.active ? '#ff7401' : 'rgba(255, 255, 255, 0.7)'};
  }
  
  ${props => props.active && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #ff7401;
      border-radius: 0 4px 4px 0;
    }
  `}
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.1), 
    transparent
  );
  margin: 10px 0;
`;

const SignOutButton = styled(NavItem)`
  margin-top: auto;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 15px;
  
  &:hover {
    background: rgba(255, 0, 0, 0.1);
    color: #ff5252;
    border-color: rgba(255, 0, 0, 0.2);
    
    svg {
      color: #ff5252;
    }
  }
`;

const Badge = styled.span`
  background: #ff7401;
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

function SideBarComponent() {
  const [k, setK] = useState(0);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [hasNotifications, setHasNotifications] = useState(true);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate("/login");
  };
  
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
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser(token);
    }
  }, [k]);

  // Kiểm tra trang hiện tại để highlight active item
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Tính số vé đã đặt (demo)
  const ticketCount = 3;
  const isPremium = user.isPremium || Math.random() > 0.5; // Chỉ để demo

  return (
    <SidebarContainer>
      <SidebarHeader>
        <HeroBadge>Cinema Lover</HeroBadge>
        <Avatar>
          <img src={deptrai} alt="avatar" />
          <StatusIndicator />
          <h3>{user.username || 'Người dùng'}</h3>
          <p>{user.email || 'user@example.com'}</p>
          {isPremium && (
            <PremiumBadge>
              <FaCrown /> PREMIUM
            </PremiumBadge>
          )}
        </Avatar>
      </SidebarHeader>
      
      <NavContainer>
        <NavSection>
          <SectionTitle>Thông tin cá nhân</SectionTitle>
          <NavItem 
            onClick={() => navigate("/my/info")} 
            active={isActive("/my/info")}
            delay="0.1s"
          >
            <FaUser />
            Thông tin khách hàng
          </NavItem>
          <NavItem 
            onClick={() => navigate("/my/ticket")} 
            active={isActive("/my/ticket")}
            delay="0.2s"
          >
            <FaTicketAlt />
            Vé của tôi
            {ticketCount > 0 }
          </NavItem>
        </NavSection>
        
        <NavSection>
          <SectionTitle>Quản lý tài khoản</SectionTitle>
          <NavItem delay="0.3s">
            <FaRegCreditCard />
            Phương thức thanh toán
          </NavItem>
          <NavItem delay="0.4s">
            <FaRegBell />
            Thông báo
            {hasNotifications && <Badge>0</Badge>}
          </NavItem>
        </NavSection>
        
        <Divider />
        
        <SignOutButton onClick={handleLogout} delay="0.5s">
          <FaSignOutAlt />
          Đăng xuất
        </SignOutButton>
      </NavContainer>
    </SidebarContainer>
  );
}

export default SideBarComponent;
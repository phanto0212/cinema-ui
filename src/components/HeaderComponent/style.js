import { Row } from "antd";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

export const Wrapper = styled(Row)`
  background-color:#292e5d;
  padding: 15px 40px;
  color: #fff;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  animation: ${fadeIn} 0.5s ease-out;
  
  @media (min-width: 1200px) {
    padding: 23px 120px;
  }
  
  @media (max-width: 992px) {
    padding: 15px 30px;
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

export const WrapperHeaderText = styled.span`
  font-size: 26px;
  font-weight: 700;
  letter-spacing: 0.5px;
  position: relative;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  
  &::before {
    content: '🎬';
    margin-right: 8px;
    font-size: 24px;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50%;
    height: 2px;
    background: linear-gradient(90deg, #ff7401, transparent);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 22px;
    
    &::before {
      font-size: 20px;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    justify-content: flex-end;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    position: fixed;
    top: 60px;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 80%;
    max-width: 300px;
    height: calc(100vh - 60px);
    background: linear-gradient(135deg, #1e1f35 0%, #292e5d 100%);
    padding: 20px;
    flex-direction: column;
    z-index: 999;
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
    
    .mobile-nav-item {
      padding: 15px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      color: white;
      font-weight: 500;
      
      svg {
        margin-right: 12px;
        color: #ff7401;
      }
    }
  }
`;

export const MobileMenuButton = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    cursor: pointer;
    position: relative;
    
    .bar {
      width: 24px;
      height: 2px;
      background-color: white;
      position: absolute;
      transition: all 0.3s ease;
      
      &:nth-child(1) {
        top: ${props => props.isOpen ? '50%' : '30%'};
        transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
      }
      
      &:nth-child(2) {
        top: 50%;
        opacity: ${props => props.isOpen ? '0' : '1'};
      }
      
      &:nth-child(3) {
        top: ${props => props.isOpen ? '50%' : '70%'};
        transform: ${props => props.isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
      }
    }
  }
`;

export const LinkButton = styled.a`
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  letter-spacing: 0.5px;
`;

export const ContainerButton = styled.div`
  position: relative;
  border-radius: 8px;
  height: 42px;
  min-width: 120px;
  cursor: pointer;
  margin-right: 15px;
  overflow: hidden;
  background: linear-gradient(90deg, #ff7401, #ff9249);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 116, 1, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 116, 1, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  @media (max-width: 992px) {
    min-width: 100px;
    margin-right: 10px;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
  font-size: 16px;
  color: #fff;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  padding: 5px 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: 12px;
    right: 70px;
    padding: 3px 10px;
  }
`;

export const LoginAndSignup = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-left: 5px;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const UserIcon = styled(FontAwesomeIcon)`
  color: #ff7401;
  font-size: 18px;
  margin-right: 5px;
  
  @media (max-width: 768px) {
    font-size: 16px;
    margin-right: 3px;
  }
`;

export const SearchContainer = styled.div`
  margin-right: 15px;
  flex: 1;
  max-width: 300px;
  
  @media (max-width: 992px) {
    max-width: 220px;
  }
  
  @media (max-width: 768px) {
    position: absolute;
    top: 12px;
    right: 120px;
    max-width: 180px;
    margin-right: 0;
  }
  
  @media (max-width: 480px) {
    display: none;
  }
`;

export const Overlay = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff0000;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 0 0 rgba(255, 0, 0, 0.4);
`;

export const PremiumBadge = styled.span`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #5D4037;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;
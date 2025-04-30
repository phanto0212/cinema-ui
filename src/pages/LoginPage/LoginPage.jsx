import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../components/LoadingComponent/Loading';
import newRequest from '../../utils/request';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Snowfall from '../../components/SnowComponent/Snowfall';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaTicketAlt } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 116, 1, 0.5); }
  50% { box-shadow: 0 0 20px rgba(255, 116, 1, 0.8); }
  100% { box-shadow: 0 0 5px rgba(255, 116, 1, 0.5); }
`;

// Container tổng thể cho giao diện đăng nhập
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(14, 18, 41, 0.9) 100%);
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 20px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    background-position: center;
    opacity: 0.2;
    z-index: -1;
  }
`;

// Logo and brand
const BrandSection = styled.div`
  position: absolute;
  top: 30px;
  left: 40px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 24px;
  font-weight: 800;
  animation: ${fadeIn} 1s ease-out;
  
  svg {
    margin-right: 10px;
    color: #ff7401;
    font-size: 28px;
  }
  
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    left: auto;
    margin-bottom: 30px;
    justify-content: center;
  }
`;

// Khung đăng nhập
const LoginBox = styled.div`
  background: rgba(30, 31, 53, 0.85);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 420px;
  width: 100%;
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;
  z-index: 10;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #ff7401, #ff9249);
    border-radius: 16px 16px 0 0;
  }
  
  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const LoginGraphic = styled.div`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  height: 120px;
  width: 120px;
  background: linear-gradient(135deg, #1e1f35 0%, #292e5d 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid rgba(255, 116, 1, 0.5);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: ${glow} 3s infinite, ${float} 6s ease-in-out infinite;
  
  svg {
    font-size: 48px;
    color: #ff7401;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 26px;
  color: white;
  font-weight: 700;
  margin: 25px 0 30px;
  letter-spacing: 1px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #ff7401, #ff9249);
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin-bottom: 8px;
  transition: all 0.3s ease;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 15px 15px 45px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ff7401;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 3px rgba(255, 116, 1, 0.1);
    
    & + ${InputIcon} {
      color: #ff7401;
    }
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
  
  &:hover {
    color: #ff7401;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  user-select: none;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const CustomCheckbox = styled.span`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  
  &::after {
    content: "";
    width: 10px;
    height: 10px;
    background: #ff7401;
    border-radius: 2px;
    opacity: 0;
    transition: all 0.2s ease;
    transform: scale(0);
  }
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  
  &:checked + ${CustomCheckbox} {
    border-color: #ff7401;
    
    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 15px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(90deg, #ff7401, #ff9249);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(255, 116, 1, 0.2);
  
  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(255, 116, 1, 0.3);
    
    svg {
      transform: translateX(5px);
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0) 100%);
    transition: all 0.5s ease;
  }
  
  &:hover::before {
    left: 100%;
  }

  &:disabled {
    background: linear-gradient(90deg, #555, #777);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  
  &::before, &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  span {
    padding: 0 15px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 13px;
  }
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: 5px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);

  a {
    color: #ff7401;
    text-decoration: none;
    font-weight: 600;
    position: relative;
    transition: all 0.3s ease;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: #ff7401;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #ff9249;
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4f;
  font-size: 13px;
  font-weight: 500;
  margin-top: 20px;
  text-align: center;
  background: rgba(255, 77, 79, 0.1);
  padding: 12px;
  border-radius: 8px;
  border-left: 3px solid #ff4d4f;
  animation: ${fadeIn} 0.3s ease;
`;

// Styles for Toast notifications
const ToastContainerStyled = styled(ToastContainer).attrs({
  className: 'toast-container',
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
})`
  .Toastify__toast {
    border-radius: 8px;
    font-size: 14px;
  }
  
  .Toastify__toast--success {
    background: #292e5d;
    border-left: 4px solid #4CAF50;
  }
  
  .Toastify__toast--error {
    background: #292e5d;
    border-left: 4px solid #FF5252;
  }
`;

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Kiểm tra xem tất cả các trường có dữ liệu không
    if (userName && password) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [userName, password]); // Theo dõi sự thay đổi của các trường
  
  const handleSignIn = async () => {
    try {
      const response = await newRequest.post('/api/auth/login', {
        username: userName,
        password: password
      });
      
      localStorage.setItem('authToken', response.data.token);
      toast.success('Đăng nhập thành công');
      setIsLoaded(true);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      setErrorMessage(error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data : error.message);
    }
  };
  
  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleSignIn();
    }
  };
  
  return (
    <>
      <Snowfall />
      <Container>
        <BrandSection>
          <FaTicketAlt />
          <span>Cinema</span>
        </BrandSection>
        
        <LoginBox>
          <LoginGraphic>
            <FaUser />
          </LoginGraphic>
          
          <Title>ĐĂNG NHẬP</Title>
          
          <FormGroup>
            <Label>Tài khoản, Email hoặc Số điện thoại</Label>
            <InputWrapper>
              <Input
                type="text"
                placeholder="Nhập tài khoản, email hoặc số điện thoại"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <InputIcon>
                <FaUser />
              </InputIcon>
            </InputWrapper>
          </FormGroup>
          
          <FormGroup>
            <Label>Mật khẩu</Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <InputIcon>
                <FaLock />
              </InputIcon>
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
          </FormGroup>
          
          <CheckboxContainer>
            <CheckboxLabel>
              <HiddenCheckbox
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <CustomCheckbox />
              Hiển thị mật khẩu
            </CheckboxLabel>
          </CheckboxContainer>
          
          <Loading isLoading={isLoaded}>
            <LoginButton 
              onClick={handleSignIn} 
              disabled={isDisabled}
            >
              ĐĂNG NHẬP
              <FaArrowRight />
            </LoginButton>
          </Loading>
          
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          
          <Divider>
            <span>HOẶC</span>
          </Divider>
          
          <RegisterLink>
            Bạn chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
          </RegisterLink>
        </LoginBox>
      </Container>
      
      <ToastContainerStyled />
    </>
  );
}

export default LoginPage;
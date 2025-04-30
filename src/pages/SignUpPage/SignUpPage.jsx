import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import newRequest from '../../utils/request';
import 'react-toastify/dist/ReactToastify.css';
import Snowfall from '../../components/SnowComponent/Snowfall';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaTicketAlt, FaUserPlus, FaEnvelope, FaCheck } from 'react-icons/fa';

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

const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

// Container tổng thể
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
    background-image: url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80');
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
  z-index: 10;
  
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

// Khung đăng ký
const RegisterBox = styled.div`
  background: rgba(30, 31, 53, 0.85);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 450px;
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

const RegisterGraphic = styled.div`
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
  margin-bottom: 20px;
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

const RegisterButton = styled.button`
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
  margin-top: 10px;
  
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
    background-size: 200% 100%;
    animation: ${shimmer} 2s infinite;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
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

const LoginLink = styled.div`
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
  margin-top: 6px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
    font-size: 12px;
  }
`;

const PasswordStrength = styled.div`
  margin-top: 8px;
`;

const StrengthBar = styled.div`
  height: 4px;
  border-radius: 2px;
  background: ${props => {
    if (props.strength === 0) return 'rgba(255, 255, 255, 0.1)';
    if (props.strength === 1) return '#ff4d4f';
    if (props.strength === 2) return '#faad14';
    if (props.strength === 3) return '#52c41a';
    return '#ff7401';
  }};
  width: ${props => (props.strength / 3) * 100}%;
  transition: all 0.3s ease;
`;

const StrengthLabel = styled.div`
  font-size: 12px;
  margin-top: 4px;
  color: ${props => {
    if (props.strength === 0) return 'rgba(255, 255, 255, 0.4)';
    if (props.strength === 1) return '#ff4d4f';
    if (props.strength === 2) return '#faad14';
    if (props.strength === 3) return '#52c41a';
    return '#ff7401';
  }};
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

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});
  const Navigate = useNavigate();
  
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };
  
  const getPasswordStrengthLabel = (strength) => {
    if (strength === 0) return 'Yếu';
    if (strength === 1) return 'Trung bình';
    if (strength === 2) return 'Khá';
    if (strength === 3) return 'Mạnh';
  };
  
  useEffect(() => {
    // Kiểm tra form hợp lệ
    const newErrors = {};
    
    if (username && !validateEmail(username)) {
      newErrors.username = 'Email không hợp lệ';
    }
    
    if (password) {
      const strength = checkPasswordStrength(password);
      setPasswordStrength(strength);
      if (strength < 1) {
        newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      }
    }
    
    if (confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu nhập lại không khớp';
    }
    
    setErrors(newErrors);
    
    // Kiểm tra tất cả các trường có dữ liệu và không có lỗi
    if (username && password && confirmPassword && Object.keys(newErrors).length === 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [username, password, confirmPassword]);
  
  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        toast.error('Mật khẩu nhập lại không khớp');
        return;
      }
      
      const response = await newRequest.post('/api/auth/register', {
        email: username,
        password: password,
        repassword: confirmPassword
      });
      
      if (response.status === 400) {
        toast.error(response.data);
        return;
      }
      
      toast.success('Đăng ký thành công');
      setTimeout(() => {
        Navigate('/login');
      }, 1500);
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleSignUp();
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
        
        <RegisterBox>
          <RegisterGraphic>
            <FaUserPlus />
          </RegisterGraphic>
          
          <Title>ĐĂNG KÝ</Title>
          
          <FormGroup>
            <Label>Email *</Label>
            <InputWrapper>
              <Input
                type="email"
                placeholder="Nhập địa chỉ email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <InputIcon>
                <FaEnvelope />
              </InputIcon>
            </InputWrapper>
            {errors.username && (
              <ErrorMessage>
                <FaCheck /> {errors.username}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Mật khẩu *</Label>
            <InputWrapper>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Tạo mật khẩu mới"
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
            
            {password && (
              <PasswordStrength>
                <StrengthBar strength={passwordStrength} />
                <StrengthLabel strength={passwordStrength}>
                  {getPasswordStrengthLabel(passwordStrength)}
                </StrengthLabel>
              </PasswordStrength>
            )}
            
            {errors.password && (
              <ErrorMessage>
                <FaCheck /> {errors.password}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Xác nhận mật khẩu *</Label>
            <InputWrapper>
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <InputIcon>
                <FaLock />
              </InputIcon>
              <PasswordToggle
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </PasswordToggle>
            </InputWrapper>
            {errors.confirmPassword && (
              <ErrorMessage>
                <FaCheck /> {errors.confirmPassword}
              </ErrorMessage>
            )}
          </FormGroup>
          
          <RegisterButton 
            onClick={handleSignUp} 
            disabled={isDisabled}
          >
            ĐĂNG KÝ
            <FaArrowRight />
          </RegisterButton>
          
          <Divider>
            <span>HOẶC</span>
          </Divider>
          
          <LoginLink>
            Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
          </LoginLink>
        </RegisterBox>
      </Container>
      
      <ToastContainerStyled />
    </>
  );
}

export default SignUpPage;
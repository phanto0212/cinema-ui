import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../components/LoadingComponent/Loading';
import newRequest from '../../utils/request';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// Container tổng thể cho giao diện đăng nhập
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://a-static.besthdwallpaper.com/elemental-animation-movie-poster-wallpaper-1920x1200-108483_6.jpg');
  background-size: cover;
  background-position: center;
`;

// Khung đăng nhập
const LoginBox = styled.div`
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #333;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #ffcc00;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const CheckboxLabel = styled.span`
  font-size: 14px;
  color: #333;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e6b800;
  }
`;



const RegisterLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #333;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const ErrorMessage = styled.span`
  display: block;
  color: #ff4d4f;
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
  text-align: center;
  background-color: #fff5f5;
  padding: 5px 10px;
  border-radius: 4px;
`;

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMassage, setErrorMesage] = useState('')
  const Navigate =  useNavigate()
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    // Kiểm tra xem tất cả các trường có dữ liệu không
    if (userName && password ) {
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
            
        }
        );
        localStorage.setItem('authToken', response.data.token);
        toast.success('Đăng nhập thành công');
        setIsLoaded(true)
        setTimeout(() => {
          Navigate('/');
        }, 2000); // Thay đổi thời gian theo nhu cầu
        
    } catch (error) {
      setErrorMesage(error.response ? error.response.data : error.message)
      toast.error(error.response ? error.response.data : error.message);
    }
};
  return (
    <Container>
      <LoginBox>
        <Title>ĐĂNG NHẬP</Title>
        <Label>Tài khoản, Email hoặc số điện thoại *</Label>
        <Input
          type="text"
          placeholder="Nhập tài khoản, email hoặc số điện thoại"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Label>Mật khẩu *</Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <CheckboxLabel>Hiện mật khẩu</CheckboxLabel>
        </CheckboxContainer>
        <Loading isLoading={isLoaded}>
        <LoginButton onClick={handleSignIn} style={{backgroundColor: isDisabled ? '#ccc' : '#ffcc00'}} disabled={isDisabled}>ĐĂNG NHẬP</LoginButton>
        </Loading>
         <ErrorMessage>{errorMassage}</ErrorMessage>
        <RegisterLink>
          Bạn chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
        </RegisterLink>
      </LoginBox>
      <ToastContainer style={{fontSize: '12px'}}/>
    </Container>
  );
}

export default LoginPage;

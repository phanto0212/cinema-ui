import React from 'react';
import styled from 'styled-components';

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
  background-color: #ffcc00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #e6b800;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
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

function LoginPage() {
  return (
    <Container>
      <LoginBox>
        <Title>ĐĂNG NHẬP</Title>
        <Label>Tài khoản, Email hoặc số điện thoại *</Label>
        <Input type="text" placeholder="Nhập tài khoản, email hoặc số điện thoại" />
        <Label>Mật khẩu *</Label>
        <Input type="password" placeholder="Nhập mật khẩu" />
        <CheckboxContainer>
          <Checkbox type="checkbox" />
          <CheckboxLabel>Lưu mật khẩu đăng nhập</CheckboxLabel>
        </CheckboxContainer>
        <LoginButton>ĐĂNG NHẬP</LoginButton>
       
        <RegisterLink>
          Bạn chưa có tài khoản? <a href="/signup">Đăng ký ngay</a>
        </RegisterLink>
      </LoginBox>
    </Container>
  );
}

export default LoginPage;

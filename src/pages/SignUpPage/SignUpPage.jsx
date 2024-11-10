import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url('https://a-static.besthdwallpaper.com/elemental-animation-movie-poster-wallpaper-1920x1200-108483_6.jpg');
  background-size: cover;
  background-position: center;
`;

const RegisterBox = styled.div`
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

const RegisterButton = styled.button`
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

const LoginLink = styled.div`
  text-align: center;
  margin-top: 15px;
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
function SignUpPage() {
  return (
    <Container>
    <RegisterBox>
      <Title>ĐĂNG KÝ</Title>
      
      <Label>Tên đăng nhập *</Label>
      <Input type="text" placeholder="Nhập tên đăng nhập" />

      <Label>Mật khẩu *</Label>
      <Input type="password" placeholder="Nhập mật khẩu" />

      <Label>Xác thực mật khẩu *</Label>
      <Input type="password" placeholder="Nhập lại mật khẩu" />

      <RegisterButton>ĐĂNG KÝ</RegisterButton>

      <LoginLink>
        Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
      </LoginLink>
    </RegisterBox>
  </Container>
  )
}

export default SignUpPage
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import newRequest from '../../utils/request';

import 'react-toastify/dist/ReactToastify.css';
import Snowfall from '../../components/SnowComponent/Snowfall';
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isDisabled,setIsDisabled] = useState(true)
  const Navigate = useNavigate()
  useEffect(()=>{
  if(username && password && confirmPassword ){
    setIsDisabled(false)
  }
  else{
    setIsDisabled(true)
  }
  }, [username,password, confirmPassword])

  
  const handleSignUp = async () => {
    try {
        
        if(password !== confirmPassword){
          toast.error('mật khẩu nhập lại không trùng khớp')
          return

        }
        const response = await newRequest.post('/api/auth/register', {
            email: username,
            password: password,
            repassword: confirmPassword
        }
        );
        if(response.status === 400){
          toast.error(response.data)
          return
        }
        toast.success('Đăng ký thành công');
        setTimeout(() => {
          Navigate('/login');
        }, 1000); // Thay đổi thời gian theo nhu cầu
        
    } catch (error) {
        toast.error(error.response ? error.response.data : error.message)
    }
};

  return (
    <>
    <Snowfall/>
    <Container>
    <RegisterBox>
      <Title>ĐĂNG KÝ</Title>
      
      <Label>Tên đăng nhập *</Label>
      <Input type="text" placeholder="Nhập tên đăng nhập" value={username} onChange={e => {setUsername(e.target.value)}} />

      <Label>Mật khẩu *</Label>
      <Input type="password" placeholder="Nhập mật khẩu" value={password} onChange={e => {setPassword(e.target.value)}} />

      <Label>Xác thực mật khẩu *</Label>
      <Input type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={e =>{setConfirmPassword(e.target.value)}}/>

      <RegisterButton onClick={handleSignUp} style={{backgroundColor: isDisabled ? '#ccc' : '#ffcc00'}} disabled={isDisabled} >ĐĂNG KÝ</RegisterButton>

      <LoginLink>
        Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
      </LoginLink>
    </RegisterBox>
    <ToastContainer style={{fontSize: '12px'}}/>
  </Container>
    </>
    
  )
}

export default SignUpPage
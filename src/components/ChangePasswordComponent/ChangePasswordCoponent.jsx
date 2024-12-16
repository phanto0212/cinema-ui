import React, { useState } from 'react'
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import newRequest from '../../utils/request';
const ChangePasswordContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  color: black;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
  }
`;

const SaveButton = styled.button`
  background-color: #6a0dad;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #590bbd;
  }
`;
function ChangePasswordCoponent() {
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reNewPassword, setReNewPassword] = useState('')
  const token = localStorage.getItem('authToken')
  const handleChangePassword =  async (token) =>{
    try{
      if(password == '' || newPassword == '' || reNewPassword ==''){
        toast.warning('Vui lòng nhập đầy đủ thông tintin')
      }
      else{
        if(newPassword != reNewPassword){
           toast.error('Mật khẩu mới và xác nhận mật khẩu mới phải khớp với nhaunhau')
        }
        else{
          const reponse = await newRequest.post('/api/auth/change/password',{
            password: password,
            newPassword: newPassword
          },{headers : {Authorization: `Bearer ${token}`}});
          if(reponse.status == 200){
            toast.success('Thay đổi thành công')
          }
          
        }
      }
     
      
    }
    catch(error){
      console.log(error)
      toast.error('Thay đổi thất bại do sai mật khẩu hoặc lỗi cú pháp!!')
    }
  }
  return (
    <ChangePasswordContainer>
    <h3 style={{color:'black'}}>Đổi mật khẩu</h3>
    <FormGroup>
      <label style={{fontSize:'15px'}} >Mật khẩu cũ</label>
      <input type="password" value={password} onChange={((e)=>setPassword(e.target.value))} />
    </FormGroup>
    <FormGroup>
      <label style={{fontSize:'15px'}}>Mật khẩu mới</label>
      <input type="password" value={newPassword} onChange={((e)=>setNewPassword(e.target.value))} />
    </FormGroup>
    <FormGroup>
      <label style={{fontSize:'15px'}}>Xác nhận mật khẩu mới</label>
      <input type="password" value={reNewPassword} onChange={((e)=>setReNewPassword(e.target.value))}/>
    </FormGroup>
    <SaveButton onClick={()=>{handleChangePassword(token)}}>Lưu thông tin</SaveButton>
    <ToastContainer style={{fontSize: '12px'}}/>
  </ChangePasswordContainer>
  )
}

export default ChangePasswordCoponent
import React from 'react'
import styled from "styled-components";

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
  return (
    <ChangePasswordContainer>
    <h3 style={{color:'black'}}>Đổi mật khẩu</h3>
    <FormGroup>
      <label style={{fontSize:'15px'}} >Mật khẩu cũ</label>
      <input type="password" />
    </FormGroup>
    <FormGroup>
      <label style={{fontSize:'15px'}}>Mật khẩu mới</label>
      <input type="password" />
    </FormGroup>
    <FormGroup>
      <label style={{fontSize:'15px'}}>Xác nhận mật khẩu mới</label>
      <input type="password" />
    </FormGroup>
    <SaveButton>Lưu thông tin</SaveButton>
  </ChangePasswordContainer>
  )
}

export default ChangePasswordCoponent
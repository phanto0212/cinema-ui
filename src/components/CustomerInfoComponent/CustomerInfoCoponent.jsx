import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import newRequest from '../../utils/request';

const FormContainer = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 20px;
  color:black;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 15px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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
function CustomerInfoComponent({ user }) {
  const token = localStorage.getItem('authToken');

  const [fullname, setFullname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Khởi tạo giá trị từ `user`
    if (user) {
      setFullname(user.fullname || '');
      setBirthday(user.birthday || '');
      setTelephone(user.telephone || '');
      setEmail(user.email || '');
    }
  }, [user]);

  const saveInfo = async () => {
    if (!fullname || !birthday || !telephone || !email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      const response = await newRequest.post(
        '/api/auth/change/info/user',
        {
          fullname,
          birthday,
          telephone,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message || 'Cập nhật thông tin thành công!');
    } catch (error) {
      console.error('Error updating info:', error);
      alert('Đã xảy ra lỗi khi lưu thông tin.');
    }
  };

  return (
    <FormContainer>
      <SectionTitle>Thông tin cá nhân</SectionTitle>
      <FormGroup>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Họ và tên"
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Ngày sinh"
        />
      </FormGroup>
      <FormGroup>
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Số điện thoại"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </FormGroup>
      <SaveButton onClick={saveInfo}>Lưu thông tin</SaveButton>
    </FormContainer>
  );
}

export default CustomerInfoComponent;
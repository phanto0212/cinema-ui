import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 8px;
  padding: 20px 30px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 600px;
  max-width: 90%;
  height: 200px;
`;

const Title = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Message = styled.p`
  color: white;
  font-size: 16px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 15px 130px;
  border: none;
  border-radius: 4px;
  background-color: yellow;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #ffcc00;
  }
`;


function Modal({ isOpen, onClose, message }) {
    if (!isOpen) return null;

    return (
      <Overlay>
        <ModalContainer>
          <Title>LƯU Ý!</Title>
          <Message>{message}</Message>
          <Button onClick={onClose}>OK</Button>
        </ModalContainer>
      </Overlay>
    );
}

export default Modal
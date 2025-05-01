import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  width: ${props => props.fullWidth ? '100%' : '100%'};
  max-width: ${props => props.fullWidth ? '600px' : '250px'};
  transition: all 0.3s ease;
  
  @media (max-width: 1200px) {
    max-width: ${props => props.fullWidth ? '550px' : '220px'};
  }
  
  @media (max-width: 992px) {
    max-width: ${props => props.fullWidth ? '500px' : '200px'};
  }
  
  @media (max-width: 768px) {
    max-width: ${props => props.fullWidth ? '90%' : '180px'};
  }
  
  @media (max-width: 480px) {
    max-width: ${props => props.fullWidth ? '90%' : '160px'};
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  background-color: #fff;
  border-radius: 92px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:focus-within {
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  
  input {
    flex: 1;
    height: 100%;
    color: #000;
    font-size: 1rem;
    border: none;
    outline: none;
    background-color: transparent;
    
    &::placeholder {
      color: #999;
      transition: color 0.3s ease;
    }
    
    &:focus::placeholder {
      color: #bbb;
    }
  }
  
  @media (max-width: 768px) {
    height: 40px;
    padding-left: 12px;
    
    input {
      font-size: 0.95rem;
    }
  }
  
  @media (max-width: 480px) {
    height: 38px;
    padding-left: 10px;
    border-radius: 30px;
    
    input {
      font-size: 0.9rem;
      
      &::placeholder {
        font-size: 0.85rem;
      }
    }
  }
`;

export const Search = styled.button`
  width: 52px;
  height: 100%;
  border-top-right-radius: 92px;
  border-bottom-right-radius: 92px;
  font-size: 1.2rem;
  border: none;
  background-color: #ff7401;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #e66b00;
  }
  
  &:active {
    background-color: #d26200;
    transform: scale(0.97);
  }
  
  @media (max-width: 768px) {
    width: 46px;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    width: 40px;
    font-size: 1rem;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
  
  /* Tối ưu cho thiết bị cảm ứng */
  @media (hover: none) {
    &:active {
      background-color: #d26200;
    }
  }
`;
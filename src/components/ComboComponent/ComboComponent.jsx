import React, { useState } from 'react'
import { ComboCard, ComboDescription, ComboImage, ComboTitle, Price, QuantityButton, QuantityControl } from './style';

function ComboComponent({ image, title, description, price, combo_id, onQuantityChange }) {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(combo_id, title, newQuantity); // Gửi thông tin về component cha
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(combo_id, title, newQuantity); // Gửi thông tin về component cha
    }
  };

  return (
    <ComboCard>
      <ComboImage src={image} alt={title} />
      <ComboTitle>{title}</ComboTitle>
      <ComboDescription>{description}</ComboDescription>
      <Price>{price} VND</Price>
      <QuantityControl>
        <QuantityButton onClick={handleDecrease}>-</QuantityButton>
        <span style={{ color: '#fff' }}>{quantity}</span>
        <QuantityButton onClick={handleIncrease}>+</QuantityButton>
      </QuantityControl>
    </ComboCard>
  );
}

export default ComboComponent
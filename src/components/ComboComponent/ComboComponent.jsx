import React, { useState } from 'react'
import { ComboCard, ComboDescription, ComboImage, ComboTitle, Price, QuantityButton, QuantityControl } from './style';

function ComboComponent({ image, title, description, price }) {
    const [quantity, setQuantity] = useState(0);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
      if (quantity > 0) setQuantity(quantity - 1);
    };
  
    return (
      <ComboCard>
        <ComboImage src={image} alt={title} />
        <ComboTitle>{title}</ComboTitle>
        <ComboDescription>{description}</ComboDescription>
        <Price>{price} VND</Price>
        <QuantityControl>
          <QuantityButton onClick={handleDecrease}>-</QuantityButton>
          <span>{quantity}</span>
          <QuantityButton onClick={handleIncrease}>+</QuantityButton>
        </QuantityControl>
      </ComboCard>
    );
}

export default ComboComponent
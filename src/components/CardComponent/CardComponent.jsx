import React from "react";
import { Meta, Overlay, StyledCard } from "./style";

function CardComponent() {
  return (
      <StyledCard
        hoverable
        cover={
          <img
            alt="Movie Poster"
            src="https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F10-2024%2Fvenom.jpg&w=1920&q=75"
            style={{ width: "400", height: "355px", objectFit: "cover" }}
          />
        }
      >
        <Overlay>
          <h2>VENOM: KÉO CUỐI</h2>
          <p>Tác giả: Tom Hardy</p>
          <p>Đánh giá: 8.5/10</p>
          <p>Thời lượng: 109 phút</p>
        </Overlay>
        <Meta title="VENOM: KÉO CUỐI" description="25.10.2024" />
      </StyledCard>
    );
}

export default CardComponent
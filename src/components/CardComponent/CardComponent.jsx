import React from "react";
import { CardDetail, ContainerALl, ContainerButton, LinkButton, NameCard, NameCardHeader, Overlay, StyledCard, TrailerContainer, ViewTrailer } from "./style";

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
          <NameCard>VENOM: KÈO CUỐI</NameCard>
          <CardDetail><span style={{color: '#F3EA28'}}>Thể loại: </span>hành động khoa học viễn tưởng</CardDetail>
          <CardDetail><span style={{color: '#F3EA28'}}>Tác giả: </span>Tom Hardy</CardDetail>
          <CardDetail><span style={{color: '#F3EA28'}}>Đánh giá: </span>8.5/10</CardDetail>
          <CardDetail><span style={{color: '#F3EA28'}}>Thời lượng: </span>109 phút</CardDetail>
        </Overlay>
        <NameCardHeader>Venom: Kèo cuối (P13)</NameCardHeader>
        <ContainerALl>
         <TrailerContainer>
          <img style={{marginBottom: '4px'}} alt="icon" src="https://cinestar.com.vn/assets/images/icon-play-vid.svg" />
          <ViewTrailer>Xem Trailer</ViewTrailer>
         </TrailerContainer>
         <ContainerButton style={{backgroundColor: '#ff7401'}} ><LinkButton style={{color: '#fff'}} >Đặt vé</LinkButton></ContainerButton>
        </ContainerALl>
      </StyledCard>
    );
}

export default CardComponent
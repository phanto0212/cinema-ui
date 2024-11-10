import React from 'react'
import { BookButton, MovieDetails, MovieTitle, PaymentSection, SelectedSeats, TicketInfo, Timer, TotalAmount } from './style'

function FooterTicketInfo() {
  return (
    <div>
    <TicketInfo>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '100px'}}>
        <MovieTitle>ĐỪNG BUÔNG TAY (T18)</MovieTitle>
      <MovieDetails>
        Cinestar Huế | 2 Người Lớn <br />
        Phòng chiếu: 08 | D07, D08 | 15:55
      </MovieDetails>
      <SelectedSeats>1 Combo Couple</SelectedSeats>
    </div>
      <PaymentSection>
        <TotalAmount>Tạm tính: <span style={{fontSize:'25px'}}>199,000 VNĐ</span></TotalAmount>
        <BookButton>ĐẶT VÉ</BookButton>
      </PaymentSection>
    </TicketInfo>
    </div>
  )
}

export default FooterTicketInfo
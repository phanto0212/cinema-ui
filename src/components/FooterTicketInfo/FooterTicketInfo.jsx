import React from 'react'
import { BookButton, MovieDetails, MovieTitle, PaymentSection, SelectedSeats, TicketInfo, TotalAmount } from './style'

function FooterTicketInfo({cinemaName, nameMovie, amountAdult, amountChild, totalPrice, seats, selectedSeats, showtime_hour}) {
  const selectedSeatNumbers = seats
    .filter(seat => selectedSeats.includes(seat.id))
    .map(seat => seat.seat_number);
  return (
    <div>
    <TicketInfo>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '100px'}}>
        <MovieTitle>{nameMovie}</MovieTitle>
      <MovieDetails>
        {cinemaName} | {amountAdult} Người Lớn | {amountChild} Trẻ Nhỏ <br />
        Phòng chiếu: 08 | {selectedSeatNumbers.map((seat_number,index)=>(<span key={index}> {seat_number}, </span>))}|  {showtime_hour}
      </MovieDetails>
      <SelectedSeats>1 Combo Couple </SelectedSeats>
    </div>
      <PaymentSection>
        <TotalAmount>Tạm tính: <span style={{fontSize:'25px'}}>{totalPrice} VNĐ</span></TotalAmount>
        <BookButton>ĐẶT VÉ</BookButton>
      </PaymentSection>
    </TicketInfo>
    </div>
  )
}

export default FooterTicketInfo
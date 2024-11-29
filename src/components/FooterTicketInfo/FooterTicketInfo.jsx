import React from 'react';
import { BookButton, MovieDetails, MovieTitle, PaymentSection, SelectedSeats, TicketInfo, TotalAmount } from './style';

function FooterTicketInfo({
  cinemaName, selectedCombos, nameMovie, amountAdult, amountChild, totalPrice, seats, selectedSeats, showtime_hour, screen
}) {
  const selectedSeatNumbers = seats
    .filter(seat => selectedSeats.includes(seat.id))
    .map(seat => seat.seat_number);

  return (
    <div>
      <TicketInfo>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '100px' }}>
          <MovieTitle>{nameMovie}</MovieTitle>
          <MovieDetails>
            {cinemaName} | {amountAdult} Người Lớn | {amountChild} Trẻ Nhỏ <br />
            Phòng chiếu: {screen.screen_number} | 
            {selectedSeatNumbers.length > 0 ? selectedSeatNumbers.map((seat_number, index) => (
              <span key={index}>{seat_number}{index < selectedSeatNumbers.length - 1 ? ', ' : ''}</span>
            )) : 'Chưa chọn ghế'} | {showtime_hour}
          </MovieDetails>
          <SelectedSeats>
            {selectedCombos.length > 0 ? selectedCombos.map((combo, index) => (
              <span key={index}>{combo.name} x {combo.quantity}</span>
            )) : 'Chưa chọn combo'}
          </SelectedSeats>
        </div>
        <PaymentSection>
          <TotalAmount>Tạm tính: <span style={{ fontSize: '25px' }}>{totalPrice} VNĐ</span></TotalAmount>
          <BookButton>ĐẶT VÉ</BookButton>
        </PaymentSection>
      </TicketInfo>
    </div>
  );
}

export default FooterTicketInfo;

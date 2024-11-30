import React, { useState } from 'react';
import { BookButton, MovieDetails, MovieTitle, PaymentSection, SelectedSeats, TicketInfo, TotalAmount } from './style';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';

function FooterTicketInfo({
  cinemaName, selectedCombos, movie, nameMovie,selectedShowtime,  amountAdult, amountChild, totalPrice, seats, selectedSeats, showtime_hour, screen
}) {
  const selectedSeatNumbers = seats
    .filter(seat => selectedSeats.includes(seat.id))
    .map(seat => seat.seat_number);
  const token = localStorage.getItem('authToken')
  const Navigate = useNavigate()
  const [ticketId, setTicketId]=  useState(0)
  // Kiểm tra tổng số lượng người lớn và trẻ em có bằng số ghế đã chọn không
  const fetchApiAddBooking = async () => {
    try {
      if (!token) {
        Navigate('/login');
        return;
      }
      const response = await newRequest.post(
        '/api/ticket/order/ticket',
        {
            movieId: movie.id,
            showtimeId: selectedShowtime,
            screenId: screen.id,
            countAdult:amountAdult,
            countChild:amountChild,
            seatIds: selectedSeats,
            comboIds: selectedCombos
        
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
       
       setTicketId(response.data.ticket_id) ;
        Navigate(`/payment/${response.data.ticket_id}`)
      
  
    } catch (error) {
      console.error('error', error);
      
    }
  };
  let isConfirmButtonDisabled = (amountAdult + amountChild) !== selectedSeats.length;

  const handleConfirmed = () => {
    // Logic khi nhấn "ĐẶT VÉ"
    fetchApiAddBooking()
  };

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
          <BookButton onClick={handleConfirmed} disabled={isConfirmButtonDisabled}>ĐẶT VÉ</BookButton>
        </PaymentSection>
      </TicketInfo>
    </div>
  );
}

export default FooterTicketInfo;


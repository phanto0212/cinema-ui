import React, { useState } from 'react';
import { 
  BookButton, 
  MovieDetails, 
  MovieTitle, 
  PaymentSection, 
  SelectedSeats, 
  TicketInfo, 
  TotalAmount,
  TicketInfoContent,
  MoviePoster,
  MovieInfoSection,
  InfoRow,
  SeatsContainer,
  Badge,
  Tag
} from './style';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
import { 
  FaMapMarkerAlt, 
  FaUserAlt, 
  FaChild, 
  FaTicketAlt,
  FaFilm,
  FaClock,
  FaCouch,
  FaUtensils,
  FaShoppingCart,
  FaDollarSign
} from 'react-icons/fa';

function FooterTicketInfo({
  cinemaName, selectedCombos, movie, nameMovie, selectedShowtime, 
  amountAdult, amountChild, totalPrice, seats, selectedSeats, showtime_hour, screen
}) {
  const selectedSeatNumbers = seats
    .filter(seat => selectedSeats.includes(seat.id))
    .map(seat => seat.seat_number);
    
  const token = localStorage.getItem('authToken');
  const Navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketId, setTicketId] = useState(0);
  
  // Check if the number of people matches the number of seats
  const isConfirmButtonDisabled = (amountAdult + amountChild) !== selectedSeats.length || totalPrice === 0;

  const fetchApiAddBooking = async () => {
    try {
      if (!token) {
        Navigate('/login');
        return;
      }
      
      setIsLoading(true);
      
      const response = await newRequest.post(
        '/api/ticket/order/ticket',
        {
          movieId: movie.id,
          showtimeId: selectedShowtime,
          screenId: screen.id,
          countAdult: amountAdult,
          countChild: amountChild,
          seatIds: selectedSeats,
          comboIds: selectedCombos,
          totalPrice: totalPrice
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
       
      setTicketId(response.data.ticket_id);
      Navigate(`/payment/${response.data.ticket_id}`);
    } catch (error) {
      console.error('error', error);
      // You could add a toast notification here for errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmed = () => {
    fetchApiAddBooking();
  };
  
  // Format price with commas
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN");
  };

  return (
    <TicketInfo>
      <TicketInfoContent>
        <MoviePoster>
          {movie?.poster_url && <img src={movie.poster_url} alt={nameMovie} />}
        </MoviePoster>
        
        <MovieInfoSection>
          <MovieTitle>
            {nameMovie}
            {movie?.movieType && <Tag>{movie.movieType}</Tag>}
          </MovieTitle>
          
          <MovieDetails>
            <span>
              <FaMapMarkerAlt /> {cinemaName}
            </span>
            <span>
              <FaFilm /> Phòng {screen.screen_number}
            </span>
            <span>
              <FaClock /> {showtime_hour}
            </span>
          </MovieDetails>
          
          <InfoRow>
            <FaUserAlt />
            <Badge type="adult">{amountAdult} Người lớn</Badge>
            {amountChild > 0 && (
              <>
                <FaChild />
                <Badge type="child">{amountChild} Trẻ em</Badge>
              </>
            )}
          </InfoRow>
          
          <SeatsContainer>
            <span className="seat-label">
              <FaCouch /> Ghế:
            </span>
            <span className="seat-numbers">
              {selectedSeatNumbers.length > 0 ? 
                selectedSeatNumbers.join(', ') : 
                'Chưa chọn ghế'}
            </span>
          </SeatsContainer>
          
          {selectedCombos && selectedCombos.length > 0 && (
            <SelectedSeats>
              <FaUtensils style={{ color: '#ff7401', marginRight: '5px' }} />
              {selectedCombos.map((combo, index) => (
                <span key={index}>
                  {combo.name} x {combo.quantity}
                </span>
              ))}
            </SelectedSeats>
          )}
        </MovieInfoSection>
      </TicketInfoContent>
      
      <PaymentSection>
        <TotalAmount>
          Tạm tính: 
          <span>
            <FaDollarSign style={{ fontSize: '18px', marginRight: '2px' }} />
            {formatPrice(totalPrice)} VNĐ
          </span>
        </TotalAmount>
        
        <BookButton 
          onClick={handleConfirmed} 
          disabled={isConfirmButtonDisabled || isLoading}
        >
          {isLoading ? (
            'Đang xử lý...'
          ) : (
            <>
              <FaShoppingCart style={{ marginRight: '8px' }} /> 
              Đặt vé
            </>
          )}
        </BookButton>
      </PaymentSection>
    </TicketInfo>
  );
}

export default FooterTicketInfo;
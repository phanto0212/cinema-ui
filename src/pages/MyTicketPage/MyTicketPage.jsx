import React, { useEffect, useState } from 'react';
import SideBarComponent from '../../components/SideBarComponent/SideBarCoponent';
import styled from 'styled-components';
import Snowfall from '../../components/SnowComponent/Snowfall';
import newRequest from '../../utils/request';

const AppContainer = styled.div`
  display: flex;
  background: #292e5d;
  color: white;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
  font-weight: 600;
  color: #ffdd57;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const TicketCard = styled.div`
  background: #162447;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    font-weight: bold;
    color: #ffdd57;
  }
`;

const ComboInfo = styled.div`
  margin-top: 15px;
  background-color: #1f4068;
  padding: 10px;
  border-radius: 8px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #ffdd57;
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0;

    li {
      font-size: 14px;
      color: #e4e4e4;
      margin-bottom: 5px;
    }
  }
`;

const Actions = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;

  button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s, transform 0.2s;

    &.cancel {
      background-color: #e63946;
      color: white;

      &:hover {
        background-color: #c82333;
        transform: scale(1.05);
      }
    }

    &.details {
      background-color: #1f7a8c;
      color: white;

      &:hover {
        background-color: #135d6e;
        transform: scale(1.05);
      }
    }
  }
`;

function MyTicketPage() {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem('authToken');

  const fetchTicket = async (token) => {
    try {
      const response = await newRequest.post('/api/ticket/get/all/ticket/user', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data.tickets || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) fetchTicket(token);
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, [token]);

  return (
    <>
      <Snowfall />
      <div style={{ marginTop: '91.5px' }}>
        <AppContainer>
          <SideBarComponent />
          <Content>
            <Title>🎟 Danh sách vé đã đặt 🎟</Title>
            <TicketList>
              {tickets.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#ccc' }}>Chưa có vé nào được đặt!</p>
              ) : (
                tickets.map((ticket) => (
                  <TicketCard key={ticket.ticket_id}>
                    <TicketInfo>
                      <div>🎬 <span>{ticket.movie.title}</span></div>
                      <div>📅 <span>{ticket.showtime.day_show}</span> - 🕒 <span>{ticket.showtime.time_show}</span></div>
                      <div>🎭 <span>{ticket.cinema.name}</span></div>
                      <div>💺 Ghế: <span>{ticket.listNameSeat.join(', ')}</span></div>
                      <div>
  💵 Tổng giá: <span>{ticket.ticket.price ? ticket.ticket.price.toLocaleString() : 0} đ</span>
</div>
                    </TicketInfo>
                    <ComboInfo>
                      <h4>🍿 Combo đã đặt:</h4>
                      <ul>
                        {ticket.combo_ticket.map((combo, index) => (
                          <li key={index}>
                            - {combo.name}: {combo.quantity} x {combo.price} đ
                          </li>
                        ))}
                      </ul>
                    </ComboInfo>
                    <Actions>
                      <button className="cancel">Hủy vé</button>
                      <button className="details">Xem chi tiết</button>
                    </Actions>
                  </TicketCard>
                ))
              )}
            </TicketList>
          </Content>
        </AppContainer>
      </div>
    </>
  );
}

export default MyTicketPage;

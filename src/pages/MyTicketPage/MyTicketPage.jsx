import React, { useEffect } from 'react';
import SideBarComponent from '../../components/SideBarComponent/SideBarCoponent';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  background-color: #1a1a2e;
  color: white;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 40px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
`;

const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TicketCard = styled.div`
  background-color: #162447;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const TicketInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  span {
    font-weight: bold;
  }
`;

const ComboInfo = styled.div`
  margin-top: 10px;
  background-color: #1f4068;
  padding: 10px;
  border-radius: 8px;

  h4 {
    margin: 0 0 10px 0;
    font-size: 16px;
  }

  ul {
    padding: 0;
    list-style: none;
    margin: 0;

    li {
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
`;

const Actions = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &.cancel {
      background-color: #e63946;
      color: white;
    }

    &.details {
      background-color: #1f7a8c;
      color: white;
    }
  }
`;

function MyTicketPage() {
  // Fake data
  const tickets = [
    {
      id: 1,
      movieName: 'Avatar 2',
      date: '12/12/2024',
      time: '19:00',
      cinema: 'CGV - Phòng 3',
      seats: ['A1', 'A2'],
      price: '200.000 VNĐ',
      combos: [
        { name: 'Combo 1', items: ['1 Bắp rang', '1 Nước ngọt'] },
        { name: 'Combo 2', items: ['1 Nachos', '2 Nước ngọt'] },
      ],
    },
    {
      id: 2,
      movieName: 'Spider-Man: No Way Home',
      date: '15/12/2024',
      time: '17:00',
      cinema: 'Lotte - Phòng 5',
      seats: ['B5', 'B6'],
      price: '180.000 VNĐ',
      combos: [{ name: 'Combo 3', items: ['1 Bắp rang lớn', '1 Trà sữa'] }],
    },
  ];
  useEffect(() => {
        window.scrollTo(0, 0); // Cuộn về đầu trang
      }, []);

  return (
    <div style={{ marginTop: '91.5px' }}>
      <AppContainer>
        <SideBarComponent />
        <Content>
          <Title>Danh sách vé đã đặt</Title>
          <TicketList>
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id}>
                <TicketInfo>
                  <div>🎬 <span>{ticket.movieName}</span></div>
                  <div>📅 <span>{ticket.date}</span> - 🕒 <span>{ticket.time}</span></div>
                  <div>🎭 <span>{ticket.cinema}</span></div>
                  <div>💺 Ghế: <span>{ticket.seats.join(', ')}</span></div>
                  <div>💵 Tổng giá: <span>{ticket.price}</span></div>
                </TicketInfo>
                <ComboInfo>
                  <h4>Combo đã đặt:</h4>
                  <ul>
                    {ticket.combos.map((combo, index) => (
                      <li key={index}>- {combo.name}: {combo.items.join(', ')}</li>
                    ))}
                  </ul>
                </ComboInfo>
                <Actions>
                  <button className="cancel">Hủy vé</button>
                  <button className="details">Xem chi tiết</button>
                </Actions>
              </TicketCard>
            ))}
          </TicketList>
        </Content>
      </AppContainer>
    </div>
  );
}

export default MyTicketPage;

import styled from "styled-components";

const CommentsContainer = styled.div`
  margin-top: 20px;
  background-color: #222244;
  border-radius: 15px;
  padding: 20px;
  color: #fff;
  max-width: 1400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 15px;
  background-color: #2a2a50;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.2);
  }
`;

const Author = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #ffd700; /* Màu vàng ánh kim */
`;

const Content = styled.p`
  margin: 0;
  font-size: 14px;
  color: #eaeaea;
`;

const Time = styled.span`
  font-size: 12px;
  color: #aaa;
  align-self: flex-end;
`;
const timeAgo = (createdAt) => {
    const now = new Date();
    const commentTime = new Date(createdAt);
    const diffInSeconds = Math.floor((now - commentTime) / 1000); // Tính số giây chênh lệch
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Chuyển đổi thành phút
  
    if (diffInMinutes < 1) {
      return 'Vừa xong';
    } else {
      return `${diffInMinutes} phút trước`;
    }
  };
const CommentsList = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments.map((comment, index) => (
        <CommentItem key={index}>
          <Author>{comment.author}</Author>
          <Content>{comment.content}</Content>
          <Time>{timeAgo(comment.created_at)}</Time>
        </CommentItem>
      ))}
    </CommentsContainer>
  );
};

export default CommentsList;

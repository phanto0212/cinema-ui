import React from "react";
import styled from "styled-components";
import newRequest from "../../utils/request";

const CommentSection = styled.div`
  background-color: #1a1a2e;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 15px;
  text-align: center;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #444;
  background-color: #2c2c4d;
  color: white;
  margin-bottom: 10px;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #ffd700;
  color: #1a1a2e;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6b800;
  }
`;
const SubmitButton2 = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color:rgb(16, 235, 49);
  color: #1a1a2e;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color:rgb(55, 184, 57);
  }
`;

const Comments = ({movie_id}) => {
  const [newComment, setNewComment] = React.useState("");
  const token = localStorage.getItem('authToken')
  const handleAddComment = async(newComment, token) =>{
    try{
      if (newComment == ''){
        alert('Bạn phải nhập bình luận trước!');
        return 
      }
       const reponse = await newRequest.post('/api/comment/post/comment',{
        movie_id : movie_id,
        content : newComment
       }, {headers : {Authorization : `Bearer ${token}`}});
       if (reponse.status == 200){
        setNewComment('')
       }
    }
    catch(error){
      console.log(error)
      alert('Co loi xay ra')
    }
  }
  const handleDeleComment = () =>{
     setNewComment('')
  };
  return (
    <CommentSection>
      <Title>Bình luận</Title>
      <CommentInput
        rows="4"
        placeholder="Nhập bình luận của bạn..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <SubmitButton onClick={() => handleAddComment(newComment, token)}>Gửi</SubmitButton>
        <SubmitButton2 onClick={handleDeleComment}>Xóa</SubmitButton2>
      </div>
      
    </CommentSection>
  );
};

export default Comments;

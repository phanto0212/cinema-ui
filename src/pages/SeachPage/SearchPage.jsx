import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
import CardComponent from '../../components/CardComponent/CardComponent';
import Snowfall from '../../components/SnowComponent/Snowfall';

function SearchPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const location = useLocation();
  // Phân tích query string từ URL
  const queryParams = new URLSearchParams(location.search);
  const searchKey = queryParams.get('key'); // Lấy giá trị của 'key'

  const fetchMovie = async (key) => {
    try {
      const response = await newRequest.post("/api/movie/get/movie/by/key", { key: key });
      setMovies(response.data.movies || []);
      setError(null); // Xóa lỗi nếu API thành công
    } catch (error) {
      console.log(error);
      setError("Không thể tải danh sách phim. Vui lòng thử lại!");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, []);

  useEffect(() => {
    if (searchKey) {
      fetchMovie(searchKey);
    } else {
      setMovies([]); // Nếu không có từ khóa, danh sách phim rỗng
    }
  }, [searchKey]);

  return (
    <>
    <Snowfall/>
    <div style={{ padding: '0 120px', backgroundColor: '#292e5d', height: '4000px', marginTop: '91.5px' }}>
      <div style={{ marginTop: '60px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '25px' }}>
        {error && <div style={{ color: "red", margin: "20px 0" }}>{error}</div>}
        {movies.length === 0 && !error && (
          <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
            Không tìm thấy phim nào với từ khóa "{searchKey}".
          </div>
        )}
         <div>
        {movies.length !== 0 && !error && (
          <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>
            Có {movies.length} kết quả cho từ khóa: "{searchKey}".
          </div>
        )}
        <div style={{marginTop: '30px',  display: 'flex',flexWrap: 'wrap', alignItems: 'center', gap: '25px'}} >
        {movies.map((movie, index) =>(
          <CardComponent movie={movie} key={index} onClick={()=> Navigate(`/movie/detail/${movie.id}`)} ></CardComponent>
        ))}
      </div>
        </div>
      </div>
    </div>
    </>
   
  );
}

export default SearchPage;

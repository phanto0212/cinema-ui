import React, { useEffect, useState } from 'react'
import SlideComponent from '../../components/SlideComponent/SlideComponent';
import slide0 from '../../assets/images/slide0.png';
import slide1 from '../../assets/images/slide1.jpg';
import slide2 from '../../assets/images/slide2.jpg';
import slide3 from '../../assets/images/slide3.jpg';
import slide4 from '../../assets/images/slide4.jpg';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/request';
import Snowfall from '../../components/SnowComponent/Snowfall';
import { 
  PageWrapper, 
  ContentContainer,
  SectionTitle,
  MovieGrid,
  MovieCardWrapper,
  FeaturedSection,
  FeaturedMovieCard,
  FeaturedImage,
  FeaturedContent,
  FeaturedBadge,
  FeaturedButton,
  ComingSoonSection,
  ComingSoonBanner,
  CategoryTabs,
  CategoryTab,
  NewsletterSection,
  SubscribeForm,
  SubscribeInput,
  SubscribeButton,
  PromoBadge,
  FloatingIcon
} from './style';
import { 
  faFilm, 
  faTicketAlt, 
  faVideo, 
  faStar,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

function Hompage() {
  const Navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async() => {
    setIsLoading(true);
    try {
      const response = await newRequest.get('/api/movie/all/show/now');
      const moviesData = response.data.movies || [];
      setMovies(moviesData);
      
      // Chọn một phim ngẫu nhiên làm phim nổi bật
      if (moviesData.length > 0) {
        const randomIndex = Math.floor(Math.random() * moviesData.length);
        setFeaturedMovie(moviesData[randomIndex]);
      }
    }
    catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMovies();
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0); // Cuộn về đầu trang
  }, []);

  const filterMovies = () => {
    if (activeCategory === 'all') return movies;
    
    // Giả lập filter theo thể loại - trong thực tế nên gọi API hoặc filter theo thể loại thực
    switch(activeCategory) {
      case 'action':
        return movies.filter((_, index) => index % 3 === 0);
      case 'comedy':
        return movies.filter((_, index) => index % 3 === 1);
      case 'drama':
        return movies.filter((_, index) => index % 3 === 2);
      default:
        return movies;
    }
  };

  return (
    <>
      <Snowfall />
      <PageWrapper>
        <ContentContainer>
          <SlideComponent arrImages={[slide0, slide1, slide2, slide3, slide4]} />
          
          {/* Phim Nổi Bật */}
          <FeaturedSection>
            <SectionTitle delay="0.1s">Phim Nổi Bật</SectionTitle>
            
            {featuredMovie && (
              <FeaturedMovieCard>
                <PromoBadge>HOT!</PromoBadge>
                <FeaturedImage>
                  <img src={featuredMovie.poster_url} alt={featuredMovie.title} />
                </FeaturedImage>
                <FeaturedContent>
                  <FeaturedBadge>
                    <FontAwesomeIcon icon={faStar} style={{marginRight: '5px'}} />
                    Đang chiếu
                  </FeaturedBadge>
                  <h3>{featuredMovie.title}</h3>
                  <p>
                    {featuredMovie.description || 
                    "Trải nghiệm điện ảnh tuyệt vời với một trong những bộ phim được yêu thích nhất hiện nay. Đưa bạn vào thế giới của những cảm xúc và những câu chuyện đáng nhớ."}
                  </p>
                  <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
                    <span style={{color: '#ff7401'}}>
                      <FontAwesomeIcon icon={faFilm} style={{marginRight: '5px'}} />
                      {featuredMovie.movieType || "Hành động/Phiêu lưu"}
                    </span>
                    <span style={{color: '#ff7401'}}>
                      <FontAwesomeIcon icon={faCalendarAlt} style={{marginRight: '5px'}} />
                      {featuredMovie.releaseDate || "20/04/2023"}
                    </span>
                  </div>
                  <FeaturedButton onClick={() => Navigate(`/movie/detail/${featuredMovie.id}`)}>
                    <FontAwesomeIcon icon={faTicketAlt} style={{marginRight: '8px'}} />
                    Đặt vé ngay
                  </FeaturedButton>
                </FeaturedContent>
              </FeaturedMovieCard>
            )}
          </FeaturedSection>
          
          {/* Phim Đang Chiếu */}
          <section>
            <SectionTitle delay="0.2s">Phim Đang Chiếu</SectionTitle>
            
            <CategoryTabs>
              <CategoryTab 
                active={activeCategory === 'all'} 
                onClick={() => setActiveCategory('all')}
              >
                Tất cả
              </CategoryTab>
              <CategoryTab 
                active={activeCategory === 'action'} 
                onClick={() => setActiveCategory('action')}
              >
                Hành động
              </CategoryTab>
              <CategoryTab 
                active={activeCategory === 'comedy'} 
                onClick={() => setActiveCategory('comedy')}
              >
                Hài hước
              </CategoryTab>
              <CategoryTab 
                active={activeCategory === 'drama'} 
                onClick={() => setActiveCategory('drama')}
              >
                Tâm lý
              </CategoryTab>
            </CategoryTabs>
            
            <MovieGrid>
              {isLoading ? (
                // Hiển thị skeleton loading nếu có
                Array(8).fill().map((_, index) => (
                  <MovieCardWrapper key={`skeleton-${index}`} delay={`${0.1 + index * 0.05}s`}>
                    <div style={{
                      height: '350px',
                      borderRadius: '12px',
                      background: 'rgba(255,255,255,0.1)',
                    }}></div>
                  </MovieCardWrapper>
                ))
              ) : (
                filterMovies().map((movie, index) => (
                  <MovieCardWrapper key={index} delay={`${0.1 + index * 0.05}s`}>
                    <CardComponent 
                      movie={movie} 
                      onClick={() => Navigate(`/movie/detail/${movie.id}`)} 
                    />
                  </MovieCardWrapper>
                ))
              )}
            </MovieGrid>
          </section>
          
          {/* Phim Sắp Chiếu */}
          <ComingSoonSection>
            <SectionTitle delay="0.3s">Phim Sắp Chiếu</SectionTitle>
            
            <FloatingIcon top="10%" left="5%" size="24px" delay="0.2s">
              <FontAwesomeIcon icon={faFilm} />
            </FloatingIcon>
            
            <FloatingIcon top="20%" right="15%" size="20px" delay="0.5s">
              <FontAwesomeIcon icon={faStar} />
            </FloatingIcon>
            
            <FloatingIcon bottom="15%" left="18%" size="22px" delay="0.8s">
              <FontAwesomeIcon icon={faVideo} />
            </FloatingIcon>
            
            <ComingSoonBanner>
              <h3>Đón đầu xu hướng điện ảnh</h3>
              <p>
                Hãy là người đầu tiên xem những bộ phim mới nhất. Đăng ký nhận thông báo về lịch chiếu phim mới và mua vé sớm để có được chỗ ngồi tốt nhất!
              </p>
              <FeaturedButton onClick={() => Navigate('/all/movie')}>
                Khám phá ngay
              </FeaturedButton>
            </ComingSoonBanner>
          </ComingSoonSection>
          
          {/* Nhận thông báo phim mới */}
          <NewsletterSection>
            <h3>Nhận thông báo phim mới</h3>
            <p>
              Đừng bỏ lỡ các bộ phim sắp ra mắt và chương trình khuyến mãi đặc biệt. Đăng ký ngay để nhận email thông báo từ chúng tôi!
            </p>
            <SubscribeForm onSubmit={(e) => {alert('Đăng ký thành công!'); e.preventDefault();}}>
              <SubscribeInput 
                type="email" 
                placeholder="Email của bạn" 
                required 
              />
              <SubscribeButton type="submit">Đăng ký</SubscribeButton>
            </SubscribeForm>
          </NewsletterSection>
        </ContentContainer>
      </PageWrapper>
    </>
  );
}

export default Hompage;
import Hompage from "../pages/HomePage/Hompage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MovieOnSchedulePage from "../pages/MovieOnSchedulePage/MovieOnSchedulePage";
import PhimDangChieuPage from "../pages/PhimDangChieuPage/PhimDangChieuPage";
import SearchPage from "../pages/SeachPage/SearchPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";



export const routes = [
    {
        path : '/',
        page : Hompage,
        isShowHeader : true
    },
    {
        path: '/login',
        page: LoginPage,
        isShowHeader: true
    },
    {
        path: '/signup',
        page: SignUpPage,
        isShowHeader: true
    },
    {
        path: '/movie/search',
        page: SearchPage,
        isShowHeader: true
    },
    {
        path: '/movie/onschedule',
        page: MovieOnSchedulePage,
        isShowHeader: true
    },
    {
        path: '/phim/dangchieu',
        page: PhimDangChieuPage,
        isShowHeader: true
    }

]

import Hompage from "../pages/HomePage/Hompage";
import LoginPage from "../pages/LoginPage/LoginPage";



export const routes = [
    {
        path : '/',
        page : Hompage,
        isShowHeader : true
    },
    {
        path: 'login',
        page: LoginPage,
        isShowHeader: true
    }

]

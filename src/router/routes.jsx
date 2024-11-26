import { lazy } from 'react';
import Update_Article from '../pages/NewsArticle/Update_Article';
import SliderAddImages from '../pages/SliderImage/SliderAddImages';
import AddNewArticle from '../pages/NewsArticle/AddNewArticle';
import UserProfile from '../pages/profile/UserProfile';
import Team_management from '../pages/TeamManagment/Team_management';





const Index = lazy(() => import('../pages/Index'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const Login = lazy(() => import('../pages/Authentication/Login'));

const Error = lazy(() => import('../components/Error'));

const routes = [
    // dashboard
    {
        path: '/',
        element: (
            
                <Index />
            
        ),
    },
   
    {
        path: '/add_SliderImages',
        element: <SliderAddImages/>,
    },

    {
        path: '/add-article',
        element: <AddNewArticle/>,
    },

    {
        path: '/user-profile',
        element: <UserProfile/>,
    },

    {
        path: '/teamManagement',
        element: <Team_management/>,
    },

    {
        path: '/update-article',
        element: <Update_Article />,
        
    },
    {
        path: '/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    

    //Authentication
    {
        path: '/auth/signin',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };

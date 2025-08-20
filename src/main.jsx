import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Homepage from './components/Homepage/Homepage';
import AuthProvider from './Provider/AuthProvider';
import Login2 from './components/Login/Login2';
import UserProfile from './components/UserProfile/UserProfile';
import PrivateRoutes from './components/Routes/PrivateRoutes';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import Furnitures from './components/Categories/Furnitures/Furnitures';
import Details from './components/Categories/Details/Details';
import ManageListing from './components/Shared/ManageListing/ManageListing';
import AddProduct from './components/Shared/ManageListing/AddProduct';
import ReviewListing from './components/Shared/ReviewListing/ReviewListing';
import MyReview from './components/Shared/ReviewListing/MyReview';
import Cart from './components/Cart/Cart';
import AboutUs from './components/AboutUs/AboutUs';
import SearchResult from './components/Shared/SearchReuslt/SearchResult';
import Banners from './components/Banners/Banners';
import Posters from './components/Posters/Posters';
import Labels from './components/Labels/Labels';
import BusinessCard from './components/Business Cards/BusinessCard';
import Success from './components/Cart/Success';
import EmailTemp from './components/Cart/EmailTemp';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Homepage></Homepage>
      },
      {
        path: '/login',
        // element: <Login></Login>
        element: <Login2></Login2>
      },
      {
        path: '/categories/:category',
        loader: ({ params }) => {
          // You can also return the param directly if needed
          return { category: params.category };
        },
        element: <Furnitures></Furnitures>
      },
      {
        path: '/details/:id',
        element: <Details></Details>
      },
      // landmark printing - begins
      {
        path: '/banner',
        element: <BusinessCard></BusinessCard>
      },
      {
        path: '/poster',
        element: <BusinessCard></BusinessCard>
      },
      {
        path: '/label',
        element: <BusinessCard></BusinessCard>
      },
      {
        path: '/businessCard',
        element: <BusinessCard></BusinessCard>
      },
      {
        path: '/success',
        element: <PrivateRoutes><Success></Success></PrivateRoutes>
      },
      // landmark printing - ends
      {
        path: '/aboutUs',
        element: <AboutUs></AboutUs>
      },
      {
        path: '/searchResult',
        element: <SearchResult></SearchResult>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes>< DashboardLayout /></PrivateRoutes>,
    children: [
      {
        path: '/dashboard',
        element: <UserProfile></UserProfile>
      },
      {
        path: '/dashboard/cart',
        element: <Cart></Cart>
      },
      {
        path: '/dashboard/myReviews',
        element: <MyReview></MyReview>
      },
      // seller routes
      {
        path: '/dashboard/manageListing',
        element: <ManageListing></ManageListing>
      },
      {
        path: '/dashboard/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: '/dashboard/addProduct',
        element: <AddProduct></AddProduct>
      },
      {
        path: '/dashboard/reviewListing',
        element: <ReviewListing></ReviewListing>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)

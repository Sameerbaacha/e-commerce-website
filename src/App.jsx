import React from 'react'
import Home from './pages/home/Home'
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import NoPage from './pages/noPage/NoPage';
import Layout from './components/layout/Layout';
import Allproduct from './pages/allproduct/Allproduct';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MycontextProvider from './context/data/Mycontext';
import Dashboard from './pages/admin/dashboard/Dashboard';

import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import SignupPage from './pages/registration/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/registration/Login ';

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return children
  } else {
    return <Navigate to={'/Login'} />
  }
}


export const ProtectedRoutesForAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.isAdmin) {
    return children;
  } else {
    return <Navigate to='/Login' />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoutesForAdmin> <Dashboard /></ProtectedRoutesForAdmin>,
      },
      {
        path: "/allproducts",
        element: <Allproduct />,
      },
      {
        path: '/productInfo/:id',
        element: <ProductInfo />
      },
      {
        path: "/order",
        element: <ProtectedRoute><Order /></ProtectedRoute>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/*",
        element: <NoPage />,
      }
    ]
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/addproduct",
    element: <ProtectedRoutesForAdmin> <AddProduct /></ProtectedRoutesForAdmin>,
  },
  {
    path: "/updateproduct",
    element: <ProtectedRoutesForAdmin> <UpdateProduct /></ProtectedRoutesForAdmin>,
  },

]);
const App = () => {
  return (
    <MycontextProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </MycontextProvider>

  )
}

export default App;



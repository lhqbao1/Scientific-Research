import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./redux/counter/counterSlice";
import styles from './styles/Counter.module.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import Loading from './components/Loading/Loading';
import BookPage from './pages/Book/BookPage'
import Login from './pages/Login/Login';
import AdminPage from './pages/Admin/AdminPage';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

const LayoutAdmin = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}




export default function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Loading />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "book",
          element: <BookPage />,
        },
      ],
    },

    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <Loading />,
      children: [
        {
          index: true, element:
            // <ProtectedRoute>
            <AdminPage />
          // </ProtectedRoute>
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    // {
    //   path: "/register",
    //   element: <RegisterPage />,
    // },



  ]);

  return (
    <>
      <RouterProvider router={router} />

    </>
  );
}

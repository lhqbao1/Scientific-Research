import React, { useEffect, useState } from 'react';
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
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { doGetAccountAction } from './redux/account/accountSlice';
import { callGetUser } from '../services/api';
import LecturerCNPM from './pages/Student/LecturerCNPM';
import LecturerCNTT from './pages/Student/LecturerCNTT';
import LecturerHTTT from './pages/Student/LecturerHTTT';
import LecturerKHMT from './pages/Student/LecturerKHMT';
import LecturerMMTVTT from './pages/Student/LecturerMMTVTT';
import LecturerTTDPT from './pages/Student/LecturerTTDPT';
import StudentTopic from './pages/Student/StudentTopic';
import ProtectedRouteStudent from './components/ProtectedRoute/ProtectedRouteStudent';
import LecturerHomePage from './pages/Lecturer/LecturerHomePage';
import ProtectedRouteLecturer from './components/ProtectedRoute/ProtectedRoteLecturer';
import HeaderLecturer from './components/Header/HeaderLecturer';
import LecturerExplanationBoard from './pages/Lecturer/LecturerExplanationBoard';
import LecturerAcceptanceBoard from './pages/Lecturer/LecturerAcceptanceBoard';

const Layout = () => {
  const student = useSelector(state => state.account.user.role)
  return (
    <div className='container'>
      <div className='content'>
        {student === 'student' && <Header />
        }
        <Outlet />
        {student === 'student' && <Footer />
        }
      </div>
    </div>
  )
}

const LayoutLecturer = () => {
  const lecturer = useSelector(state => state.accountLecturer.user.role)
  return (
    <div>
      {lecturer === 'lecturer' && <HeaderLecturer />
      }

      <Outlet />
      {lecturer === 'lecturer' && <Footer />
      }

    </div>
  )
}

const LayoutAdmin = () => {
  //get user info from redux
  const admin = useSelector(state => state.accountAdmin.user)
  //get role user
  const userRole = admin.role
  return (
    <div>
      {window.location.pathname === '/admin' && userRole === 'Admin' && ''
      }
      <Outlet />
      {window.location.pathname === '/admin' && userRole === 'Admin' && ''
      }

    </div>
  )
}




export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)


  const router = createBrowserRouter([
    {
      path: "/student",
      element: <Layout />,
      errorElement: <Loading />,
      children: [
        {
          index: true, element:
            <ProtectedRouteStudent>
              <HomePage />
            </ProtectedRouteStudent>
        },
        {
          path: "/student/lecturer",
          element: <LecturerCNPM />,

        },

      ],
    },

    {
      path: "/lecturer",
      element: <LayoutLecturer />,
      errorElement: <Loading />,
      children: [
        {
          index: true, element:
            <ProtectedRouteLecturer>
              <LecturerHomePage />
            </ProtectedRouteLecturer>
        },
        {
          path: "explanation-board",
          element: <LecturerExplanationBoard />,
        },
        {
          path: "acceptance-board",
          element: <LecturerAcceptanceBoard />,
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
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
        },

      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/topic",
      element: <StudentTopic />,
    },

    // {
    //   path: "/register",
    //   element: <RegisterPage />,
    // },




  ]);

  return (
    <>
      {isLoading === false
        || window.location.pathname === '/login'
        || window.location.pathname === '/register'
        || window.location.pathname === '/'

        ? <RouterProvider router={router} />
        : <Loading />
      }

    </>
  );
}

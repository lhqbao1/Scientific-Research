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
import StudentLecturer from './pages/Student/studentLecturer';
import LecturerCNPM from './pages/Student/LecturerCNPM';
import LecturerCNTT from './pages/Student/LecturerCNTT';
import LecturerHTTT from './pages/Student/LecturerHTTT';
import LecturerKHMT from './pages/Student/LecturerKHMT';
import LecturerMMTVTT from './pages/Student/LecturerMMTVTT';
import LecturerTTDPT from './pages/Student/LecturerTTDPT';
import StudentTopic from './pages/Student/StudentTopic';

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
  //get user info from redux
  const user = useSelector(state => state.account.user)
  //get role user
  const userRole = user.role.name
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
  const [userID, setUserId] = useState()
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.account.isLoading)
  const user = useSelector(state => state.account.user)
  // const getAccountInfo = async () => {
  //   if (window.location.pathname === '/login'
  //     || window.location.pathname === '/register'
  //   ) return;


  //   // const res = await callGetUser(userID)
  //   // if (res && res.data) {
  //   //   dispatch(doGetAccountAction(res.data.payload.user))
  //   // }

  // }

  // useEffect(() => {
  //   getAccountInfo()
  // }, [])

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
    {
      path: "/lecturer",
      // element: <StudentLecturer />,
      children: [
        {
          path: "/lecturer/khoa-cong-nghe-phan-mem",
          element: <LecturerCNPM />,
        },
        {
          path: "/lecturer/khoa-cong-nghe-thong-tin",
          element: <LecturerCNTT />,
        }, {
          path: "/lecturer/khoa-he-thong-thong-tin",
          element: <LecturerHTTT />,
        }, {
          path: "/lecturer/khoa-khoa-hoc-may-tinh",
          element: <LecturerKHMT />,
        }, {
          path: "/lecturer/khoa-mang-may-tinh-va-truyen-thong",
          element: <LecturerMMTVTT />,
        },
        {
          path: "/lecturer/khoa-truyen-thong-da-phuong-tien",
          element: <LecturerTTDPT />,
        },

      ],
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

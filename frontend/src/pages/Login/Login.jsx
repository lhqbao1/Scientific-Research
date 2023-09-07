// import { callLogin } from "../../services/api";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Checkbox, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setToken, setUserData } from "../../lib/utils";
import axios from "axios";
import "./Login.scss";
import { callGetLecturerById, callGetStudentById, callLogin } from "../../../services/api";
import { doGetAccountAction, doLoginAction } from "../../redux/account/accountSlice";
import { useDispatch } from "react-redux";
import { doGetStudentInfoAction } from "../../redux/account/studentSlice";
import { doGetLecturerInfoAction } from "../../redux/account/lecturerSlice";
import { doGetAccountLecturerAction } from "../../redux/account/accountLecturerSlice";





const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();



  // const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("CLICK");
  };

  const onFinish = async (data) => {

    const res = await callLogin(data.email, data.password)
    console.log(res.data.payload)
    if (res && res.data) {
      if (res.data.payload.user.role === 'student') {
        const resStudent = await callGetStudentById(res.data.payload.user.id)
        if (resStudent) {
          dispatch(doGetStudentInfoAction(resStudent.data.payload))
        }
        dispatch(doGetAccountAction(res.data.payload.user))

      }
      if (res.data.payload.user.role === 'Admin') {
        dispatch(doLoginAction(res.data.payload.user))

        // dispatch(doGetAccountAction(res.data.payload.user))

      }
      if (res.data.payload.user.role === 'lecturer') {
        const resLecturer = await callGetLecturerById(res.data.payload.user.id)
        if (resLecturer) {
          dispatch(doGetLecturerInfoAction(resLecturer.data.payload))
        }
        dispatch(doGetAccountLecturerAction(res.data.payload.user))
      }

      setIsLogin(true)
      setTimeout(() => {
        setIsLogin(false)
        // dispatch(doLoginAction(res.data.payload.user))
        localStorage.setItem('access_token', res.data.payload.accessToken)
        console.log(res.data.payload.user)
        if (res.data.payload.user.role === 'Admin') {
          navigate("/admin")
        }
        if (res.data.payload.user.role === 'student') {
          navigate("/student")
        }
        if (res.data.payload.user.role === 'lecturer') {
          navigate("/lecturer")
        }
      }, 1000)

    }
  };
  return (
    <div className="login-page">
      <div className="content">
        <div className="left-content"></div>
        <div className="right-content">
          <h2 className="header"> User Login</h2>
          <Form
            name="basic"
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 800,
              marginLeft: 100,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="email"
              name="email"
              className="input"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              style={{
                borderRadius: 20,
              }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="password"
              name="password"
              className="input"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              style={{
                borderRadius: 20,
              }}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                className="login-button"
                htmlType="submit"
                loading={isLogin}
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;

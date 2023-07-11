// import { callLogin } from "../../services/api";
import { useForm } from "antd/es/form/Form";
import { Button, Form, Input, Checkbox, message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setToken, setUserData } from "../../lib/utils";
import axios from "axios";
import "./Login.scss";




const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  

  // const dispatch = useDispatch();
  const onSubmit = async (data) => {
    console.log("CLICK");
  };

  const onFinish = async (data) => {
    axios
      .post("http://localhost:8080/api/auth/signin", data)
      .then((response) => {
        if (response.status === 200) {
          const { accessToken, user } = response.data.payload;
          console.log(response.data.payload)
          setUserData(user);
          setToken(accessToken);
          navigate("/admin"); 
        //   payload.onClose();
        //   reset();
        }
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("login");
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
                //  loading={isLogin}
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

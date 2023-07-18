import AdminHeader from "../../components/Admin/AdminHeader";
import {
  AppstoreOutlined,
  ContainerOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  RightCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Col, Layout, Menu, Row, Slider } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ManageStudent from "./ManageStudent";
import ManageLecturer from "./ManageLecturer";
import ManageInstructor from "./ManageInstructor";
import ManageTopic from "./ManageTopic";
import ManageSchedule from "./ManageSchedule";
import {
  clearCookie,
  getToken,
  getUserData,
  setCartCookies,
} from "../../lib/utils";
import { doGetAccountAction } from "../../redux/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [openManageSetudent, setOpenManageStudent] = useState(false);
  const [openAD, setOpenAD] = useState(true);
  const [openManageLecturer, setOpenManageLecturer] = useState(false);
  const [openManageInstructor, setOpenManageInstructor] = useState(false);
  const [openManageTopic, setOpenManageTopic] = useState(false);
  const [openManageSchedule, setOpenManageSchedule] = useState(false);


  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(state => state.account.user)
  console.log('check user', user)


  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("Dashboard", "1", <PieChartOutlined />),
    getItem("Manage user", "sub1", <UserAddOutlined />, [
      getItem("Student", "2", <RightCircleOutlined />),
      getItem("Lecturer", "3", <RightCircleOutlined />),
      getItem("Instructors", "4", <RightCircleOutlined />),
    ]),
    getItem("Manage topic", "5", <ContainerOutlined />),
    getItem("Manage council", "sub2", <UsergroupAddOutlined />, [
      getItem("Censorship council", "6", <RightCircleOutlined />),
      getItem("Acceptance council", "7", <RightCircleOutlined />),
    ]),
    getItem("Manage schedule", "8", <CalendarOutlined />),
  ];

  const onSignOut = () => {
    clearCookie();
    localStorage.removeItem('access_token')
    navigate("/login");
  };

  const openItems = (key) => {
    if (key.key === "1") {
      setOpenAD(!openAD);
      setOpenManageStudent(false);
      setOpenManageLecturer(false);
      setOpenManageInstructor(false);
      setOpenManageTopic(false);
    }
    if (key.key === "2") {
      setOpenManageStudent(!openManageSetudent);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageInstructor(false);
      setOpenManageTopic(false);
      setOpenManageSchedule(false);
    }
    if (key.key === "3") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageInstructor(false);
      setOpenManageTopic(false);
      setOpenManageSchedule(false);
      setOpenManageLecturer(!openManageLecturer);
    }
    if (key.key === "4") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageTopic(false);
      setOpenManageSchedule(false);
      setOpenManageInstructor(!openManageInstructor);
    }
    if (key.key === "5") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageInstructor(false);
      setOpenManageSchedule(false);
      setOpenManageTopic(!openManageTopic);
    }
    if (key.key === "8") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageInstructor(false);
      setOpenManageTopic(false);
      setOpenManageSchedule(!openManageSchedule);
    }
  };
  return (
    <div>
      <Layout>
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        <Layout>
          <Sider
            onCollapse={(value) => setCollapsed(value)}
            collapsible
            collapsed={collapsed}
            width={300}
            style={{
              backgroundColor: "#efefef",
              marginLeft: -8,
            }}
          >
            <Menu
              onClick={(item, key, keyPath, domEvent) =>
                openItems(item, key, keyPath, domEvent)
              }
              style={{ height: 898 }}
              defaultSelectedKeys={["1"]}
              mode="inline"
              inlineCollapsed={collapsed}
              items={items}
            />
          </Sider>
          <Layout
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              marginRight: -8,
            }}
          >
            <Content>
              {/* <h1>
                {userData.firstName} {userData.lastName} dang dang nhap
              </h1>
              <Button onClick={() => onSignOut()}>Đăng xuất</Button> */}
              <div
                style={{
                  padding: 20,
                  minHeight: 150,
                  backgroundColor: "white",
                }}
              >
                {openAD === true ? <AdminDashboard /> : ""}
                {openManageSetudent === true ? <ManageStudent /> : ""}
                {openManageLecturer === true ? <ManageLecturer /> : ""}
                {openManageInstructor === true ? <ManageInstructor /> : ""}
                {openManageTopic === true ? <ManageTopic /> : ""}
                {openManageSchedule === true ? <ManageSchedule /> : ""}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminPage;

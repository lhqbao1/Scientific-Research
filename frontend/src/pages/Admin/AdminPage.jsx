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
import { Breadcrumb, Button, Col, Layout, Menu, Row, Slider, notification } from "antd";
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
import ManageExplanation from "./ManageExplanation";
import ManageAcceptance from "./ManageAcceptance";
import ManageDocument from "./ManageDocument";

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [openManageSetudent, setOpenManageStudent] = useState(false);
  const [openAD, setOpenAD] = useState(true);
  const [openManageLecturer, setOpenManageLecturer] = useState(false);
  const [openManageAdvisor, setOpenManageAdvisor] = useState(false);
  const [openManageTopic, setOpenManageTopic] = useState(false);
  const [openManageSchedule, setOpenManageSchedule] = useState(false);
  const [openManageExplanation, setOpenManageExplanation] = useState(false);
  const [openManageAcceptance, setOpenManageAcceptance] = useState(false);
  const [openManageDocument, setOpenManageDocument] = useState(false);

  const [userInfo, setUserInfo] = useState()

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector(state => state.accountAdmin.user)
  const subRole = useSelector(state => state.accountAdmin.user.subRole)

  useEffect(() => {
    setUserInfo(user)
    if (subRole === 'admin-ctu') {
      setOpenAD(false)
      setOpenManageTopic(true)
    }
    // console.log(subRole)
  }, [subRole])


  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  let items = []
  if (subRole === 'admin-ctu') {
    items = [
      getItem("Quản lý đề tài", "5", <ContainerOutlined />),
      getItem("Quản lý thông báo", "8", <CalendarOutlined />),
    ];
  }
  if (subRole === 'admin') {
    items = [
      getItem("Trang chủ", "1", <PieChartOutlined />),
      getItem("Quản lý người dùng", "sub1", <UserAddOutlined />, [
        getItem("Sinh viên", "2", <RightCircleOutlined />),
        getItem("Giảng viên", "3", <RightCircleOutlined />),
      ]),
      getItem("Quản lý đề tài", "5", <ContainerOutlined />),
      getItem("Quản lý hội đồng", "sub2", <UsergroupAddOutlined />, [
        getItem("Hội đồng thuyết minh", "6", <RightCircleOutlined />),
        getItem("Hội đồng nghiệm thu", "7", <RightCircleOutlined />),
      ]),

    ];
  }


  const onSignOut = () => {
    clearCookie();
    localStorage.removeItem('access_token')
    navigate("/login");
  };

  const openItems = (key) => {
    // console.log('ascsac', key)
    if (key.key === "1") {
      setOpenAD(!openAD);
      setOpenManageStudent(false);
      setOpenManageLecturer(false);
      setOpenManageAdvisor(false);
      setOpenManageTopic(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
    }
    if (key.key === "2") {
      setOpenManageStudent(!openManageSetudent);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageAdvisor(false);
      setOpenManageTopic(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
      setOpenManageSchedule(false);
    }
    if (key.key === "3") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageAdvisor(false);
      setOpenManageTopic(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
      setOpenManageSchedule(false);
      setOpenManageLecturer(!openManageLecturer);
    }
    if (key.key === "4") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
      setOpenManageTopic(false);
      setOpenManageSchedule(false);
      setOpenManageAdvisor(!openManageAdvisor);
    }
    if (key.key === "5") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageAdvisor(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
      setOpenManageSchedule(false);
      setOpenManageTopic(!openManageTopic);
    }
    if (key.key === "6") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageAdvisor(false);
      setOpenManageSchedule(false);
      setOpenManageTopic(false);
      setOpenManageExplanation(!openManageExplanation)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)

    }
    if (key.key === "7") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageAdvisor(false);
      setOpenManageSchedule(false);
      setOpenManageTopic(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(!openManageAcceptance)
      setOpenManageDocument(false)

    }
    if (key.key === "8") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
      setOpenManageAdvisor(false);
      setOpenManageTopic(false);
      setOpenManageSchedule(!openManageSchedule);
    }
    if (key.key === "9") {
      setOpenManageStudent(false);
      setOpenAD(false);
      setOpenManageLecturer(false);
      setOpenManageExplanation(false)
      setOpenManageAcceptance(false)
      setOpenManageDocument(false)
      setOpenManageAdvisor(false);
      setOpenManageTopic(false);
      setOpenManageSchedule(false);
      setOpenManageDocument(!openManageDocument)
    }
  };
  return (
    <div>
      <Layout >
        <AdminHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />

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
                {openManageAdvisor === true ? <ManageInstructor /> : ""}
                {openManageTopic === true ? <ManageTopic /> : ""}
                {openManageSchedule === true ? <ManageSchedule /> : ""}
                {openManageAcceptance === true ? <ManageAcceptance /> : ""}
                {openManageDocument === true ? <ManageDocument /> : ""}

                {openManageExplanation === true ? <ManageExplanation
                  openManageExplanation={openManageExplanation}
                  setOpenManageExplanation={setOpenManageExplanation}
                  openManageLecturer={openManageLecturer}
                  setOpenManageLecturer={setOpenManageLecturer}
                /> : ""}
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminPage;

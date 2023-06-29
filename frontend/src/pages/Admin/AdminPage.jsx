import AdminHeader from "../../components/Admin/AdminHeader"
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
    RightCircleOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Col, Layout, Menu, Row, Slider } from 'antd';
import { useState } from 'react';
import AdminDashboard from "./AdminDashboard";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import ManageStudent from "./ManageStudent";


const AdminPage = () => {

    const [collapsed, setCollapsed] = useState(true);
    const [openManageSetudent, setOpenManageStudent] = useState(false)
    const [openAD, setOpenAD] = useState(true)


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
        getItem('Dashboard', '1', <PieChartOutlined />),
        getItem('Manage user', 'sub1', <UserAddOutlined />, [
            getItem('Student', '2', <RightCircleOutlined />),
            getItem('Lecturer', '3', <RightCircleOutlined />),
            getItem('Instructors', '4', <RightCircleOutlined />),
        ]),
        getItem('Manage topic', '5', <ContainerOutlined />),
        getItem('Manage council', 'sub2', <UsergroupAddOutlined />, [
            getItem('Censorship council', '6', <RightCircleOutlined />),
            getItem('Acceptance council', '7', <RightCircleOutlined />),
        ]),

    ];

    const openItems = (key) => {
        if (key.key === '1') {
            setOpenAD(!openAD)
            console.log(openAD)
            setOpenManageStudent(false)
        }
        if (key.key === '2') {
            setOpenManageStudent(!openManageSetudent)
            setOpenAD(false)
            console.log(openManageSetudent)
        }
    }
    return (
        <div>
            <Layout >

                <AdminHeader
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <Layout>
                    <Sider
                        onCollapse={(value) => setCollapsed(value)}
                        collapsible
                        collapsed={collapsed}
                        width={300}
                        style={{
                            backgroundColor: '#efefef',
                            marginLeft: -8,
                        }}
                    >
                        <Menu
                            onClick={(item, key, keyPath, domEvent) => openItems(item, key, keyPath, domEvent)}
                            style={{ height: 898 }}
                            defaultSelectedKeys={['1']}
                            mode="inline"
                            inlineCollapsed={collapsed}
                            items={items}
                        />
                    </Sider>
                    <Layout
                        style={{
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginRight: -8
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
                                {openAD === true ? <AdminDashboard /> : ''}
                                {openManageSetudent === true ? <ManageStudent /> : ''}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

        </div >
    )
}

export default AdminPage
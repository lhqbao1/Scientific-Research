import './AdminHeader.scss'
import { DownOutlined, MenuOutlined, UserOutlined, } from '@ant-design/icons';
import { Row, Col, Avatar, Space, Dropdown, message } from 'antd'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { useNavigate } from 'react-router-dom';
import { doClearAdminInfo } from '../../redux/account/accountAdminSlide';



const AdminHeader = (props) => {

    const { collapsed, setCollapsed, userInfo, setUserInfo } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const openCollapsed = () => {
        setCollapsed(!collapsed)
        console.log(collapsed)
    }

    const itemsDropdown = [
        {
            label: <label style={{ cursor: 'pointer' }}>Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];

    const handleLogout = () => {
        dispatch(doLogoutAction())
        dispatch(doClearAdminInfo())
        navigate('/login')
    }




    return (
        <div className="admin-header-container">
            <div className="admin-header-page">
                <Row >
                    <Col span={21}>
                        <div className='admin-header-left'>
                            <MenuOutlined
                                style={{ marginTop: 25, marginRight: 95, fontSize: 18 }}
                                onClick={openCollapsed}
                            />
                            <div style={{ marginTop: 23, fontSize: 18, fontWeight: 600 }}>ADMIN PAGE</div>
                        </div>
                    </Col>

                    <Col span={3}>
                        <div>
                            <UserOutlined style={{ fontSize: 20, marginTop: 25, marginRight: 10 }} />
                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {/* <Avatar size="large" src={userAvatar} /> */}
                                        <span style={{ fontSize: 16 }}>Hi, Admin!</span>
                                        {/* <DownOutlined /> */}
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Col>

                </Row>

            </div>
        </div>
    )
}

export default AdminHeader
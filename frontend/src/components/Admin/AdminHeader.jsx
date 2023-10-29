import './AdminHeader.scss'
import { DownOutlined, MenuOutlined, UserOutlined, } from '@ant-design/icons';
import { Row, Col, Avatar, Space, Dropdown, message } from 'antd'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { useNavigate } from 'react-router-dom';
import { doClearAdminInfo } from '../../redux/account/accountAdminSlide';



const AdminHeader = (props) => {

    const { collapsed, setCollapsed, userInfo, setUserInfo } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector(state => state.accountAdmin.user)

    let user = ''

    if (admin?.subRole === 'admin') {
        user = 'CIT'
    }
    if (admin?.subRole === 'admin-ctu') {
        user = 'CTU'
    }
    const openCollapsed = () => {
        setCollapsed(!collapsed)
    }

    const itemsDropdown = [
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
                        </div>
                    </Col>

                    <Col span={3}>
                        <div>
                            <UserOutlined style={{ fontSize: 20, marginTop: 25, marginRight: 10 }} />
                            <Dropdown menu={{ items: itemsDropdown }} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <span style={{ fontSize: 16 }}>{user}</span>
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
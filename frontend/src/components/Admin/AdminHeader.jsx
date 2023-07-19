import './AdminHeader.scss'
import { MenuOutlined, UserOutlined, } from '@ant-design/icons';
import { Row, Col } from 'antd'
import { useState } from 'react';


const AdminHeader = (props) => {

    const { collapsed, setCollapsed, userInfo, setUserInfo } = props

    const openCollapsed = () => {
        setCollapsed(!collapsed)
        console.log(collapsed)
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
                            <span style={{ fontSize: 16 }}>Hi, {userInfo?.firstName}!</span>
                        </div>
                    </Col>

                </Row>

            </div>
        </div>
    )
}

export default AdminHeader
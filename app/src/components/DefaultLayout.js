import React from "react";
import './../resources/defaultlayout.css'
import { Button, Dropdown } from "antd";
import { Link , useNavigate } from "react-router-dom";
import { UserOutlined  } from '@ant-design/icons';

function DefaultLayout(props) {
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('resumeit-user'))
    const items = [
        {
          key: '1',
          label: (
            <Link to="/home">Home</Link>
          ),
        },
        {
          key: '2',
          label: (
            <Link to="/profile">Profile</Link>
          ),
        },
        {
          key: '3',
          label: (
            <span  onClick={()=> {
                sessionStorage.removeItem('resumeit-user')
                navigate('/login')
            }}>
              Logout
            </span>
          ),
        },
      ];

    return (
        <div className="layout">
            <div className="header">
                <h1 onClick={()=>navigate('/home')} style={{cursor:'pointer'}}>Resume-it</h1>
                <Dropdown menu={{items,}}placement="bottomLeft">
                    <Button icon={<UserOutlined/>}> {user.username} </Button>  
                </Dropdown>
                    
            </div>
            <div className="content" style={{overflow:'scroll'}}>
                {props.children}
            </div>

        </div>
    )
}
export default DefaultLayout
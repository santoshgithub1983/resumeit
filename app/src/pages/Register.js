import React , {useEffect, useState} from "react";
import { Button, Form, Input, message , Spin } from 'antd';
import '../resources/authentication.css'
import {Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from "js-cookie";


function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish= async(values)=>{
        console.log(values)
        setLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/register` , values)
            message.success('Registration Successful')
            setLoading(false)
        } catch (error){
            setLoading(false)
            message.error('Registration Failed')
        }
    };

    useEffect(()=>{
        if(Cookies.get('resumeit-user'))
        {
            navigate('/home')
        }
      })

    return (
        <div className="auth-parent">
        {loading && (<Spin size="large"/>)}
        <div className="banner">
            <img 
                src={`${process.env.PUBLIC_URL}/Resume-it-logo.png`} 
                alt="Resume-it &copy;" />
        </div>

        <div className="desc-section container-md">
        <div className="content desc-content">
        <h2 className="h2-text"> Take your resume to next level  </h2>
        <li>CHOOSE YOUR RESUME TEMPLATE</li>
        <li>SHOW WHAT YOU'RE MADE OF</li>
        <li>START IMPRESSING EMPLOYERS</li>
         </div>
        </div>

        <Form layout='vertical' onFinish={onFinish}>
            <h1>Register</h1>
            <hr></hr>
                <Form.Item name='username' label='Username'>
                <Input placeholder=""/>

                </Form.Item>
                <Form.Item name='password' label='Password'>
                <Input type="password"/>

                </Form.Item>
                <Form.Item name='cusername' label='Confirm Password'>
                <Input type="password"/>

                </Form.Item>
                <div className="d-flex align-items-center justify-content-between">
                    <Link to='/login'>Click here to Login</Link>
                </div>
                <Button type='primary' htmlType="submit">REGISTER</Button>
        </Form>
        <div className="page-wrapper"></div>
        <footer>
        <p>&copy; 2023 Tech enthusiast. All rights reserved.</p>
            </footer>
       </div>
       
    )

}
export default Register
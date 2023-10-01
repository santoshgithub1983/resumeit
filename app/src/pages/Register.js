import React , {useEffect, useState} from "react";
import { Button, Form, Input, message , Spin } from 'antd';
import '../resources/authentication.css'
import {Link , useNavigate } from 'react-router-dom'
import axios from 'axios'


function Register() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish= async(values)=>{
        console.log(values)
        setLoading(true)
        try {
            await axios.post('api/user/register' , values)
            message.success('Registration Successful')
            setLoading(false)
        } catch (error){
            setLoading(false)
            message.error('Registration Failed')
        }
    };

    useEffect(()=>{
        if(localStorage.getItem('smart-resume-user'))
        {
            navigate('/home')
        }
      })

    return (
        <div className="auth-parent">
        {loading && (<Spin size="large"/>)}
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
       </div>
    )

}
export default Register
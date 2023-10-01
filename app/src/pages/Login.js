import React , {useEffect, useState} from "react";
import { Button, Form , Input , message , Spin} from 'antd';
import '../resources/authentication.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish= async(values)=>{
        console.log(values)
        setLoading(true)
        try {
            const user  = await axios.post('api/user/login' , values)
            message.success('Login Successful')
            localStorage.setItem('smart-resume-user', JSON.stringify(user.data))
            setLoading(false)
            navigate('/')
        } catch (error){
            setLoading(false)
            message.error('Login Failed')
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
            <h1>Login</h1>
            <hr></hr>
                <Form.Item name='username' label='Username'>
                <Input placeholder=""/>

                </Form.Item>
                <Form.Item name='password' label='Password'>
                <Input type="password"/>
                </Form.Item>
                <div className="d-flex align-items-center justify-content-between">
                    <Link to='/register'>Don't have account yet ?, Click here to register</Link>
                </div>
                <Button type='primary' htmlType="submit">LOGIN</Button>
        </Form>
       </div>
    )
}
export default Login
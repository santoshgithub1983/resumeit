import React , {useEffect, useState} from "react";
import { Button, Form , Input , message , Spin} from 'antd';
import '../resources/authentication.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const onFinish= async(values)=>{
        // console.log(values)
        setLoading(true)
        try {
            const user  = await axios.post('api/user/login' , values)
            message.success('Login Successful')
            sessionStorage.setItem('resumeit-user', JSON.stringify(user.data))
            setLoading(false)
            navigate('/')           
        } catch (error){
            setLoading(false)
            message.error('Login Failed')
        }
    };

  useEffect(()=>{
    if(sessionStorage.getItem('resumeit-user'))
    {
        navigate('/home')
    }
  })
    return (
        
        <div className="auth-parent">
        {loading && (<Spin size="large"/>)}
        <div className="banner">
            <img src="src/pages/templates/Resume-it-logo.png" alt="Resume-it &copy;" />
        </div>

        <div className="desc-section container-md">
        <div className="content desc-content">
        <h2 className="h2-text"> Professional resumes approved by recruiters and loved by job seekers</h2>
        <p className="desc-para"> Land your next interview with a high-quality resume that’s perfectly formatted and easy to customize. With Resume-it’s builder, you can make a beautifully-designed, expert-backed document in minutes!</p>
        </div>
        {/* <h3 className="h3-text"> Professional resumes approved by recruiters and loved by job seekers</h3> */}
        </div>

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
        <div className="page-wrapper"></div>
        <footer>
        <p>&copy; 2023 Tech enthusiast. All rights reserved.</p>
            </footer>

       
     
       </div>
    )
}
export default Login
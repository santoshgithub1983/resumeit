import React , {useEffect, useState} from "react";
import { Button, Form , Input , message , Spin } from 'antd';
import '../resources/authentication.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from "js-cookie";

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
// Determine the current environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Define the base URL
let baseURL;
if (isDevelopment) {
    console.log(`Running in env...${process.env.NODE_ENV}`)
  // In development, use the local development server
  baseURL = 'http://localhost:8888';
} else {
  // In production, use the deployed site's domain
  baseURL = ''; // Use an empty string for the same domain
  if (baseURL) {
    // Perform actions when baseURL 
    // For example, parse the JSON data or use it in some way
} else {
    // Handle the case when baseURL is empty (or not found)
}
  // If the API is on a different domain, specify it here (e.g., 'https://api.example.com')
}
axios.defaults.baseURL = '/';

    const onFinish= async(values)=>{
        // console.log(values)
        setLoading(true)
        try {
            const user  = await axios.post(`/.netlify/functions/nodeserverfn_login` , (values))
            message.success('Login Successful')
            //sessionStorage.setItem('resumeit-user', JSON.stringify(user.data))
            Cookies.set('resumeit-user', JSON.stringify(user.data))
            setLoading(false)
            navigate('/')           
        } catch (error){
            setLoading(false)
            message.error('Login Failed')
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
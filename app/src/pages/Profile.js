import React , { useState } from "react";
import DefaultLayout from '../components/DefaultLayout'
import { Form, Tabs , message , Spin , Button} from 'antd';
import PersonalInfo from '../components/PersonalInfo';
import SkillsEducation from '../components/SkillsEducation';
import ExperienceProjects from '../components/ExperienceProjects';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const { TabPane } = Tabs;
function Profile() {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('smart-resume-user'));
    const onFinish= async (values) => {
        setLoading(true);
        try {
            console.log('inside try block of update api...')
            const result  = await axios.post("api/user/update" , { ...values, _id : user._id});
            setLoading(false);
            message.success("Profile Updated Successfully");
            localStorage.setItem('smart-resume-user' , JSON.stringify(result.data))
        } catch (error){
            setLoading(false);
            message.error('Update Failed');
        }
    };

  return (
    <DefaultLayout>
    {loading && (<Spin size="large"/>)}
       <div className="update-profile">
        <h4><b>Update Profile</b></h4>
        <hr></hr>
        <Form layout='vertical' onFinish={onFinish} initialValues={user}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Personal Info" key="1">
                    <PersonalInfo/>
                </TabPane>
                <TabPane tab="Skills & Education" key="2">
                   <SkillsEducation/>
                </TabPane>
                <TabPane tab="Experience / Projects" key="3">
                    <ExperienceProjects/>
                </TabPane>
            </Tabs>
            <Button type='primary' htmlType="submit">UPDATE</Button>
        </Form>
        </div>
    </DefaultLayout>
  )
 
}


export default Profile
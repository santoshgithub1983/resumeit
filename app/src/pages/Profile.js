import React , { useState  } from "react";
import DefaultLayout from '../components/DefaultLayout'
import { Form, Tabs , message , Spin , Button} from 'antd';
import PersonalInfo from '../components/PersonalInfo';
import SkillsEducation from '../components/SkillsEducation';
import ExperienceProjects from '../components/ExperienceProjects';
import axios from 'axios';
import Cookies from 'js-cookie';


const { TabPane } = Tabs;
function Profile() {

    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate()
    //const user = JSON.parse(sessionStorage.getItem('resumeit-user'));
    const userDataString = Cookies.get('resumeit-user');
    const user = JSON.parse(userDataString)
    const onFinish= async (values) => {
        setLoading(true);
        try {
            // console.log('inside try block of update api...')
            const result  = await axios.post('/.netlify/functions/nodeserverfn_profile' , { ...values, _id : user._id, withCredentials: false});
            setLoading(false);
            message.success("Profile Updated Successfully");
           // sessionStorage.setItem('resumeit-user' , JSON.stringify(result.data))
           // console.log(result.data)
            Cookies.set('resumeit-user' , JSON.stringify(result.data))    // save data to cookie
          //  console.log(Cookie.get('resumeit-user'))
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
                <TabPane tab="Personal Info" key="1" >
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
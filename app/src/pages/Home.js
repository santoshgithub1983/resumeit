import React from "react";
import DefaultLayout from "../components/DefaultLayout";
import templateimg from './templates/template1.png'
import template2img from './templates/template2.png'
import './templates/'
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate()
    const templates =[
        {
        title: 'Simple Resume',
        image:templateimg,
        },
        {
        title: 'Highlighted Sections Resume',
        image:template2img,
        }
] 
    return (
        <DefaultLayout>
            <div className="row home">
                {
                    templates.map((template , index)=>{
                        return <div className="col-md-4">
                            <div className="template">
                                <img src={template.image} height='500' width='100%' alt="" />
                                <div className="text" color="white">
                                    <p>{template.title}</p>
                                    <button onClick={()=>navigate(`/templates/${index+1}`)}>BUILD YOUR RESUME NOW</button>
                                </div>
                                </div>
                            </div>;
                    })
                }
            </div>
        </DefaultLayout>
    )
}
export default Home
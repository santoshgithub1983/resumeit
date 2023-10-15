import React from 'react'
import '../../resources/templates.css'
import Cookies from 'js-cookie';

function Template1() {
    const userDataString = Cookies.get('resumeit-user');
    const user = JSON.parse(userDataString);
    return (
        <div className='template1-parent'>
            <div className="top d-flex justify-content-between">
                <h1>{user.firstName.toUpperCase()} {user.lastName.toUpperCase()}</h1>
                <div>
                    <p>{user.email}</p>
                    <p>{user.address}</p>
                    <p>{user.mobileNumber}</p>
                </div>
               
            </div>
            <div className='divider mt-5'/>
            <div className='objective mt-5'>
                <h3>Objective</h3>
                <hr></hr>
                <p>{user.careerObjective}</p>
            </div>

            <div className='divider mt-5'></div>
            <div className='education mt-5'>
                <h3>Education</h3>
                <hr />
                {user.education.map((education) => {
                    return ( <div className='d-flex allign-items-center'>
                            <p><b> {education.range} : </b><b>{education.qualification}</b> with <b>{education.percentage}</b><b>%</b> from {" "}{education.institution}</p>
                            </div> );
            })}
            </div>

            <div className='divider mt-5'></div>
            <div className='experience mt-5'>
                <h3>Experience</h3>
                <hr />
                {user.experience.map((exp) => {
                    return ( <div className='d-flex allign-items-center'>
                            <p> <b>{exp.range} {" "}</b> :     <b>{exp.orgnization}</b> in <b>{exp.place}</b></p>
                            </div> );
            })}
            </div>    

            <div className='divider mt-5'></div>
            <div className='projects mt-5'>
                <h3>Projects</h3>
                <hr />
                {user.projects.map((project) => {
                    return ( <div className='d-flex flex-column'>
                            <h6 >
                                <b>{project.title} [ {project.range} ]: </b>
                            </h6>
                            <p>
                                {project.description}
                            </p>
                            <hr></hr>
                            </div> );
            })}
            </div>    

            <div className='divider mt-5'></div>
            <div className='skills mt-5'>
                <h3>Skills</h3>
                <hr />
                {user.skills.map((skill) => {
                    return ( 
                            <p>
                            {skill.technology}
                            </p>
                        );
                    
            })}
            </div>   

        </div>
    )
}

export default Template1
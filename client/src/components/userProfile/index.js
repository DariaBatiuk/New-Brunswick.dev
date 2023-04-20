
import {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './index.css';
import Icons from '../icons';
const UserProfile = ({profileData}) => {





    return (
        <div className='columns is-multiline'>
          <div className='column is-5 is-flex is-justify-content-center'>
          <div className='columns is-multiline is-align-items-center'>
                    <div className='column is-12 is-flex is-justify-content-center text'>
                    {profileData.website  &&  profileData.website.map((link , index) => (
             
                  <a href={link} key={index} className='m-2'>
                    <Icons link={link} />
                </a>
              
                
            )
            )}
                    </div>
            </div>
          </div>
            <div className='column is-2  is-flex is-justify-content-center'>
                <div className='columns is-multiline is-align-items-center'>
                    <div className='column is-12 is-flex is-justify-content-center'>
                       <img src={profileData.image} width='150px' height='150px' alt="profile" />
                    </div>
                    <div className='column is-12 is-flex is-justify-content-center text'>
                        <p>{profileData.name}</p>
                    </div>
            </div>
            </div>

          <div className='column is-5 is-flex is-justify-content-center'>
          <div className='columns is-multiline is-align-items-center'>
          <div className='column is-12 is-flex is-justify-content-center text'>
                        <p>{profileData.bio}</p>
                    </div>
                  
            </div>


          </div>

          <div className="column is-12 is-flex is-justify-content-center">
            {profileData.skills  &&  profileData.skills.map((skill , index) => (
                <div key={index} className="m-2 tag is-info is-rounded">
                <p className='p-1'>{skill}</p>
                </div>
                
            )
            )}

            
          </div>      
        </div>


    );
}

export default UserProfile;
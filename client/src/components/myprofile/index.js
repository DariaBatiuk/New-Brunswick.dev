
import EditableText from "../editableText"
import {useEffect, useState} from "react"
import { GoCheck } from 'react-icons/go';
import HandleArray from "../../components/handleArray";
import "./index.css"

const MyProfile = ({ profileData }) => {



const [profile, setProfile] = useState({
    name:   '',   
    website: [],
    image: '',
    bio : '',
    skills: []
})

const [hasChanged, setHasChanged] = useState(false)

useEffect(() => {
    setProfile({
        name: profileData.name,
        website: profileData.website,
        image: profileData.image,
        skills: profileData.skills,
        bio: profileData.bio
    })
}, [profileData])  


function handleState(fieldName, value) {
    setProfile({
      ...profile,
      [fieldName]: value
    });
    setHasChanged(true)
  }









function handleSave() {
  // save to database
  fetch(`http://localhost:3003/api/users/${profileData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: profile.name,
      website: profile.website,
      skills: profile.skills,
      bio: profile.bio
    })
  })
  alert("Profile updated!")
  window.location.reload()
}


return (
<div  id="btnPosition">
{hasChanged && <GoCheck className="button is-info" id="save" onClick={handleSave} />}
    <div  className="columns is-multiline">
      <div className="column is-5 is-flex is-justify-content-center ">
      <div className="columns  is-multiline is-align-items-center">
 
 <div className="column is-12 is-flex is-justify-content-center" id="bio">
     <div className="colums">
       <div className="column is-12 has-text-centered is-size-4 has-text-white has-text-weight-semibold">Social Links</div>
     <div className="column is-12 inputfield">
 <HandleArray dataArray={profile.website}   updateParentState={handleState} fieldName="website" htmlEl="input" Btn="Add a link"/>
 </div>
 </div>
     </div>
   
</div>
  </div>


<div className="column is-2 is-flex is-align-items-center is-justify-content-center">
  <div className="columns is-multiline">
    <div className="column is-12 is-flex is-justify-content-center">
      
     <img src={profile.image} alt="..."  width='150px' height="150px"/> 

  </div>
  <div className="column is-12 is-flex is-justify-content-center inputfield">
    <EditableText text={profile.name} updateParentState={handleState} fieldName="name"/>
        </div>
  </div>
  </div>
  <div className="column is-5 is-flex is-justify-content-center">
  <div className="columns  is-multiline is-align-items-center">
 
    <div className="column is-12 is-flex is-justify-content-center" id="bio">
        <div className="colums">
          <div className="column is-12 has-text-centered is-size-4 has-text-white has-text-weight-semibold"> Bio</div>
        <div className="column is-12">
    <EditableText text={profile.bio} updateParentState={handleState} fieldName="bio" htmlEl="textarea"/>
    </div>
    </div>
        </div>
      
  </div>
    </div>
    </div>
    <div className="column is-12 is-flex is-justify-content-center inputfield">
         <HandleArray dataArray={profile.skills} updateParentState={handleState} fieldName="skills" Btn="Add Skills" /> 
         </div>   
    </div>
    
)

}




export default MyProfile
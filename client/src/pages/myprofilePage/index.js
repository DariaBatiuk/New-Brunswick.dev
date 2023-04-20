import MyProfile from "../../components/myprofile";
import SmallPost from "../../components/smallPost";
import React ,{useState , useEffect ,useContext} from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
const MyProfilePage = () => {
    const userData = useContext(UserContext);
    const [profileData, setProfileData] = useState({});






    useEffect(() => {
        if (userData) {
         fetch(`http://localhost:3003/api/users/${userData.id}`)
        .then(response => response.json())
        .then(data => setProfileData(data))
        .catch(error => console.log(error))
        }
      }, [userData])

    return (
        <div id='parent'>
        <MyProfile profileData={profileData} />
        <div className="columns is-multiline">
        {profileData.Projects && profileData.Projects.map(data => (
            <div className="column is-12" key={data._id}>
                {/* <Link to={`/myprofile/edit/${data._id}`}> */}
            <SmallPost postData={data} user={profileData} />
            {/* </Link> */}
            </div>
        ))}
        </div>
        </div>

    )
}

export default MyProfilePage;
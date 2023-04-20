

    import UserProfile from "../../components/userProfile";
    import SmallPost from "../../components/smallPost";
    import React, { useState, useEffect } from 'react';
    import { Link, Navigate } from 'react-router-dom';

    import { useParams } from 'react-router-dom';

  

    const UserProfilePage = () => {

        const [profileData, setProfileData] = useState({});


        const [error, setError] = useState(null);

        const { id } = useParams();

        useEffect(() => {
       
            fetch(`http://localhost:3003/api/users/${id}`)
                .then(response => response.json())
                .then(data => setProfileData(data))
                .catch(error => setError(error))
         
        }, [])
        // useEffect(() => {
        //     console.log(profileData)
        // }, [profileData])

          if (error) {
            return <Navigate to="/404" />;
          }

        return (
            <div id='parent'>
            <UserProfile profileData={profileData} />
            <div className="columns is-multiline">
            {profileData.Projects  && profileData.Projects.map((data, index) => (
            <div className="column is-12" key={index}>
                <Link to={`/post/${data._id}`}>
            <SmallPost postData={data} />
            </Link>
            </div>
        ))}
        </div>
            </div>

        )

            }

    export default UserProfilePage;
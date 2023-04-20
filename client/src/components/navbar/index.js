import React , {useState , useEffect ,useContext  } from "react";
import { Link , useLocation  } from "react-router-dom";
import {AiOutlineSearch} from "react-icons/ai"
import "./index.css"
import { UserContext } from '../../App';
import LoginBtn from "../loginBtn";
import logo from '../../assets/Screenshot_2023-04-07_at_12.07.36_AM.png'


const Nav = () => {

const [activePath, setActivePath] = useState("")
// const [newPost, setNewPost] = useState(false)

const { pathname } = useLocation()

useEffect(() => {
  setActivePath(pathname)
  // setNewPost(false)
}, [pathname])

const userData = useContext(UserContext);

const handleLogout = () => {
  window.open("http://localhost:3003/auth/logout", "_self");
};




    return (
      <div>
        <nav className="navbar is-fixed-top" id="nav">
            <div id="leftNav">
            <Link to="/" className="mr-2">
                <img src={logo} 
                className={activePath === "/" ? "navItemActive" : null }/>
            </Link> 
            {/* {activePath === "/" ? (<div className="field has-addons">
  <div className="control is-expanded">
    
    <input className="input is-rounded" type="text" id="searchBar" placeholder="Search..."/>
  </div>
  <div className="control">
    <button className="button is-info is-rounded">
      <AiOutlineSearch/>
    </button>
  </div>
</div>)  : null} */}

           </div>
           <div id='rightNav'>

          
     
       {userData ? (
          <div>
         <button className="button is-rounded is-info mr-2" onClick={handleLogout}> Logout </button>
         <Link to="/new" className='button is-rounded is-info mr-2' id='newPostButton'>
             Create Post
          </Link>
             <Link to="/myprofile">
             <img src={userData?.image}  className={activePath === "/myprofile" ? "navItemActive" : null }  />
          </Link>
          </div>
        ) : (
          <LoginBtn />
            )}

            
         
            </div>
          

      </nav>

      
      {/* {newPost &&  <NewPost setFalse={setNewPost}/>} */}
      </div>
    );
};

export default Nav;







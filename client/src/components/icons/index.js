

import { 
    FaLinkedin, 
    FaGithub, 
    FaTwitter, 
    FaFacebook, 
    FaInstagram, 
    FaYoutube, 
    FaTwitch, 
    FaReddit 
  } from 'react-icons/fa';

const Icons = ({link}) => {
    switch (true) {
      case link.includes('linkedin'):
        return <FaLinkedin className="icon"  />;
      case link.includes('github'):
        return <FaGithub className="icon"/>;
      case link.includes('twitter'):
        return <FaTwitter className="icon" />;
      case link.includes('facebook'):
        return <FaFacebook className="icon" />;
      case link.includes('instagram'):
        return <FaInstagram className="icon" />;
      case link.includes('youtube'):
        return <FaYoutube className="icon" />;
      case link.includes('twitch'):
        return <FaTwitch className="icon" />;
      case link.includes('reddit'):
        return <FaReddit className="icon" />;
      default:
        return <div className='tag is-info is-rounded'>{link}</div>;
    }
  };
  
  export default Icons;
import React , {useEffect , useState , createContext} from 'react';
import Home from './pages/home';
import SinglePost from './pages/singlePost';
import MyProfilePage from './pages/myprofilePage';
import Nav from './components/navbar';
import StartTop from './utils/autoStartTop';
import Error404 from './pages/404';
import EditPost from './pages/editPostPage'; 
import NewPost from './pages/newPost';
import UserProfilePage from './pages/userProfilePage';
import LoginPage from './pages/loginPage';
import Modal from './components/modal/modal';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const UserContext = createContext();
export const NewsContext = createContext();
export const PageContext = createContext();


function App() {

    const [userData, setUserData] = useState(null)
    const [modal , setModal] = useState(false);

    function modalFunction() {
      setModal(!modal);
    }

    useEffect(() => {
      console.log('modal', modal);
    }, [modal])

    const [newsData, setNewsData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
  
    if (pageNumber < 1) {
      setPageNumber(1);
    }
    
  useEffect(() => {
   const getUser = async () => {
    fetch('http://localhost:3003/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true}
      })
      .then
      (response => {
        if (response.status === 200) return response.json();
        throw new Error('failed to authenticate user');
      }
      ).then(responseJson => {
        setUserData(responseJson.user);
      }
      ).catch(error => {
        console.log(error);
      }
      );

    }
    getUser();
}, [])

useEffect(() => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com'
    }
  };
  
  fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=javascript%20react&pageNumber=${pageNumber}&pageSize=10&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null`, options)
    .then(response => response.json())
    .then(response => setNewsData(response.value))
    .catch(err => console.error(err));
}, [pageNumber])


  return (

<UserContext.Provider value={userData}>
<NewsContext.Provider value={newsData}>
  <PageContext.Provider value={{pageNumber , setPageNumber}}>

  <Router>
    <StartTop/>
  <Nav/>
  <Modal
  isModal={modalFunction} 
  isWidget={modal}
  />
      <Routes>
        <Route 
          path="/" 
          element={<Home/>}
        />


        <Route path='/post/:id'
        element={<SinglePost/>}/>

        <Route path='/myprofile' element={<MyProfilePage/>}/>
      <Route path='/myprofile/edit/:id' element={<EditPost/>}/>

      <Route path='/profile/:id' element={<UserProfilePage/>}/>
      <Route path='/new' element={<NewPost/>}/>
      {/* <Route path='/welcome' element={<OnBoarding/>}/> */}
      {/* <Route path='/login' element={<LoginPage/>}/> */}
        <Route path='*' exact={true} element={<Error404/>} />
      </Routes>


 
</Router>
</PageContext.Provider>
</NewsContext.Provider>
</UserContext.Provider>
  )
}

export default App

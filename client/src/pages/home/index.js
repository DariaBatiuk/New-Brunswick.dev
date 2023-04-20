import SmallPost from '../../components/smallPost';
import React, { useState, useEffect , useContext} from 'react';
import "./index.css"
import { Link } from 'react-router-dom';
import { NewsContext , PageContext } from '../../App';
import News from '../../components/news';
function Home() {
    
const newsData = useContext(NewsContext);
const {pageNumber , setPageNumber}  = useContext(PageContext);
const [postData, setPostData] = useState([]);


useEffect(() => {
  fetch('http://localhost:3003/api/projects')
  .then(response => response.json())
  .then(data => setPostData(data))
  .catch(error => console.log(error))
}, [])


// function handleClick() {
// setPageNumber(pageNumber + 1)
// }

const [newsIndex , setNewsIndex] = useState(0);

useEffect(() => {
   if (newsIndex < 0) {
    setNewsIndex(newsData?.length - 1);
  }
}, [newsIndex, newsData?.length]);

useEffect(() => {
  setNewsIndex(0);
}, [newsData]);


return (
  <div className='columns mr-2 ml-2 test' id='parent'>
  <div className="column is-8" id='left'>
    <div className="columns is-multiline">
    {postData.map(data => ( 
      <div className='column is-12' key={data._id}>
    <Link to={`/post/${data._id}`}>
    <SmallPost postData={data}/>
    </Link>
    </div>
    )
     
      
    )}
    </div>
  </div>


  <div className="column is-4" id='right'>  
  {newsData && (<News newsData={newsData[newsIndex]} changeIndex={setNewsIndex} index={newsIndex} nextPage={() => setPageNumber(pageNumber + 1)} length={newsData?.length}/>)}

</div>
</div>

)
}


export default Home;
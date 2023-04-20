import { useEffect } from 'react';

const News = ({newsData , changeIndex , index , nextPage ,length }) => {

return (
    <div>
{newsData && (
    <div>
  <a href={newsData.url} target="_blank">
  <div className='box'>
   
    <img src={newsData.image.url}/> 
   
<p className='is-size-5 has-text-weight-semibold'>{newsData.title}</p>
<hr className='m-1'/>
<p>{newsData.description}</p>
</div>

</a> 
<div className='is-flex is-justify-content-space-between is-align-items-center'>
          <button className='button is-info is-fullwidth' onClick={() => changeIndex(index -1)} >Previous</button>
         {index === length - 1 ?  <button className='button is-info is-fullwidth' onClick={() => nextPage()}>Next page</button>: <button className='button is-info is-fullwidth' onClick={() => changeIndex(index + 1)}>Next</button> } 
          </div>
        
</div>

)}     
</div>
)
            
    }


export default News;


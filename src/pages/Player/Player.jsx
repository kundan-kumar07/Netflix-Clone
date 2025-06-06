import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id}=useParams();
  const navigate=useNavigate();


  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    type:""

  });
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDliYzk2ZGQ2NzM5YTE3Y2Q5MWZlNGQzZThjNzZhNyIsIm5iZiI6MTc0ODg3MzgwNC41NjYwMDAyLCJzdWIiOiI2ODNkYjI0YzJmMjI1N2Q4ZjQ1Mzg0YWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oLgocQpha17T63i6CdALWq0d44cUr8DshV7tMnbjXcA'
  }
};
useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));

})

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}} />
      <iframe width="90%" height="90%"  src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" allowFullScreen title='trailer'></iframe>
      <div className='player-info'>
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
      
    </div>
  )
}

export default Player

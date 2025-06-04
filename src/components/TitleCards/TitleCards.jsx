import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title,category}) => {
const [apiData,SetApiData]=useState([]); 
  

useEffect(()=>{
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDliYzk2ZGQ2NzM5YTE3Y2Q5MWZlNGQzZThjNzZhNyIsIm5iZiI6MTc0ODg3MzgwNC41NjYwMDAyLCJzdWIiOiI2ODNkYjI0YzJmMjI1N2Q4ZjQ1Mzg0YWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.oLgocQpha17T63i6CdALWq0d44cUr8DshV7tMnbjXcA'
  }
};

fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res =>SetApiData(res.results))
  .catch(err => console.error(err));
},[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list'> 
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}> 
          <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
          </Link> 
        })}

      </div>
      
    </div>
  )
}

export default TitleCards

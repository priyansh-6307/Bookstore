import React from 'react'
import { Link } from 'react-router-dom'
import './main.css'



const Hero = () => {
  return (
    <div className='main'>
      
      <div className='left'>
<h1>Discover Your Favourite Books Here...</h1>
<p>Explore a vast collection of books across genres, handpicked to ignite your imagination and fuel your passion for reading.</p>
<div className='btn'>
  <Link to="/all-books" className='buttondis' > Find Reads</Link>
 
</div>
      </div>

      <div>

<div className='img'><img src="https://static.cdnlogo.com/logos/t/94/the-island-bookstore.svg" alt="" /></div>
      </div>
    </div>
  )
}

export default Hero
import React from 'react'
import './InDevelopment.css'
import cat from '../../assets/img/cat-indevelopment.png'
export const InDevelopment = () => {
  return (
    <div className='container'>
        <div className='catBorder'>
            <img className='catImg' 
              src={cat} 
              alt="in-development" 
              width={100} 
              height={100}
            />
            <p className='catText'>En desarrollo</p>
        </div>
    </div>
  )
}

import React from 'react'


const Title = ({title}:{title:string}) => {
  return (
    <div className=' h-16 '>
    <h1 className='text-3xl font-medium '>{title}</h1>
      </div>
  )
}

export default Title
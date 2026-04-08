import React from 'react'
import noProjectImage from '../assets/no-projects.jpg'
import Button from './Button'

const NoProjectSelected = ({onAddProject}) => {
  return (
    <div className='mt-2 text-center w-2/3 pt-16'>
        <img 
            className='w-20 h-20 object-contain mx-auto rounded-2xl' 
            src={noProjectImage} 
            alt="An empty task list" />
        <h2 className='text-xl font-bold text-stone-600 my-2 '>
            No Project Selected
        </h2>
        <p className='text-stone-400 mb-2'>
            Select a project or get started with a new one.
        </p>
        <p className='mt-8'>
            <Button onClick={onAddProject}>
                + Create new project
            </Button>
        </p>
    </div>
  )
}

export default NoProjectSelected
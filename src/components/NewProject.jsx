import React from 'react'
import Input from './Input'
import { useRef } from 'react';

const NewProject = ({onAdd}) => {

    const title = useRef();
    const description = useRef();
    const dueDate = useRef()

    function handleSafe(){
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enteredDueDate = dueDate.current.value;

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
        })
    }
    
  return (
    <div className='w-140 mt-16 border-x-gray-100 '>
        <menu className='flex items-center justify-end gap-3 my-4 '>
            <li>
                <button className='text-stone-800 bg-blue-50 px-3 py-0.5 rounded-xl hover:text-stone-950 cursor-pointer' >
                    Cancel
                </button>
            </li>
            <li>
                <button 
                    className='px-3 py-0.5 rounded-xl text-[#ffffff] bg-[#305CDE] cursor-pointer'
                    onClick={handleSafe}
                    >Save
                </button>
            </li>
        </menu>

        <div className='flex flex-col gap-1' >
            <Input ref={title} type="text" label="Title:" />
            <Input ref={description} label="Description:" textarea/>
            <Input ref={dueDate} type="date" label="Due Date:"/>
        </div>
    </div>
  )
}

export default NewProject
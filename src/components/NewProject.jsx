import React, { useRef, useState } from 'react'
import Input from './Input'

const NewProject = ({ onAdd }) => {
  const title = useRef()
  const description = useRef()
  const dueDate = useRef()
  const [error, setError] = useState('')

  const handleSave = () => {
    const validations = [
      title.current?.validate(),
      description.current?.validate(),
      dueDate.current?.validate(),
    ]

    const firstError = validations.find((message) => message)
    if (firstError) {
      setError(firstError)
      return
    }

    onAdd({
      title: title.current.getValue(),
      description: description.current.getValue(),
      dueDate: dueDate.current.getValue(),
    })
  }

  return (
    <>
      {error && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
          <div className='w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl'>
            <h2 className='mb-3 text-xl font-semibold text-stone-900'>Invalid input</h2>
            <p className='mb-5 text-stone-700'>{error}</p>
            <button
              className='rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
              onClick={() => setError('')}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
                    onClick={handleSave}
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
    </>
  )
}

export default NewProject
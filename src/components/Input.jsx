import React from 'react'
import { forwardRef } from 'react'


const Input = forwardRef( ( {label, textarea, ...props}, ref ) => {

    const classes = "w-full p-1 border-b-2 rounded-sm border-stone-100 bg-stone-100 text-stone-600 focus:outline-none focus:border-stone-300 "

  return (
    <p className='flex flex-col gap-1 my-4'>
        <label className='font-bold text-sm uppercase text-stone-600'>
            {label}
        </label>
        {textarea ? (
            <textarea ref={ref} className={classes} {...props}/>
        ) : (
        <input ref={ref} className={classes} {...props}/>
        )}
    </p>
  )
})

export default Input

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'

const Input = forwardRef(({ label, textarea, ...props }, ref) => {
  const innerRef = useRef(null)
  const [invalid, setInvalid] = useState(false)

  const validate = () => {
    const value = innerRef.current?.value ?? ''
    const trimmed = value.trim()
    const labelText = label ? label.replace(/[:]/g, '').trim() : 'This field'
    const isTextField = /title|description/i.test(labelText)

    if (!trimmed) {
      setInvalid(true)
      return `${labelText} is required.`
    }

    if (isTextField) {
      const hasLetter = /[A-Za-z]/.test(trimmed)
      const invalidChars = /[^A-Za-z0-9 \-.,!?'"()]/.test(trimmed)
      if (!hasLetter) {
        setInvalid(true)
        return `${labelText} must contain letters and be a valid text value.`
      }
      if (invalidChars) {
        setInvalid(true)
        return `${labelText} may only include letters, numbers, spaces, and common punctuation.`
      }
    }

    if (props.type === 'date') {
      const selectedDate = new Date(value)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (!value || isNaN(selectedDate.getTime())) {
        setInvalid(true)
        return `Please enter a valid ${labelText.toLowerCase()} in the date picker.`
      }
      if (selectedDate < today) {
        setInvalid(true)
        return `${labelText} must be today or later.`
      }
    }

    if (labelText.toLowerCase().includes('title') && trimmed.length < 3) {
      setInvalid(true)
      return 'Title must be at least 3 characters.'
    }

    if (labelText.toLowerCase().includes('description') && trimmed.length < 5) {
      setInvalid(true)
      return 'Description must be at least 5 characters.'
    }

    setInvalid(false)
    return null
  }

  useImperativeHandle(ref, () => ({
    validate,
    getValue: () => innerRef.current?.value ?? '',
    focus: () => innerRef.current?.focus(),
  }))

  const classes = `w-full p-1 border-b-2 rounded-sm border-stone-100 bg-stone-100 text-stone-600 focus:outline-none focus:border-stone-300 ${
    invalid ? 'border-red-500 bg-red-50' : ''
  }`

  return (
    <p className='flex flex-col gap-1 my-4'>
      <label className='font-bold text-sm uppercase text-stone-600'>
        {label}
      </label>
      {textarea ? (
        <textarea ref={innerRef} className={classes} {...props} />
      ) : (
        <input ref={innerRef} type={props.type} className={classes} {...props} />
      )}
    </p>
  )
})

export default Input

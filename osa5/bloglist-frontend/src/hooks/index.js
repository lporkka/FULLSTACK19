import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  let hook = {
    type,
    value,
    onChange
  }

  Object.defineProperty(hook, 'reset', {
    enumerable: false,
    value: reset
  })

  return hook
}

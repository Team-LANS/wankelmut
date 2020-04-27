import React, { useState } from 'react'
import '../App.css'
import Grid from './Grid/Grid'

const App = () => {
  const [title, setTitle] = useState('')

  return <>
    <input
      value={title}
      placeholder='Enter Title'
      onChange={(e) => setTitle(e.target.value)}
      type="text"
    />
    <Grid/>
  </>
}

export default App

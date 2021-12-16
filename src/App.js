import './App.css'
import { useState } from 'react'
import React from 'react'
import axios from 'axios'

const CardList = (props) => (
  <div> 
    {props.profiles.map((profile) => (
      <Card key={profile.id} profile={profile} /> // CardList takes in an array of objects as a prop, and maps through them creating a Card for each one. 
    ))}
  </div>
)

export const Card = (props) => {
  const profile = props.profile
  return (
    <div className='github-profile'>
      <img  src={profile.avatar_url} />
      <div className='info'>
        <div className='name'>{profile.name}</div>
        <div className='company'>I work for {profile.company ? profile.company : 'no one yet'}</div>
        <div>{profile.bio}</div>
      </div>
      <hr></hr>
    </div>
  )
}

export const Form = (props) => {
  const [userName, setUserName] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault() // makes it so the "form" isn't actually submitted. We use this when handling forms. 
    const response = await axios.get(`https://api.github.com/users/${userName}`)
    console.log(response.data)
    props.onSubmit(response.data) // whatever function gets passed into the 'onSubmit' prop will take 'response.data' as an argument.
    // and that's how we pass data to a parent from a child. The function is defined in the parent, and the argument is defined in the child.
    // We're adding this JSON object to an array that is kept in the parent component with the 'addNewProfile' function within it. 
    setUserName('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={userName}
        onChange={(event) => setUserName(event.target.value)}
        placeholder='GitHub username'
        required
      />
      <button>Add card</button>
    </form>
  )
}

export const App = () => {
  const [profiles, setProfiles] = useState([])
  const addNewProfile = (profileData) => {
    setProfiles([...profiles, profileData])
  }
  return (
    <div className='objects'>
      <div className='header'>The GitHub Cards App</div>
      <Form onSubmit={addNewProfile} />
      <hr></hr>
      <CardList profiles={profiles} /> 
    </div>
  )
}


export default App

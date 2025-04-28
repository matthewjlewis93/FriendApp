// import { useState } from 'react'
import './App.css'
import ChatMessage from './components/ChatMessage'

// import ChatProfilePhoto from "./components/ChatProfilePhoto"

function App() {
  return (
    <>
      <ChatMessage messageReceived={true} />
      <ChatMessage messageReceived={false} messageContent="Sorry, I don't speak Italian" />
    </>
  )
}

export default App

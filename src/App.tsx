import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Window from './components/window'
import Wallpaper1 from "./images/wallpaper1.png"
import Wallpaper2 from "./images/wallpaper2.jpeg"
import Wallpaper3 from "./images/wallpaper3.png"
import Wallpaper4 from "./images/wallpaper4.png"
import BrandyHeart from "./images/brandyheart.png"
import Resume from "./images/resume.png"

import './App.css'

function App() {
  return (
    <div
    className="min-h-screen bg-cover bg-center "
    style={{ 
      backgroundImage: `url(${Wallpaper4})` }} 
      >
      <Window/>
      <div className = "flex flex-row h-8 min-w-screen font-semibold text-white"
      style = {{backgroundColor: "#3A5F96"}}>
        <div className = "ml-2 w-4 py-2">
          <img src = {BrandyHeart} alt = {BrandyHeart}></img>
        </div>
        <div className = "ml-6 py-1">
          feli's personal website
        </div>
      </div>
      <div className = "justfflex flex-col">
        <img className= "w-14" src = {Resume}></img>
          <div className="text-white">
            my resume
          </div>
      </div>
      </div>
  )
}

export default App

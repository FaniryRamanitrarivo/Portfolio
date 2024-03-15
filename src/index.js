import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/style.scss'
import { HomePage } from './pages/HomePage'
import "aos/dist/aos.css"

function App() {

    return <HomePage />

}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)
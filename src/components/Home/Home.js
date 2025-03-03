import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const nav = useNavigate()
    const url = window.location.href;

    const logoutHandler = () => {
        localStorage.removeItem('token');
        nav(-1)
    }

    useEffect(() => {

        window.onpopstate = () => {
            window.localStorage.removeItem('token')
        }
        
        if(url === 'http://localhost:3000/Home' && localStorage.getItem('token') === null){
            nav('/')
        }
        
        
    }, [url, nav])

  return (
    <div>
        <h1>Home Page</h1>
        <button onClick={logoutHandler}>logout</button>
    </div>
  )
}

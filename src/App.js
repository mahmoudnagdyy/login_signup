import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 


function App() {

  const [signShow, setSignShow] = useState(true);
  const [response, setResponse] = useState('');
  const [token, setToken] = useState('');

  const nav = useNavigate()


  const login_email = useRef('')
  const login_password = useRef('')
  
  const signUp_name = useRef('')
  const signUp_email = useRef('')
  const signUp_password = useRef('')


  const loginHandler = () => {

    const useremail = login_email.current.value;
    const userpassword = login_password.current.value;

    axios.post(`auth/login`, { email: useremail, password: userpassword })
    .then((res) => {

      if(res.data.token){
        setToken(res.data.token)
      }

      else{
        setResponse(res.data.message)
        const x = window.setTimeout(() => {
          clearTimeout(x)
          setResponse('')
        }, 3000)
      }

    })

  }


  const signupHandler = () => {

    const username = signUp_name.current.value;
    const useremail = signUp_email.current.value;
    const userpassword = signUp_password.current.value;

    if(username.length < 8){
      setResponse('Name should be at least 8 characters long')
      const x = window.setTimeout(() => {
        clearTimeout(x)
        setResponse('')
      }, 3000)
      return ;
    }

    else if(useremail.length < 5 ||!useremail.includes('@') ||!useremail.includes('.')){
      setResponse('Invalid email address')
      const x = window.setTimeout(() => {
        clearTimeout(x)
        setResponse('')
      }, 3000)
      return ;
    }

    else if(userpassword.length < 8){
      setResponse('Password should be at least 8 characters long')
      const x = window.setTimeout(() => {
        clearTimeout(x)
        setResponse('')
      }, 3000)
      return ;
    }

    axios.post(`auth/signup`, { name: username, email: useremail, password: userpassword })
    .then((res) => {
      setResponse(res.data.message)
      const x = window.setTimeout(() => {
        clearTimeout(x)
        setResponse('')
      }, 1500)
    })

    signUp_name.current.value = ''
    signUp_email.current.value = ''
    signUp_password.current.value = ''
    
    if(response === 'User created successfully'){
      nav('ConfirmEmail')
    }

  }


  useEffect(() => {
    console.log(`${process.env.BACKEND_URL}`);
    
    if(token.length){
      window.localStorage.setItem('token', token)
      nav('Home')
    }
    
    
    
  }, [token, nav])

  return (
    <div className="App flex flex-col justify-center items-center">

      <div className='big_container bg-white flex flex-row justify-center items-center'>

        <div className="login_container flex flex-col justify-center items-center">
          <h1 className='capitalize mb-10 text-4xl'>sign in</h1>

          <div className='flex flex-col mb-3'>
            <label className='capitalize mb-1 font-light text-lg' htmlFor='email'>email</label>
            <input ref={login_email} id='email' type="email" placeholder="Email" className='outline-none bg-gray-100 w-72 py-3 px-3 rounded-full' />
          </div>

          <div className='flex flex-col mb-2'>
            <label className='capitalize mb-1 font-light text-lg' htmlFor='password'>password</label>
            <input ref={login_password} id='password' type="password" placeholder="Password" className='outline-none bg-gray-100 w-72 py-3 px-3 rounded-full' />
          </div>

          <p className='capitalize mb-2 text-red-600 text-lg font-bold'>{response? <><i class="fa-solid fa-xmark"></i> {response}</> : null}</p>
          
          <button className='capitalize duration-150 w-72 text-lg text-white py-2 px-3 rounded-full' onClick={loginHandler}>sign in</button>
        </div>

        <div className="signup_container flex flex-col justify-center items-center">
          <h1 className='capitalize mb-10 text-4xl'>sign up</h1>
          <div className='flex flex-col mb-3'>
            <label className='capitalize mb-1 font-light text-lg' htmlFor='name'>name</label>
            <input ref={signUp_name} id='name' type="text" placeholder="Name" className='outline-none bg-gray-100 w-72 py-3 px-3 rounded-full' />
          </div>

          <div className='flex flex-col mb-3'>
            <label className='capitalize mb-1 font-light text-lg' htmlFor='emaill'>email</label>
            <input ref={signUp_email} id='emaill' type="email" placeholder="Email" className='outline-none bg-gray-100 w-72 py-3 px-3 rounded-full' />
            </div>

            <div className='flex flex-col mb-4'>
            <label className='capitalize mb-1 font-light text-lg' htmlFor='passwordd'>password</label>
            <input ref={signUp_password} id='passwordd' type="password" placeholder="Password"  className='outline-none bg-gray-100 w-72 py-3 px-3 rounded-full' />
            </div>

            <p className='capitalize mb-2 text-red-600 text-lg font-bold'>{response?<><i class="fa-solid fa-xmark"></i> {response}</> : null}</p>

          <button className='capitalize duration-150 w-72 text-lg text-white py-2 px-3 rounded-full' onClick={signupHandler}>sign up</button>
        </div>

        <div className={signShow? 'horizontal_div flex flex-col justify-center items-center text-white signin_show' : 'horizontal_div flex flex-col justify-center items-center text-white signup_show'}>
          <h1 className='capitalize font-bold text-4xl mb-3'>{signShow? 'welcome to login.' : 'welcome to signup.'}</h1>
          <p className='capitalize mb-3'>{signShow? "don't have an account?" : 'do you have an account?'}</p>
          <button className='capitalize border-2 py-2 px-4 rounded-full hover:bg-white hover:text-black duration-150' onClick = {() => setSignShow(!signShow)}>{signShow? 'sign up' : 'sign in'}</button>
        </div>

      </div>
      
    </div>
  );
}

export default App;

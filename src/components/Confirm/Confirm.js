import React from 'react'
import './confirm.css'

export const Confirm = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-48'>
        <img className='confirm_img rounded-3xl' src='https://i.pinimg.com/originals/83/42/0b/83420bb5f95923f8c13028a5053f4908.gif' alt='Confirmation Page' />
        <h1 className='mt-3 font-bold capitalize text-3xl'>Confirmation page</h1>
        <p className='mt-3 capitalize text-lg'>please check your inbox and click on the link to confirm your email</p>
    </div>
  )
}

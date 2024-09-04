"use client"
import React from 'react'
import { Button } from '../ui/button'
import { logout } from '@/lib/data'
import { useRouter } from 'next/navigation'


const Navbar = ({signedIn}:{signedIn:boolean}) => {
  const router = useRouter()
  const onLogout =async () =>{
   await logout()
  }

  const onOnboard = async () =>{
    router.push("/onboard")
  }
  return (
    <div className='w-screen h-14 p-5 flex items-center mb-5 border border-b-2 border-neutral-700'>
        <div className='flex w-[20%] justify-start text-2xl'>
            Banki
        </div>
        <div className='flex justify-center w-[60%] gap-3 '>
    <Button variant={"ghost"} className='text-xl'>Home</Button>
    <Button variant={"ghost"} className='text-xl'>About</Button>
    <Button variant={"ghost"} className='text-xl'>Our Wallet</Button>
        </div>
        <div className='w-[20%] flex justify-end'>
          {signedIn?<Button variant={"outline"} className='text-xl rounded-full p-2' onClick={onLogout}>Logout</Button>:  <Button variant={"outline"} className='text-xl rounded-full p-2' onClick={onOnboard}>Onboard</Button> }
      
        </div>

    </div>
  )
}

export default Navbar
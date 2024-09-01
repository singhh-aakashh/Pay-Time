import Navbar from '@/components/app-ui/navbar'
import { OnboardForm } from '@/components/app-ui/onboard-form'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-screen h-screen'>
        <Navbar/>
        <div className='w-screen h-[90vh] flex justify-center items-center'>
        <OnboardForm/> 
        </div>
    </div>
  )
}

export default page
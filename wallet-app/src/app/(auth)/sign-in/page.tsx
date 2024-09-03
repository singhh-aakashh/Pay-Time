import { SignIn } from '@/components/app-ui/sign-in'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'><SignIn/></div>
  )
}

export default page
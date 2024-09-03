import { SignUp } from '@/components/app-ui/sign-up'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'><SignUp/></div>
  )
}

export default page
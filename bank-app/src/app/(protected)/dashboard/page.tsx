"use client"
import { getCurrentUser } from '@/lib/data'
import React, { useEffect, useState } from 'react'

type Props = {}
interface userInterface{
  id:string,
  name:string |null,
}
const Page = (props: Props) => {
  const [user,setUser] = useState<userInterface|null>()
  useEffect(()=>{
    getCurrentUser().then((res)=>setUser(res))
  },[])
  return (
    <div>
        {user?user.name:"no user"}
      </div>
  )
}

export default Page
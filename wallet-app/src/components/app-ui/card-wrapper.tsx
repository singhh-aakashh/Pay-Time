import React from 'react'
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'


const CardWrapper = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <Card className={cn(' h-[85vh] flex p-8',className)}>
        {children}
        </Card>
  )
}

export default CardWrapper
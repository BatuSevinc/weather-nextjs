import { CitySkeleton } from '@/app/helpers'
import React from 'react'

const loading = () => {
  return (
    <div className="absolute h-screen bg-black text-white w-screen top-0 bottom-0 left-0 right-0 flex justify-center items-center">
    <CitySkeleton />
  </div>
  )
}

export default loading
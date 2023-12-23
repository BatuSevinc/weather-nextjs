import Image from 'next/image'
import React from 'react'
import { ClockLoader } from "react-spinners";

const CitySkeleton = () => {
  return (
    <>
      <ClockLoader size={200} color="white" />
    </>
  )
}

export default CitySkeleton
"use client"

import Link from 'next/link'
import React from 'react'
import {CloudIcons} from '../../helpers'
import Image from 'next/image'

const error = () => {
  return (
    <div className='text-white flex text-center flex-col justify-center items-center h-screen'>
      <div>
        <Image src={CloudIcons} width={100} height={100}/>  
      </div>
      Upps!! Sanırım bir şeyler yanlış gitti.
      <br />
      Anasayfaya dönmek için <br /> 
      <Link href="/"><h3 className='uppercase mt-3 underline leading-8 cursor-pointer'>tıklayınız.</h3></Link> 
    </div>
  )
}

export default error
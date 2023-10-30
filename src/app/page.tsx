import { Form } from '@/components/Form'
import { FormRoot } from '@/components/Form/formRoot'
import { Fira_Sans, Glory } from 'next/font/google'
import Image from 'next/image'
const fira = Fira_Sans({ subsets: ['latin'], weight: '400' })
import { useState } from 'react'
export default function Home() {
  return (
    <main className=' w-screen flex items-center text-white justify-center h-screen bg-center bg-[url(/bg.png)] max-md:bg-[url(/bg2.png)]' style={{backgroundSize: '100%'}}>
      <section className="px-24 max-md:px-8 mx-8 rounded-md bg-zinc-800 dark:bg-opacity-60 dark:border dark:border-zinc-300 backdrop-blur-md py-8">
        <div className=' flex px-12 gap-2 items-center flex-1 justify-center'>
          <img src='/logo_circle.png'/>
          <h1 className={fira.className}>NAVE</h1>
        </div>
        <Form />  
      </section>
    </main>
  )
}

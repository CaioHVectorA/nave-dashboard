"use client"
import { Fira_Sans, Glory } from 'next/font/google'
import Image from 'next/image'
const fira = Fira_Sans({ subsets: ['latin'], weight: '400' })
const glory = Glory({ subsets: ['latin'] })
import { useState } from 'react'
export default function Home() {
  const [mode, setMode] = useState<'LOGIN' | 'REGISTER'>('REGISTER')
  return (
    <main className=' w-screen flex items-center text-white justify-center h-screen bg-center' style={{ backgroundImage: 'url(/bg.png)',backgroundSize: '100%' }}>
      <section className="px-24 bg-zinc-800 py-8">
        <div className=' flex px-12 gap-2 items-center flex-1 justify-center'>
          <img src='/logo_circle.png'/>
          <h1 className={fira.className}>NAVE</h1>
        </div>
        <div className=' flex flex-1 mt-12 justify-between'>
          <button onClick={() => setMode('REGISTER')} className={`${mode === 'REGISTER' ? ' border-b-2 pb-2 border-dark-blue': 'border-b-2 pb-2 border-transparent'}`}>Registrar</button>
          <button onClick={() => setMode('LOGIN')} className={`${mode === 'LOGIN' ? ' border-b-2 pb-2 border-dark-blue': 'border-b-2 pb-2 border-transparent'}`}>Entrar</button>
        </div>
        <form>
          {/* TODO - VER O FORM.TSX */}
        </form>
      </section>
    </main>
  )
}

import { SetState } from '@/util/types'
import Link from 'next/link'
import React, { useState } from 'react'
type mode = 'LOGIN' | 'REGISTER'
type ModeProps = {
    mode: mode,
    setMode: SetState<mode>
}
export function FormMode({mode, setMode}: ModeProps) {
    return (
        <>
        <div className=' flex flex-1 mt-6 justify-between'>
            <Link href={`?mode=register`} className=' text-white'>
                <button onClick={() => setMode('REGISTER')} className={`${mode === 'REGISTER' ? ' border-b-2 pb-2 border-dark-blue font-bold': 'border-b-2 pb-2 border-transparent'}`}>Registrar</button>
            </Link>
            <Link href={`?mode=login`} className=' text-white'>
              <button onClick={() => setMode('LOGIN')} className={`${mode === 'LOGIN' ? ' border-b-2 pb-2 border-dark-blue font-bold': 'border-b-2 pb-2 border-transparent'}`}>Entrar</button>
            </Link>
        </div>
        </>
    )
}
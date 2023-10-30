import React from 'react'
import { Glory } from 'next/font/google'
import { Role, SetState } from '@/util/types'
const glory = Glory({ subsets: ['latin'] })
export function FormSelect({ label, role, setRole }: { label: "Professor" | "Direção", role: Role,setRole: SetState<Role> }) {
    return (
        <div className=' bg-sub-bg px-2 py-1 rounded-full flex flex-row-reverse items-center justify-end gap-4 mt-3'>
            <label className={`${glory.className} opacity-60 dark:opacity-80 text-xl text-main-text`} htmlFor={label}>{label}</label>
            <div className=' w-6 h-6 p-0 relative'>
                <span className={'transition-all absolute left-0 top-0 w-full h-full z-20 border border-dark-blue rounded-full'+ ` ${role === label && 'bg-dark-blue'}`}></span>
                <input onClick={() => setRole(label)} className="w-full cursor-pointer h-full pl-12 absolute z-30 opacity-0 left-0 top-0" id={label} type='radio' name='role'/>
            </div>
        </div>
    )
}
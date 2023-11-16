"use client"
import { Fira_Sans } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { SelectTurma, SelectSerie } from '../Selects/'
import { boolean } from 'zod'
import { generateScale } from '@/util/func/generateScale'
import { SetState } from '@/util/types'
const inter = Fira_Sans({ subsets: ['latin'], weight: '400'})
const turmas = ['1001','1002','1003','1004','2001','2002','2003','2004','3001','3002','3003','3004']
type formProps = {
    title: string,
    author: string,
    filter: '' | '1001' | '1002' | '1003' | '1004' | '2001' | '2002' | '2003' | '2004' | '3001' | '3002' | '3003' | '3004' | '1°' | '2°' | '3°',
    body: string,
    zap: boolean
}
export function Form({ setWhatsapp }: { setWhatsapp: SetState<boolean> }) {
    const [formState, setFormState] = useState<formProps>({
        body: '',
        author: '',
        title: '',
        filter: '',
        zap: false,
    })
    const handleChange = (key: keyof formProps, value: boolean | string) => {
        const temp = {...formState}
        //@ts-ignore
        temp[key] = value
        setFormState(temp)
    }
    useEffect(() => setWhatsapp(formState.zap), [formState.zap])
    return (
        <div className=' bg-sub-bg rounded-lg flex flex-col px-2 py-4 pb-12 items-center w-full animate-slide-bottom   '>
            <div className=' pt-2'>
                <input onChange={({ target }) => handleChange('title', target.value)} placeholder='Título do aviso' className=' bg-transparent border-b-2 placeholder:text-center placeholder:text-2xl text-2xl border-main-text'/>
            </div>
            <div className=' grid grid-cols-2 grid-rows-2 w-full gap-2 mt-4'>
                <div className=' bg-transparent bg-opacity-30 px-1 py-2 w-full rounded-md'>
                    <input onChange={({ target }) => handleChange('author', target.value)} placeholder='Escreva seu nome' className='w-full bg-transparent border-b-2 placeholder:text-center placeholder:text-xl text-xl border-white border-opacity-50'/>
                </div>
                <div className=' bg-transparent bg-opacity-30 px-1 py-2 w-full rounded-md'>
                    <button onClick={() => handleChange('zap', !formState.zap)} className={` w-full text-center text-gray-blue text-2xl ${formState.zap ? 'bg-dark-blue text-white' : 'bg-white'} bg-opacity-40 rounded-md hover:bg-opacity-100 border hover:border-black `+inter.className}>Whatsapp</button>
                </div>
                <div className=' bg-transparent bg-opacity-30 px-1 py-2 w-full rounded-md'>
                    {/* @ts-ignore - Não sei por que, mas não pega o .value */}
                    <SelectTurma style={{opacity: turmas.includes(formState.filter) ? '1' : '0.2'}} onChange={({ target }) => handleChange('filter', target.value)} />
                </div>
                <div className=' bg-transparent bg-opacity-30 px-1 py-2 w-full rounded-md'>
                    {/* @ts-ignore - Não sei por que, mas não pega o .value */}
                    <SelectSerie style={{opacity: ['1°','2°','3°'].includes(formState.filter) ? '1' : '0.2'}} onChange={({ target }) => handleChange('filter', target.value)}/>
                </div>
            </div>
            <textarea placeholder='Escreva seu aviso' onChange={({ target }) => handleChange('body', target.value)} className={'bg-bg resize-none mt-4 text-main-text w-full px-1 py-0.5'} rows={generateScale(formState.body.length) / 24} />
            <button className=' mt-4 bg-action-blue text-white px-2 py-1 w-full rounded-full'>Enviar</button>
        </div>
    )
}
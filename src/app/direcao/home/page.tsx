"use client"
import Calendar from 'react-calendar'
import { TextBox, Form } from '@/components/Aviso/'
import { SelectTurma } from '@/components/Selects/SelectTurma'
import React, { useEffect, useLayoutEffect, useState } from 'react'
const actualTime = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
const Categories = ['Prova','Simulado','Tarefa','Trabalho']
export default function Page() {
    const [formActive, setActive] = useState(false)
    const [date, setDate] = useState<string>(actualTime)
    const [dateActive, setDateActive] = useState(false)
    const [zap, setZap] = useState(false)
    return (
        <div className=' w-full grid grid-cols-2 mt-8 px-16 gap-3'>        
            {formActive ? <Form setWhatsapp={setZap}/> : <TextBox onClick={() => setActive(true)}/>}
            {!zap ? <div className=' w-full flex flex-col items-end'>
                <div className='bg-sub-bg px-2 py-2 mb-2 rounded-md flex w-8/12 gap-2 items-center'>
                    <label htmlFor='checkDate'>Marcar como lembrete?</label>
                    <input onClick={() => setDateActive(!dateActive)} type='checkbox' id='checkDate'/>
                </div>
                    <input type='date' className={'bg-sub-bg w-fit h-fit px-2 py-4'+(dateActive ? '' : ' hidden')} value={date} onChange={({ target }) => setDate(target.value)}/>
                <div className=' flex flex-col gap-2 w-8/12 pl-2'>
                    {Categories.map((i, index) => (
                        <div key={index} className=' flex justify-self-start'>
                        <input type='radio'/>   
                        <label>{i}</label>
                        </div>
                    ))}    
                </div>
            </div>: (
                <>
                    Grupos do zap aqui.
                </>
            )}
        </div>
    )
}
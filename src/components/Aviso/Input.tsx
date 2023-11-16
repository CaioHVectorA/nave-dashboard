import React, { HTMLProps } from 'react'
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs'
interface InputProps extends HTMLProps<HTMLInputElement> {
}
export function TextBox({ ...rest }: InputProps) {
    return (
        <>
        <div className=' flex px-6 h-fit py-2 rounded-md bg-sub-bg items-center w-fit gap-16'>
            <label className=' cursor-pointer' htmlFor='in'>
                <img src='/edit.png'/>
            </label>
            <input {...rest} id='in' placeholder='Escreva um aviso...' className='py-2 text-lg text-sub-bg px-4 bg-transparent placeholder:text-lg'/> 
            <BsThreeDots className=" fill-dark-blue" size="32"/>
        </div>
        </>
    )
}
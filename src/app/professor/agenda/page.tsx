"use client"
import { getLocalStorage } from '@/LocalStorage'
import './calendar.css'
import React, { useEffect } from 'react'
import { LOCAL_STORAGE } from '@/util/consts'
import { useRouter } from 'next/navigation'
import { findProfByEmail } from '@/util/func/findProfByEmail'
export default function page({}: {}) {
    const nav = useRouter()
    useEffect(() => {
        const email = getLocalStorage(LOCAL_STORAGE.USER_DATA).email
        console.log(email)
        nav.push('/professor/agenda/'+findProfByEmail(email))
    }, [])
    return (
        <>
        {/* <Calendar /> */}
        Carregando
        </>
    )
}
import { URL } from '@/util/consts'
import axios, { AxiosPromise } from 'axios'
import React from 'react'
import { Horarios } from './Horario'

export default async function page({}: {}) {
    const promises = [] as AxiosPromise[]
    const t = ['1001', '1002','1003','1004','2001','2002','2003','2004','3001','3002','3003','3004']
    t.forEach(turma => {
        promises.push(axios(URL+'horario/'+turma))
    })
    const data = (await Promise.all(promises)).map(res => res.data)
    return (
        <>
            <Horarios data={(data ?? [])}/>
        </>
    )
}
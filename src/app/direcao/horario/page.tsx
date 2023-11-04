"use client"
import { URL } from '@/util/consts'
import axios, { AxiosPromise } from 'axios'
import React, { useEffect, useState } from 'react'
import { Horarios } from './Horario'
import { Tempo } from '@/util/entities/tempo'

export default function Page({}: {}) {
    const [data, setData] = useState<null | Tempo[][][]>(null)
    useEffect(() => {
        const promises = [] as AxiosPromise[]
        const t = ['1001', '1002','1003','1004','2001','2002','2003','2004','3001','3002','3003','3004']
        t.forEach(turma => {
            promises.push(axios(URL+'horario/'+turma))
        })
        const data = Promise.all(promises).then(data => setData(data.map(res => res.data)))
    }, [])
    return (
        <>
            {data ? 
            (<>
                <Horarios data={data}/>
            </>) 
            : (<>
                <h1>Carregando...</h1>
                <h6>Pode demorar um pouco...</h6>
            </>)}
        </>
    )
}
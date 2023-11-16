"use client"
import { SetState } from '@/util/types'
import React, { HTMLProps, useEffect, useState } from 'react'
interface MyComponentProps extends HTMLProps<HTMLSelectElement> {
  }
export function SelectTurma({...rest} : MyComponentProps) {
    const [turmaArr, setTurmaArr] = useState<string[]>([])
    useEffect(() => {
        for (let x = 1; x !== 3; x++) for (let y = 1; y !== 4; y++)  setTurmaArr(prevState => [...prevState, `${x}00${y}`])
        console.log(turmaArr)
    }, [])
    return (
        <div>
            <label>Turma</label>
            <select {...rest}>
                {turmaArr.map(i => <option value={i}>{i}</option>)}
            </select>
        </div>
    )
}
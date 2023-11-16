"use client"
import { SetState } from '@/util/types'
import React, { HTMLProps, useEffect, useState } from 'react'
interface SelectProps extends HTMLProps<HTMLSelectElement> {
  }
export function SelectSerie({...rest} : SelectProps) {
    return (
        <div>
            <label>Turma</label>
            <select {...rest}>
                <option value={'1°'}>1° Série</option>
                <option value={'2°'}>2° Série</option>
                <option value={'3°'}>3° Série</option>
            </select>
        </div>
    )
}
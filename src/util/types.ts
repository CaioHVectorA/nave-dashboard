import { IconType } from 'react-icons'
import { ReactNode } from "react"

export type Children = {
    children: ReactNode
}

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>


export type Role = 'Professor' | 'Direção' | null

export type SideBarProps = { 
    Icon: IconType,
    label: string,
    href: string,
 } 
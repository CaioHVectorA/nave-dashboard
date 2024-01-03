import { Children } from '@/util/types'
import React from 'react'
import { SideBar } from '../../components/Sidebars/dir/SideBar'
import { ChangeThemeSwitch } from '@/components/ChangeThemeSwitch/ChangeThemeSwitch'

export default function Page({ children }: Children) {
    return (
        <>
        <aside>
        <SideBar />
        </aside>
        <div className=' pl-32 pt-8 text-main-text max-w-full overflow-hidden'>
            {children}
        </div>
        <div className=' absolute right-8 top-8'>
            <ChangeThemeSwitch />
        </div>
        </>
    )
}
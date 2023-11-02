"use client"
import { getLocalStorage } from '@/LocalStorage'
import { LOCAL_STORAGE } from '@/util/consts'
import { changeTheme, setTheme } from '@/util/func/changeTheme'
import React, { useEffect, useState } from 'react'

export function ChangeThemeSwitch({}: {}) {
    const [isDark, setDark] = useState(false)
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDark(true)
        if (getLocalStorage(LOCAL_STORAGE.USER_THEME) === 'DARK') return setDark(true)
        if (!window.matchMedia('(prefers-color-scheme: dark)').matches) setDark(false)
        if (getLocalStorage(LOCAL_STORAGE.USER_THEME) === 'LIGHT') return setDark(false)
    }, [])
    setTheme(isDark)
    // const []
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input checked={isDark} onChange={() => { changeTheme() ; setDark(!isDark)}} type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}
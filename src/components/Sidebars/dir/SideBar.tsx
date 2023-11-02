import Link from 'next/link'
import { FaHome, FaClock } from 'react-icons/fa'
import { TiInputChecked } from 'react-icons/ti'
import { BsFiletypeXlsx } from 'react-icons/bs'
import './sidebar.css'
import { SideBarProps } from '@/util/types'
const data: SideBarProps[] = [
    {
        href: '/direcao/home',
        Icon: FaHome,
        label: 'Início'
    },
    {
        href: '/direcao/horario',
        Icon: FaClock,
        label: 'Horários'
    },
    {
        href: '/direcao/planilha',
        Icon: BsFiletypeXlsx,
        label: 'Planilhas'
    }
]

export function SideBar() {
    return (
        <section className="sidebar bg-blue-800 w-16 flex flex-col justify-between items-center">
            <img className="logo-sidebar mt-20 ml-6" src="/img_sidebar/Group 1.png" alt="" />
                <ul className="main flex flex-col justify-center items-center space-y-10 center">
                    {data.map(({ Icon,href,label }) => (
                    <li>
                        <Link href={href} className="home-icon" id="icons">
                                <Icon size={40}/>
                                <span className="text-white">{label}</span>
                        </Link>
                    </li>
                    ))}
                    <Link href="/" className="sair-icon">
                        <img src="/img_sidebar/sair icon.png" alt=""  />
                    </Link>
                </ul>
        </section>
    )
}
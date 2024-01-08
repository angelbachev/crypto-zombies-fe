'use client'

import Link from "next/link"
import { useAuth } from "../contexts/auth"
import Image from "next/image"

export default function Header() {
    const { isLoggedIn, isAdmin, logout } = useAuth()

    const handleLogout = () => {
        logout()
    }

    return (
        <nav className="mb-5 px-5 top-0 sticky bg-slate-900 w-full flex items-start z-50">
            <ul className="flex justify-between w-full align-middle h-[70px] items-center">
                <li>
                    <Link href="/" className="font-bold text-2xl">
                        <Image src='/images/CZ_logo.png' width="200" height="58" alt="Crypto Zombies Logo" />
                    </Link>
                </li>
                {/* <li>
                    <Link href="/attack?showDialog=y">Attack</Link>
                </li> */}
                {isLoggedIn && <li>
                    <Link href="/army">Army</Link>
                </li>}
                {isAdmin && <li>
                    <Link href="/admin/settings">Settings</Link>
                </li>}
                {isLoggedIn && <li>
                    <Link onClick={handleLogout} href=''>Logout</Link>
                </li>}
            </ul>
        </nav>
    )
}
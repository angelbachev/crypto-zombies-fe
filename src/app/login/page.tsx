'use client'

import { FormEvent, useState } from "react"
import { useAuth } from "../contexts/auth"

type OnSubmitEvent = FormEvent<HTMLFormElement> & {
    currentTarget: {
        address: HTMLInputElement
    }
}

export default function Login() {
    const { setAddress } = useAuth()
    const [error, setError] = useState('')

    const handleSubmit = async (e: OnSubmitEvent) => {
        e.preventDefault()

        try {
            await setAddress(e.currentTarget.address.value)
            console.log('login')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Unknown error')
        }
    }

    return (
        <section>
            <h1 className='font-bold text-4xl text-center my-8'>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='address'>Wallet Address</label>
                <input type="text"
                    className="mx-2 rounded-md"
                    id="address"
                    name="address"
                />
                <button className="font-bold rounded-lg border-slate-50 border-2 px-4" type='submit'>Connect</button>
            </form>
            {error && <p className="bg-red-400 text-slate-50 font-semibold mt-4 rounded-lg py-2 text-center">{error}</p>}
        </section>
    )
}
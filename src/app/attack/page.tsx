'use client'

import { Dialog } from "../components/Dialog";

export default function Attack() {
    async function onClose() {
        console.log('Modal has closed')
    }

    async function onOk() {
        console.log('Ok was clicked')
    }
    return (
        <>
            <h1>Attack</h1>
            <Dialog title="Attack" onClose={onClose} onOk={onOk}><p>fdsfsdsf</p></Dialog>
            <p>Description</p>
        </>
    )
}

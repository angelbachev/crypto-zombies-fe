'use client';

import { ReactNode } from 'react'
import { AuthProvider } from './contexts/auth';

type Props = {
    children: ReactNode | ReactNode[]
}

export function Providers({ children }: Props) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}
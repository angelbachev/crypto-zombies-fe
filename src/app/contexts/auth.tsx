import { isAddress } from '@/web3'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'


type AuthContextType = {
  address: string
  isLoggedIn: boolean
  isAdmin: boolean
  setAddress: (address: string) => Promise<void>
  logout: () => void
}

type AuthProviderProps = {
  children: ReactNode | ReactNode[]
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [address, setAddress] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (path === '/login' && isLoggedIn) {
      router.push('/')
    }

    if (path !== '/login' && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn])


  const setInternalAddress: AuthContextType['setAddress'] = async (address) => {
    if (!isAddress(address)) {
      throw new Error('User address is invalid')
    }

    setAddress(address)
    setIsLoggedIn(true)
    setIsAdmin(address === process.env.NEXT_PUBLIC_CRYPTO_ZOMBIES_CONTRACT_OWNER)
  }

  const logout = () => {
    setAddress('')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        address,
        isLoggedIn,
        isAdmin,
        setAddress: setInternalAddress,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('You need to use AuthProvider')
  }
  return context
}

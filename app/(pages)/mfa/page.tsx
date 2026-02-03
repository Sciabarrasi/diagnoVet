'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

const CORRECT_MFA_CODE = '488 519'

export default function MFAPage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const email = sessionStorage.getItem('userEmail')
    if (!email) {
      router.push('/')
      return
    }
    setUserEmail(email)
  }, [router])

  const handleVerifyMFA = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // check MFA code
    if (code.replace(/\s/g, '') === CORRECT_MFA_CODE.replace(/\s/g, '')) {
      const userRole = sessionStorage.getItem('userRole')
      sessionStorage.setItem('mfaVerified', 'true')
      
      // redirect based on role
      if (userRole === 'client') {
        sessionStorage.setItem('isClientLoggedIn', 'true')
        setTimeout(() => {
          router.push('/book-appointment')
        }, 500)
      } else {
        // veterinarian flow
        sessionStorage.setItem('isLoggedIn', 'false') // still need to complete pre-confirmation
        setTimeout(() => {
          router.push('/pre-confirmation')
        }, 500)
      }
    } else {
      setError('El código MFA es incorrecto. Intenta de nuevo.')
      setLoading(false)
    }
  }

  const formatCode = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length <= 3) {
      return cleaned
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
    }
    return value
  }

  return (
    <div className="min-h-screen bg-lineart-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">🐾</span>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold mb-2 text-foreground">
            Autenticación de dos factores
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Ingresa el código que recibiste para continuar
          </p>

          <form onSubmit={handleVerifyMFA} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Código MFA
              </label>
              <Input
                type="text"
                placeholder="000 000"
                value={code}
                onChange={(e) => setCode(formatCode(e.target.value))}
                maxLength={7}
                className="h-11 text-center text-lg letter-spacing-widest font-mono"
              />
              <p className="text-xs text-muted-foreground mt-2">
                (Código de demostración: 488 519)
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Verificando...</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || code.length < 7}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
            >
              Verificar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="text-primary hover:text-primary/80 text-sm"
            >
              Volver al inicio
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

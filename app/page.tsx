'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // simulate login process
    if (email.trim()) {
      // store user data in sessionStorage for demo purposes
      sessionStorage.setItem('userEmail', email)
      sessionStorage.setItem('isLoggedIn', 'false') // not fully logged in yet, MFA needed
      setTimeout(() => {
        router.push('/mfa')
      }, 500)
    } else {
      setError('Please enter a valid email')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <div className="p-8">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">🐾</span>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold mb-2 text-foreground">
            Inicia sesión en
          </h1>
          <p className="text-center text-muted-foreground mb-8">DiagnovetAI</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email o nombre de usuario
              </label>
              <Input
                type="text"
                placeholder="Email o nombre de usuario"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">Procesando...</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
            >
              Continuar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {'¿No tienes cuenta? '}
              <a href="#" className="text-primary hover:underline font-semibold">
                Regístrate en DiagnovetAI
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

type Language = 'es' | 'en'

const translations = {
  es: {
    signIn: 'Inicia sesión',
    veterinarian: 'Veterinario',
    emailLabel: 'Email o nombre de usuario',
    emailPlaceholder: 'Email o nombre de usuario',
    processing: 'Procesando...',
    continue: 'Continuar',
    noAccount: '¿No tienes cuenta?',
    signup: 'Regístrate en DiagnovetAI',
    invalidEmail: 'Por favor ingresa un email válido',
    back: '← Volver',
    language: 'Idioma',
  },
  en: {
    signIn: 'Sign in',
    veterinarian: 'Veterinarian',
    emailLabel: 'Email or username',
    emailPlaceholder: 'Email or username',
    processing: 'Processing...',
    continue: 'Continue',
    noAccount: "Don't have an account?",
    signup: 'Sign up on DiagnovetAI',
    invalidEmail: 'Please enter a valid email',
    back: '← Back',
    language: 'Language',
  },
}

export default function VeterinarianLoginPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('es')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('uiLanguage') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    } else {
      const loginLanguage = sessionStorage.getItem('loginLanguage') as Language
      if (loginLanguage) {
        setLanguage(loginLanguage)
      }
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    sessionStorage.setItem('uiLanguage', lang)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // simulate login process
    if (email.trim()) {
      // store user data in sessionStorage for demo purposes
      sessionStorage.setItem('userEmail', email)
      sessionStorage.setItem('userRole', 'veterinarian')
      sessionStorage.setItem('isLoggedIn', 'false') // not fully logged in yet, MFA needed
      sessionStorage.setItem('uiLanguage', language)
      
      setTimeout(() => {
        setLoading(false)
        router.push('/mfa')
      }, 500)
    } else {
      setError(t.invalidEmail)
      setLoading(false)
    }
  }

  const handleBack = () => {
    router.push('/')
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary flex items-center justify-center p-4 relative">
      <div className="absolute top-6 right-6 flex items-center gap-2 bg-white rounded-lg shadow-md p-2">
        <span className="text-xs font-semibold text-muted-foreground px-2">{t.language}:</span>
        <button
          onClick={() => handleLanguageChange('es')}
          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
            language === 'es'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          ES
        </button>
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 rounded text-sm font-medium transition-all ${
            language === 'en'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          EN
        </button>
      </div>

      <Card className="w-full max-w-md border-0 shadow-lg">
        <div className="p-8">
          <button
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground text-sm font-medium mb-6 flex items-center gap-2"
          >
            {t.back}
          </button>

          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">🐾</span>
            </div>
          </div>

          <h1 className="text-center text-2xl font-bold mb-2 text-foreground">
            {t.signIn}
          </h1>
          <p className="text-center text-muted-foreground mb-8">{t.veterinarian} - DiagnovetAI</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.emailLabel}
              </label>
              <Input
                type="text"
                placeholder={t.emailPlaceholder}
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
                <span className="ml-2 text-sm text-muted-foreground">{t.processing}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
            >
              {t.continue}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t.noAccount}
              {' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-primary hover:underline font-semibold bg-none border-none cursor-pointer"
              >
                {t.signup}
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

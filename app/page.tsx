'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type Language = 'es' | 'en'

const translations = {
  es: {
    welcome: 'Bienvenido a DiagnovetAI',
    selectRole: 'Selecciona el tipo de cuenta con la que deseas ingresar',
    veterinarian: 'Veterinario',
    veterinarianDesc: 'Acceso al panel de administración para gestionar reportes y turnos',
    loginAsVet: 'Ingresar como Veterinario',
    client: 'Cliente',
    clientDesc: 'Solicita consultas y turnos con nuestros veterinarios especializados',
    loginAsClient: 'Ingresar como Cliente',
    noAccount: '¿No tienes cuenta?',
    signup: 'Regístrate en DiagnovetAI',
    language: 'Idioma',
  },
  en: {
    welcome: 'Welcome to DiagnovetAI',
    selectRole: 'Select the type of account you want to sign in with',
    veterinarian: 'Veterinarian',
    veterinarianDesc: 'Access the administration panel to manage reports and appointments',
    loginAsVet: 'Sign in as Veterinarian',
    client: 'Client',
    clientDesc: 'Request consultations and appointments with our specialized veterinarians',
    loginAsClient: 'Sign in as Client',
    noAccount: "Don't have an account?",
    signup: 'Sign up on DiagnovetAI',
    language: 'Language',
  },
}

export default function RoleSelectionPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const savedLanguage = sessionStorage.getItem('loginLanguage') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    sessionStorage.setItem('loginLanguage', lang)
  }

  const handleVeterinarianLogin = () => {
    sessionStorage.setItem('uiLanguage', language)
    router.push('/login-veterinarian')
  }

  const handleClientLogin = () => {
    sessionStorage.setItem('uiLanguage', language)
    router.push('/login-client')
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

      <Card className="w-full max-w-2xl border-0 shadow-lg">
        <div className="p-12">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-3xl">🐾</span>
            </div>
          </div>

          <h1 className="text-center text-3xl font-bold mb-2 text-foreground">
            {t.welcome}
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            {t.selectRole}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👨‍⚕️</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground text-center mb-3">
                {t.veterinarian}
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {t.veterinarianDesc}
              </p>
              <Button
                onClick={handleVeterinarianLogin}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {t.loginAsVet}
              </Button>
            </div>

            <div className="border-2 border-border rounded-lg p-8 hover:border-primary hover:shadow-lg transition-all cursor-pointer">
              <div className="flex justify-center mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-foreground text-center mb-3">
                {t.client}
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                {t.clientDesc}
              </p>
              <Button
                onClick={handleClientLogin}
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                {t.loginAsClient}
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
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

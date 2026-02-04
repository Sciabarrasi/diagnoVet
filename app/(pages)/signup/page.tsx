'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

type Language = 'es' | 'en'

const translations = {
  es: {
    createAccount: 'Crear Cuenta',
    createNewAccount: 'Crea tu cuenta en DiagnovetAI',
    selectRole: 'Tipo de Cuenta',
    veterinarian: 'Veterinario',
    client: 'Cliente',
    email: 'Email',
    emailPlaceholder: 'tu@email.com',
    password: 'Contraseña',
    passwordPlaceholder: 'Mínimo 6 caracteres',
    confirmPassword: 'Confirmar Contraseña',
    confirmPasswordPlaceholder: 'Repite tu contraseña',
    fullName: 'Nombre Completo',
    fullNamePlaceholder: 'Juan Pérez García',
    phone: 'Teléfono',
    phonePlaceholder: '+34 666 123 456',
    signup: 'Registrarse',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    login: 'Inicia sesión aquí',
    processing: 'Procesando...',
    back: '← Volver',
    language: 'Idioma',
    selectRoleError: 'Por favor selecciona un tipo de cuenta',
    emailError: 'Por favor ingresa un email válido',
    passwordError: 'La contraseña debe tener mínimo 6 caracteres',
    passwordMismatch: 'Las contraseñas no coinciden',
    nameError: 'Por favor ingresa tu nombre completo',
    phoneError: 'Por favor ingresa un teléfono válido',
    successMessage: 'Cuenta creada exitosamente',
    redirecting: 'Redirigiendo...',
  },
  en: {
    createAccount: 'Create Account',
    createNewAccount: 'Create your account on DiagnovetAI',
    selectRole: 'Account Type',
    veterinarian: 'Veterinarian',
    client: 'Client',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    password: 'Password',
    passwordPlaceholder: 'Minimum 6 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Repeat your password',
    fullName: 'Full Name',
    fullNamePlaceholder: 'John Doe',
    phone: 'Phone',
    phonePlaceholder: '+1 666 123 456',
    signup: 'Sign Up',
    alreadyHaveAccount: 'Already have an account?',
    login: 'Sign in here',
    processing: 'Processing...',
    back: '← Back',
    language: 'Language',
    selectRoleError: 'Please select an account type',
    emailError: 'Please enter a valid email',
    passwordError: 'Password must have at least 6 characters',
    passwordMismatch: 'Passwords do not match',
    nameError: 'Please enter your full name',
    phoneError: 'Please enter a valid phone number',
    successMessage: 'Account created successfully',
    redirecting: 'Redirecting...',
  },
}

export default function SignupPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Language>('es')
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

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

  const validateForm = () => {
    if (!role) {
      setError(t.selectRoleError)
      return false
    }
    if (!email || !email.includes('@')) {
      setError(t.emailError)
      return false
    }
    if (!password || password.length < 6) {
      setError(t.passwordError)
      return false
    }
    if (password !== confirmPassword) {
      setError(t.passwordMismatch)
      return false
    }
    if (!fullName.trim()) {
      setError(t.nameError)
      return false
    }
    if (!phone.trim()) {
      setError(t.phoneError)
      return false
    }
    return true
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      // store user data in sessionStorage
      sessionStorage.setItem('userEmail', email)
      sessionStorage.setItem('userName', fullName)
      sessionStorage.setItem('userPhone', phone)
      sessionStorage.setItem('userRole', role)
      sessionStorage.setItem('isClientLoggedIn', role === 'client' ? 'true' : 'false')
      sessionStorage.setItem('isLoggedIn', role === 'veterinarian' ? 'false' : 'false')

      setSuccess(true)
      setLoading(false)

      setTimeout(() => {
        if (role === 'client') {
          router.push('/book-appointment')
        } else {
          router.push('/mfa')
        }
      }, 1500)
    }, 1000)
  }

  const handleBack = () => {
    router.push('/')
  }

  const t = translations[language]

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-b from-background to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t.successMessage}</h2>
            <p className="text-muted-foreground mb-6">{t.redirecting}</p>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        </Card>
      </div>
    )
  }

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
            {t.createAccount}
          </h1>
          <p className="text-center text-muted-foreground mb-8">{t.createNewAccount}</p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.selectRole} *
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder={t.selectRole} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veterinarian">{t.veterinarian}</SelectItem>
                  <SelectItem value="client">{t.client}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.fullName} *
              </label>
              <Input
                type="text"
                placeholder={t.fullNamePlaceholder}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.email} *
              </label>
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.phone} *
              </label>
              <Input
                type="tel"
                placeholder={t.phonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.password} *
              </label>
              <Input
                type="password"
                placeholder={t.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {t.confirmPassword} *
              </label>
              <Input
                type="password"
                placeholder={t.confirmPasswordPlaceholder}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-10"
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                {error}
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center py-3">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="ml-2 text-sm text-muted-foreground">{t.processing}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base mt-6"
            >
              {t.signup}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {t.alreadyHaveAccount}
              {' '}
              <button
                onClick={handleBack}
                className="text-primary hover:underline font-semibold bg-none border-none cursor-pointer"
              >
                {t.login}
              </button>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

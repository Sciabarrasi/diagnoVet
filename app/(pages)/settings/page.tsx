'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ClinicData {
  clinicName: string
  address: string
  phoneNumber: string
}

interface UserData {
  phoneNumber: string
  professionalTitle: string
  fullName: string
  professionalLicense: string
}

type Language = 'en' | 'es'

const translations = {
  en: {
    settings: 'Settings',
    back: '← Back',
    changesSavedSuccessfully: 'Changes saved successfully',
    errorOccurred: 'Error occurred',
    clinicSettings: 'Clinic Settings',
    myProfile: 'My Profile',
    account: 'Account',
    clinicInformation: 'Clinic Information',
    clinicName: 'Clinic Name',
    enterClinicName: 'Enter clinic name',
    address: 'Address',
    enterClinicAddress: 'Enter clinic address',
    phoneNumber: 'Phone Number',
    enterPhoneNumber: 'Enter phone number',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    professionalProfile: 'Professional Profile',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    professionalTitle: 'Professional Title',
    selectTitle: 'Select title',
    veterinarian: 'Veterinarian',
    veterinaryTechnician: 'Veterinary Technician',
    veterinaryAssistant: 'Veterinary Assistant',
    veterinarySurgeon: 'Veterinary Surgeon',
    professionalLicense: 'Professional License (Optional)',
    licenseExample: 'E.g. MP 12345',
    accountSettings: 'Account Settings',
    manageAccount: 'Manage your account security and preferences',
    logout: '🚪 Logout',
    language: 'Language',
    selectLanguage: 'Select your preferred language',
    languageSettings: 'Language Settings',
    isRequired: 'is required',
  },
  es: {
    settings: 'Configuración',
    back: '← Atrás',
    changesSavedSuccessfully: 'Cambios guardados exitosamente',
    errorOccurred: 'Ocurrió un error',
    clinicSettings: 'Configuración de Clínica',
    myProfile: 'Mi Perfil',
    account: 'Cuenta',
    clinicInformation: 'Información de la Clínica',
    clinicName: 'Nombre de la Clínica',
    enterClinicName: 'Ingrese el nombre de la clínica',
    address: 'Dirección',
    enterClinicAddress: 'Ingrese la dirección de la clínica',
    phoneNumber: 'Número de Teléfono',
    enterPhoneNumber: 'Ingrese el número de teléfono',
    saveChanges: 'Guardar Cambios',
    cancel: 'Cancelar',
    professionalProfile: 'Perfil Profesional',
    fullName: 'Nombre Completo',
    enterFullName: 'Ingrese su nombre completo',
    professionalTitle: 'Título Profesional',
    selectTitle: 'Seleccionar título',
    veterinarian: 'Veterinario',
    veterinaryTechnician: 'Técnico Veterinario',
    veterinaryAssistant: 'Asistente Veterinario',
    veterinarySurgeon: 'Cirujano Veterinario',
    professionalLicense: 'Licencia Profesional (Opcional)',
    licenseExample: 'E.j. MP 12345',
    accountSettings: 'Configuración de Cuenta',
    manageAccount: 'Administre la seguridad y preferencias de su cuenta',
    logout: '🚪 Cerrar Sesión',
    language: 'Idioma',
    selectLanguage: 'Seleccione su idioma preferido',
    languageSettings: 'Configuración de Idioma',
    isRequired: 'es requerido',
  },
}

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('clinic')
  const [showMessage, setShowMessage] = useState(false)
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [language, setLanguage] = useState<Language>('en')
  const [clinicData, setClinicData] = useState<ClinicData>({
    clinicName: '',
    address: '',
    phoneNumber: '',
  })
  const [userData, setUserData] = useState<UserData>({
    phoneNumber: '',
    professionalTitle: '',
    fullName: '',
    professionalLicense: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/')
      return
    }

    // load language preference
    const savedLanguage = sessionStorage.getItem('language') as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }

    // load clinic data
    const clinicStr = sessionStorage.getItem('clinicData')
    if (clinicStr) {
      try {
        setClinicData(JSON.parse(clinicStr))
      } catch (e) {
        // fallback to empty clinic data
      }
    }

    // load user data
    const userStr = sessionStorage.getItem('userData')
    if (userStr) {
      try {
        setUserData(JSON.parse(userStr))
      } catch (e) {
        // fallback to empty user data
      }
    }
  }, [router])

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  const handleClinicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setClinicData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateClinicForm = () => {
    const newErrors: Record<string, string> = {}
    if (!clinicData.clinicName.trim()) {
      newErrors.clinicName = 'Clinic name is required'
    }
    if (!clinicData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    if (!clinicData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateUserForm = () => {
    const newErrors: Record<string, string> = {}
    if (!userData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    if (!userData.professionalTitle.trim()) {
      newErrors.professionalTitle = 'Professional title is required'
    }
    if (!userData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSaveClinic = () => {
    if (!validateClinicForm()) return
    sessionStorage.setItem('clinicData', JSON.stringify(clinicData))
    setMessageType('success')
    setShowMessage(true)
  }

  const handleSaveUser = () => {
    if (!validateUserForm()) return
    sessionStorage.setItem('userData', JSON.stringify(userData))
    setMessageType('success')
    setShowMessage(true)
  }

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/')
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    sessionStorage.setItem('language', lang)
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push('/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              {t.back}
            </Button>
            <span className="text-lg font-semibold text-foreground">{t.settings}</span>
          </div>
        </div>
      </header>

      {showMessage && (
        <div className="fixed top-20 left-4 right-4 max-w-md bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 z-50">
          <div className="text-green-600 text-lg">✓</div>
          <div>
            <p className="font-semibold text-green-900 text-sm">
              {messageType === 'success' ? t.changesSavedSuccessfully : t.errorOccurred}
            </p>
          </div>
        </div>
      )}

      <main className="p-4 md:p-6 max-w-2xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="clinic">{t.clinicSettings}</TabsTrigger>
            <TabsTrigger value="profile">{t.myProfile}</TabsTrigger>
            <TabsTrigger value="language">{t.language}</TabsTrigger>
            <TabsTrigger value="account">{t.account}</TabsTrigger>
          </TabsList>

          <TabsContent value="clinic" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t.clinicInformation}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.clinicName}
                  </label>
                  <Input
                    type="text"
                    name="clinicName"
                    placeholder={t.enterClinicName}
                    value={clinicData.clinicName}
                    onChange={handleClinicChange}
                    className="h-10"
                  />
                  {errors.clinicName && (
                    <p className="text-xs text-destructive mt-1">{errors.clinicName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.address}
                  </label>
                  <Input
                    type="text"
                    name="address"
                    placeholder={t.enterClinicAddress}
                    value={clinicData.address}
                    onChange={handleClinicChange}
                    className="h-10"
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.phoneNumber}
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder={t.enterPhoneNumber}
                    value={clinicData.phoneNumber}
                    onChange={handleClinicChange}
                    className="h-10"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="pt-4 flex gap-2">
                  <Button
                    onClick={handleSaveClinic}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {t.saveChanges}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                    className="text-muted-foreground"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t.professionalProfile}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.fullName}
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder={t.enterFullName}
                    value={userData.fullName}
                    onChange={handleUserChange}
                    className="h-10"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.professionalTitle}
                  </label>
                  <Select value={userData.professionalTitle} onValueChange={(value) => {
                    setUserData((prev) => ({
                      ...prev,
                      professionalTitle: value,
                    }))
                  }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder={t.selectTitle} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veterinarian">{t.veterinarian}</SelectItem>
                      <SelectItem value="technician">{t.veterinaryTechnician}</SelectItem>
                      <SelectItem value="assistant">{t.veterinaryAssistant}</SelectItem>
                      <SelectItem value="surgeon">{t.veterinarySurgeon}</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.professionalTitle && (
                    <p className="text-xs text-destructive mt-1">{errors.professionalTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.phoneNumber}
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder={t.enterPhoneNumber}
                    value={userData.phoneNumber}
                    onChange={handleUserChange}
                    className="h-10"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    {t.professionalLicense}
                  </label>
                  <Input
                    type="text"
                    name="professionalLicense"
                    placeholder={t.licenseExample}
                    value={userData.professionalLicense}
                    onChange={handleUserChange}
                    className="h-10"
                  />
                </div>

                <div className="pt-4 flex gap-2">
                  <Button
                    onClick={handleSaveUser}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  >
                    {t.saveChanges}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                    className="text-muted-foreground"
                  >
                    {t.cancel}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="language" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t.languageSettings}</h2>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t.selectLanguage}
                </p>

                <div className="pt-2">
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    {t.language}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleLanguageChange('en')}
                      className={`h-12 font-semibold transition-all ${
                        language === 'en'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      🇬🇧 English
                    </Button>
                    <Button
                      onClick={() => handleLanguageChange('es')}
                      className={`h-12 font-semibold transition-all ${
                        language === 'es'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                    >
                      🇪🇸 Español
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t.accountSettings}</h2>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {t.manageAccount}
                </p>

                <div className="pt-4">
                  <Button
                    onClick={handleLogout}
                    className="bg-destructive hover:bg-destructive/90 text-white font-semibold"
                  >
                    {t.logout}
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

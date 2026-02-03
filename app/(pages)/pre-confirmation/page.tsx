'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

export default function PreConfirmationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    clinicName: '',
    address: '',
    phoneNumber: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const mfaVerified = sessionStorage.getItem('mfaVerified')
    const email = sessionStorage.getItem('userEmail')
    if (!mfaVerified) {
      router.push('/')
      return
    }
    setUserEmail(email || '')
  }, [router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.clinicName.trim()) {
      newErrors.clinicName = 'El nombre de la clínica es requerido'
    }
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida'
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'El número de teléfono es requerido'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    // store clinic information
    sessionStorage.setItem('clinicData', JSON.stringify(formData))
    sessionStorage.setItem('clinicName', formData.clinicName)

    setTimeout(() => {
      router.push('/post-confirmation')
    }, 500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-secondary py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10">
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">🐾</span>
                </div>
              </div>

              <h1 className="text-center text-2xl font-bold mb-2 text-foreground">
                Veterinary Information
              </h1>
              <p className="text-center text-muted-foreground text-sm mb-8">
                Complete your veterinary clinic data to continue
              </p>

              <form onSubmit={handleContinue} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Legal name of the veterinary clinic{' '}
                    <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    name="clinicName"
                    placeholder="E.g. Veterinary Clinic San Juan"
                    value={formData.clinicName}
                    onChange={handleChange}
                    className="h-10"
                  />
                  {errors.clinicName && (
                    <p className="text-xs text-destructive mt-1">{errors.clinicName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="E.g. Main Ave 123, City"
                    value={formData.address}
                    onChange={handleChange}
                    className="h-10"
                  />
                  {errors.address && (
                    <p className="text-xs text-destructive mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="E.g. +1 555 123-4567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="h-10"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-6"
                >
                  {loading ? 'Processing...' : 'Continue'} →
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex gap-3">
                  <div className="text-primary mt-0.5 shrink-0">✓</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-2">
                      Why do we need this information?
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Identify your clinic in the system</li>
                      <li>• Facilitate communication with clients</li>
                      <li>• Comply with legal requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center bg-secondary p-8">
              <div className="relative w-full h-64 flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <div className="text-6xl">🐕</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

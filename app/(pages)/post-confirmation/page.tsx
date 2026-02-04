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

export default function PostConfirmationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: '',
    professionalTitle: '',
    fullName: '',
    professionalLicense: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const clinicData = sessionStorage.getItem('clinicData')
    if (!clinicData) {
      router.push('/')
      return
    }
  }, [router])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required'
    }
    if (!formData.professionalTitle.trim()) {
      newErrors.professionalTitle = 'Professional title is required'
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    // professional license is optional
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setShowSuccessMessage(true)

    // store user profile information
    sessionStorage.setItem('userData', JSON.stringify(formData))
    sessionStorage.setItem('isLoggedIn', 'true')
    sessionStorage.setItem('userName', formData.fullName)

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
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
      {showSuccessMessage && (
        <div className="fixed top-4 left-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <div className="text-green-600 text-xl">✓</div>
          <div>
            <p className="font-semibold text-green-900 text-sm">
              Veterinary clinic created successfully
            </p>
          </div>
        </div>
      )}

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
                Almost done...
              </h1>
              <p className="text-center text-muted-foreground text-sm mb-8">
                We need to ask you for a couple more details to improve the experience:
              </p>

              <form onSubmit={handleContinue} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    placeholder="40"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="h-10"
                  />
                  {errors.phoneNumber && (
                    <p className="text-xs text-destructive mt-1">{errors.phoneNumber}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Professional Title <span className="text-destructive">*</span>
                  </label>
                  <Select value={formData.professionalTitle} onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      professionalTitle: value,
                    }))
                    if (errors.professionalTitle) {
                      setErrors((prev) => ({
                        ...prev,
                        professionalTitle: '',
                      }))
                    }
                  }}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veterinarian">Veterinarian</SelectItem>
                      <SelectItem value="technician">Veterinary Technician</SelectItem>
                      <SelectItem value="assistant">Veterinary Assistant</SelectItem>
                      <SelectItem value="surgeon">Veterinary Surgeon</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.professionalTitle && (
                    <p className="text-xs text-destructive mt-1">{errors.professionalTitle}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Fernanda Barbero"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="h-10"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Professional License{' '}
                    <span className="text-muted-foreground text-xs font-normal">(Optional)</span>
                  </label>
                  <Input
                    type="text"
                    name="professionalLicense"
                    placeholder="E.g. MP 12345"
                    value={formData.professionalLicense}
                    onChange={handleChange}
                    className="h-10"
                  />
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
                      <li>• Personalize your professional profile</li>
                      <li>• Show your credentials to clients</li>
                      <li>• Generate reports with your information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center justify-center bg-secondary p-8">
              <div className="relative w-full h-64 flex items-center justify-center">
                <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                  <div className="text-6xl">🐶</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

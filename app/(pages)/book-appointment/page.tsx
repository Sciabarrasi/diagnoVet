'use client'

import React from 'react'
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

interface Veterinarian {
  id: string
  name: string
  specialty: string
}

interface AppointmentFormData {
  veterinarian: string
  ownerName: string
  animalType: string
  breed: string
  gender: string
  consultationReason: string
}

interface FormErrors {
  [key: string]: string
}

export default function BookAppointmentPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [formData, setFormData] = useState<AppointmentFormData>({
    veterinarian: '',
    ownerName: '',
    animalType: '',
    breed: '',
    gender: '',
    consultationReason: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const isClientLoggedIn = sessionStorage.getItem('isClientLoggedIn')
    if (isClientLoggedIn !== 'true') {
      router.push('/')
      return
    }
    setAuthorized(true)
  }, [router])

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // hardcoded veterinarians
  const veterinarians: Veterinarian[] = [
    {
      id: 'vet1',
      name: 'Dr. Ana Martinez',
      specialty: 'Ultrasound Specialist',
    },
    {
      id: 'vet2',
      name: 'Dr. Carlos Ruiz',
      specialty: 'Radiography Specialist',
    },
    {
      id: 'vet3',
      name: 'Dr. Sofia Hernandez',
      specialty: 'Ultrasound Specialist',
    },
  ]

  const animalTypes = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Hamster', 'Guinea Pig', 'Other']
  const genders = ['Male', 'Female']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.veterinarian.trim()) {
      newErrors.veterinarian = 'Please select a veterinarian'
    }
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Full name is required'
    }
    if (!formData.animalType) {
      newErrors.animalType = 'Animal type is required'
    }
    if (!formData.breed.trim()) {
      newErrors.breed = 'Breed is required'
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required'
    }
    if (!formData.consultationReason.trim()) {
      newErrors.consultationReason = 'Consultation reason is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      // save appointment to sessionStorage
      const appointments = JSON.parse(
        sessionStorage.getItem('appointments') || '[]'
      )
      const newAppointment = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
        status: 'pending',
      }
      appointments.unshift(newAppointment)
      sessionStorage.setItem('appointments', JSON.stringify(appointments))

      setLoading(false)
      setSubmitted(true)

      setTimeout(() => {
        router.push('/my-appointments')
      }, 2000)
    }, 500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl">
              ✓
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Appointment Booked!
          </h2>
          <p className="text-muted-foreground mb-4">
            Your appointment has been successfully requested. Redirecting to dashboard...
          </p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push('/my-appointments')}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back
            </Button>
            <span className="text-lg font-semibold text-foreground">Book Appointment</span>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-4xl mx-auto">
        <Card className="p-6 md:p-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Schedule a Consultation</h1>
          <p className="text-muted-foreground mb-6">
            Fill in the details below to request an appointment with one of our veterinarians
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Select Veterinarian *
              </label>
              <Select
                value={formData.veterinarian}
                onValueChange={(value) => handleSelectChange('veterinarian', value)}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Choose a veterinarian" />
                </SelectTrigger>
                <SelectContent>
                  {veterinarians.map((vet) => (
                    <SelectItem key={vet.id} value={vet.name}>
                      <div>
                        <p className="font-medium">{vet.name}</p>
                        <p className="text-xs text-muted-foreground">{vet.specialty}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.veterinarian && (
                <p className="text-xs text-destructive mt-1">{errors.veterinarian}</p>
              )}
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Owner Information</h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="ownerName"
                  placeholder="Enter your full name"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="h-10"
                />
                {errors.ownerName && (
                  <p className="text-xs text-destructive mt-1">{errors.ownerName}</p>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Animal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Animal Type *
                  </label>
                  <Select
                    value={formData.animalType}
                    onValueChange={(value) => handleSelectChange('animalType', value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select animal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {animalTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.animalType && (
                    <p className="text-xs text-destructive mt-1">{errors.animalType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Breed *
                  </label>
                  <Input
                    type="text"
                    name="breed"
                    placeholder="Enter breed"
                    value={formData.breed}
                    onChange={handleChange}
                    className="h-10"
                  />
                  {errors.breed && (
                    <p className="text-xs text-destructive mt-1">{errors.breed}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Gender *
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange('gender', value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender}>
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-xs text-destructive mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Reason for Consultation *
              </label>
              <textarea
                name="consultationReason"
                placeholder="Describe the reason for the appointment (symptoms, regular checkup, etc.)"
                value={formData.consultationReason}
                onChange={handleChange}
                className="w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              {errors.consultationReason && (
                <p className="text-xs text-destructive mt-1">{errors.consultationReason}</p>
              )}
            </div>

            <div className="flex gap-3 pt-6 border-t border-border">
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex-1"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}

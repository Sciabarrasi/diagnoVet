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
import { ArrowLeft, CheckCircle } from 'lucide-react'

interface ReportFormData {
  admissionDate: string
  animalName: string
  age: string
  species: string
  breed: string
  weight: string
  gender: string
  isCastrated: boolean
  
  referralDoctorName: string
  referralDoctorEmail: string
  
  tutorName: string
  tutorPhone: string
  
  studyType: string
  consultationReason: string
  studyReason: string
  status: string
}

export default function NewReportPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ReportFormData>({
    admissionDate: new Date().toISOString().split('T')[0],
    animalName: '',
    age: '',
    species: '',
    breed: '',
    weight: '',
    gender: '',
    isCastrated: false,
    referralDoctorName: '',
    referralDoctorEmail: '',
    tutorName: '',
    tutorPhone: '',
    studyType: '',
    consultationReason: '',
    studyReason: '',
    status: 'En progreso',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/')
    }
  }, [router])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // validate form fields
    if (!formData.animalName.trim()) newErrors.animalName = 'Animal name is required'
    if (!formData.age.trim()) newErrors.age = 'Age is required'
    if (!formData.species) newErrors.species = 'Species is required'
    if (!formData.breed.trim()) newErrors.breed = 'Breed is required'
    if (!formData.weight.trim()) newErrors.weight = 'Weight is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.referralDoctorName.trim()) newErrors.referralDoctorName = 'Doctor name is required'
    if (!formData.referralDoctorEmail.trim()) newErrors.referralDoctorEmail = 'Doctor email is required'
    if (!formData.tutorName.trim()) newErrors.tutorName = 'Tutor name is required'
    if (!formData.tutorPhone.trim()) newErrors.tutorPhone = 'Tutor phone is required'
    if (!formData.studyType) newErrors.studyType = 'Study type is required'
    if (!formData.consultationReason.trim()) newErrors.consultationReason = 'Consultation reason is required'
    if (!formData.studyReason.trim()) newErrors.studyReason = 'Study reason is required'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.referralDoctorEmail && !emailRegex.test(formData.referralDoctorEmail)) {
      newErrors.referralDoctorEmail = 'Invalid email format'
    }

    if (formData.weight && isNaN(Number(formData.weight))) {
      newErrors.weight = 'Weight must be a number'
    }

    if (formData.age && isNaN(Number(formData.age))) {
      newErrors.age = 'Age must be a number'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    setTimeout(() => {
      const reports = JSON.parse(sessionStorage.getItem('reports') || '[]')
      const newReport = {
        id: Date.now().toString(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
      }
      reports.unshift(newReport)
      sessionStorage.setItem('reports', JSON.stringify(reports))

      setLoading(false)
      setSubmitted(true)

      // redirect to dashboard
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }, 500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Report Created!</h2>
          <p className="text-muted-foreground mb-4">
            The animal report has been successfully created. Redirecting to dashboard...
          </p>
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 md:px-6 md:py-6 flex items-center gap-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Create New Report</h1>
            <p className="text-sm text-muted-foreground">Complete all fields to register the new patient</p>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 md:px-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Patient Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Admission Date *
                </label>
                <Input
                  type="date"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Animal Name *
                </label>
                <Input
                  type="text"
                  name="animalName"
                  placeholder="E.g. Max"
                  value={formData.animalName}
                  onChange={handleChange}
                  className={`h-10 ${errors.animalName ? 'border-destructive' : ''}`}
                />
                {errors.animalName && (
                  <p className="text-xs text-destructive mt-1">{errors.animalName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Age (years) *
                </label>
                <Input
                  type="number"
                  name="age"
                  placeholder="E.g. 5"
                  value={formData.age}
                  onChange={handleChange}
                  className={`h-10 ${errors.age ? 'border-destructive' : ''}`}
                  step="0.1"
                />
                {errors.age && (
                  <p className="text-xs text-destructive mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Species *
                </label>
                <Select
                  value={formData.species}
                  onValueChange={(value) => handleSelectChange('species', value)}
                >
                  <SelectTrigger className={`h-10 ${errors.species ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select species" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="bird">Bird</SelectItem>
                    <SelectItem value="rabbit">Rabbit</SelectItem>
                    <SelectItem value="hamster">Hamster</SelectItem>
                    <SelectItem value="guinea_pig">Guinea Pig</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.species && (
                  <p className="text-xs text-destructive mt-1">{errors.species}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Breed *
                </label>
                <Input
                  type="text"
                  name="breed"
                  placeholder="E.g. Golden Retriever"
                  value={formData.breed}
                  onChange={handleChange}
                  className={`h-10 ${errors.breed ? 'border-destructive' : ''}`}
                />
                {errors.breed && (
                  <p className="text-xs text-destructive mt-1">{errors.breed}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Weight (kg) *
                </label>
                <Input
                  type="number"
                  name="weight"
                  placeholder="E.g. 25.5"
                  value={formData.weight}
                  onChange={handleChange}
                  className={`h-10 ${errors.weight ? 'border-destructive' : ''}`}
                  step="0.1"
                />
                {errors.weight && (
                  <p className="text-xs text-destructive mt-1">{errors.weight}</p>
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
                  <SelectTrigger className={`h-10 ${errors.gender ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-xs text-destructive mt-1">{errors.gender}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isCastrated"
                  checked={formData.isCastrated}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border cursor-pointer"
                />
                <span className="text-sm font-medium text-foreground">Castrated/Spayed</span>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Referral Doctor Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="referralDoctorName"
                  placeholder="E.g. Dr. John Smith"
                  value={formData.referralDoctorName}
                  onChange={handleChange}
                  className={`h-10 ${errors.referralDoctorName ? 'border-destructive' : ''}`}
                />
                {errors.referralDoctorName && (
                  <p className="text-xs text-destructive mt-1">{errors.referralDoctorName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="referralDoctorEmail"
                  placeholder="E.g. doctor@clinic.com"
                  value={formData.referralDoctorEmail}
                  onChange={handleChange}
                  className={`h-10 ${errors.referralDoctorEmail ? 'border-destructive' : ''}`}
                />
                {errors.referralDoctorEmail && (
                  <p className="text-xs text-destructive mt-1">{errors.referralDoctorEmail}</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Tutor (Owner) Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Full Name *
                </label>
                <Input
                  type="text"
                  name="tutorName"
                  placeholder="E.g. Maria Garcia"
                  value={formData.tutorName}
                  onChange={handleChange}
                  className={`h-10 ${errors.tutorName ? 'border-destructive' : ''}`}
                />
                {errors.tutorName && (
                  <p className="text-xs text-destructive mt-1">{errors.tutorName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Phone Number *
                </label>
                <Input
                  type="tel"
                  name="tutorPhone"
                  placeholder="E.g. +1 555 123-4567"
                  value={formData.tutorPhone}
                  onChange={handleChange}
                  className={`h-10 ${errors.tutorPhone ? 'border-destructive' : ''}`}
                />
                {errors.tutorPhone && (
                  <p className="text-xs text-destructive mt-1">{errors.tutorPhone}</p>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Study Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Study Type *
                </label>
                <Select
                  value={formData.studyType}
                  onValueChange={(value) => handleSelectChange('studyType', value)}
                >
                  <SelectTrigger className={`h-10 ${errors.studyType ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select study type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="radiography">Radiography (X-Ray)</SelectItem>
                    <SelectItem value="ultrasound">Ultrasound (Ecography)</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
                {errors.studyType && (
                  <p className="text-xs text-destructive mt-1">{errors.studyType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Status *
                </label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleSelectChange('status', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="En progreso">In Progress</SelectItem>
                    <SelectItem value="Finalizado">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Consultation Reason *
                </label>
                <textarea
                  name="consultationReason"
                  placeholder="Describe the reason for the consultation..."
                  value={formData.consultationReason}
                  onChange={handleChange}
                  className={`w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    errors.consultationReason ? 'border-destructive' : ''
                  }`}
                />
                {errors.consultationReason && (
                  <p className="text-xs text-destructive mt-1">{errors.consultationReason}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Reason for Study (Radiography/Ultrasound) *
                </label>
                <textarea
                  name="studyReason"
                  placeholder="Describe the specific reason for this imaging study..."
                  value={formData.studyReason}
                  onChange={handleChange}
                  className={`w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    errors.studyReason ? 'border-destructive' : ''
                  }`}
                />
                {errors.studyReason && (
                  <p className="text-xs text-destructive mt-1">{errors.studyReason}</p>
                )}
              </div>
            </div>
          </Card>

          <div className="flex gap-3 sticky bottom-0 bg-background py-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1 md:flex-initial h-10 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 md:flex-initial h-10 bg-primary hover:bg-primary/90"
            >
              {loading ? 'Creating Report...' : 'Create Report'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Appointment {
  id: string
  veterinarian: string
  ownerName: string
  animalType: string
  breed: string
  gender: string
  consultationReason: string
  date: string
  status: string
}

export default function MyAppointmentsPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [clientEmail, setClientEmail] = useState('')

  useEffect(() => {
    const isClientLoggedIn = sessionStorage.getItem('isClientLoggedIn')
    const email = sessionStorage.getItem('clientEmail')
    
    if (isClientLoggedIn !== 'true') {
      router.push('/')
      return
    }
    
    setClientEmail(email || '')
    setAuthorized(true)
    
    // load appointments from sessionStorage
    const savedAppointments = JSON.parse(
      sessionStorage.getItem('appointments') || '[]'
    )
    setAppointments(savedAppointments)
  }, [router])

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/')
  }

  const handleBookNew = () => {
    router.push('/book-appointment')
  }

  const handleCancelAppointment = (appointmentId: string) => {
    const updated = appointments.filter((apt) => apt.id !== appointmentId)
    setAppointments(updated)
    sessionStorage.setItem('appointments', JSON.stringify(updated))
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="px-6 py-4 max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Appointments</h1>
              <p className="text-sm text-muted-foreground mt-1">Welcome, {clientEmail}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleBookNew}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                + New Appointment
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-foreground border-border hover:bg-secondary bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-6 max-w-6xl mx-auto">
        {appointments.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">No Appointments Yet</h2>
            <p className="text-muted-foreground mb-6">
              You haven't booked any appointments yet. Click the button below to schedule your first consultation.
            </p>
            <Button
              onClick={handleBookNew}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Book Your First Appointment
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground mb-4">Your Booked Appointments</h2>
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <span className="text-lg">📋</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {appointment.veterinarian}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.animalType} - {appointment.breed}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Owner Name</p>
                        <p className="text-foreground">{appointment.ownerName}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Gender</p>
                        <p className="text-foreground">{appointment.gender}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Consultation Reason</p>
                        <p className="text-foreground">{appointment.consultationReason}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Date</p>
                        <p className="text-foreground">{appointment.date}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Status</p>
                      <div className="inline-block">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          {appointment.status === 'pending' ? 'Pending' : 'Confirmed'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleCancelAppointment(appointment.id)}
                    variant="outline"
                    className="text-destructive border-destructive hover:bg-destructive/10 ml-4"
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

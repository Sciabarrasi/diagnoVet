'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Veterinarian {
  id: string
  name: string
  specialty: string
  avatarInitials: string
}

interface Appointment {
  id: string
  veterinarianId: string
  time: string
  date: string
  status: 'available' | 'booked'
}

interface ScheduleData {
  veterinarian: Veterinarian
  appointments: Appointment[]
}

export function AppointmentsSchedule() {
  const router = useRouter()

  // Hardcoded veterinarians
  const veterinarians: Veterinarian[] = [
    {
      id: 'vet1',
      name: 'Dr. Ana Martinez',
      specialty: 'Ultrasound Specialist',
      avatarInitials: 'AM',
    },
    {
      id: 'vet2',
      name: 'Dr. Carlos Ruiz',
      specialty: 'Radiography Specialist',
      avatarInitials: 'CR',
    },
    {
      id: 'vet3',
      name: 'Dr. Sofia Hernandez',
      specialty: 'Ultrasound Specialist',
      avatarInitials: 'SH',
    },
  ]

  // Generate dates (today and next 6 days)
  const getNextDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      days.push(date)
    }
    return days
  }

  // Hardcoded appointments
  const generateAppointments = (vetId: string, date: Date) => {
    const appointments: Appointment[] = []
    const hours = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    const dateStr = date.toISOString().split('T')[0]

    hours.forEach((hour, index) => {
      appointments.push({
        id: `${vetId}-${dateStr}-${hour}`,
        veterinarianId: vetId,
        time: hour,
        date: dateStr,
        status: index % 3 === 0 ? 'booked' : 'available',
      })
    })
    return appointments
  }

  const nextDays = getNextDays()
  const todayIndex = 0

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <Card className="p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Veterinarians Schedule</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Available appointments for today and upcoming days
          </p>
        </div>
        <Button
          onClick={() => router.push('/book-appointment')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
        >
          Book Appointment
        </Button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-min">
          {veterinarians.map((vet) => (
            <div
              key={vet.id}
              className="border border-border rounded-lg p-4 min-w-70 bg-secondary"
            >
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {vet.avatarInitials}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{vet.name}</p>
                  <p className="text-xs text-muted-foreground">{vet.specialty}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground mb-2">
                  {formatDate(nextDays[todayIndex])} - Today
                </p>
                <div className="space-y-1">
                  {generateAppointments(vet.id, nextDays[todayIndex]).map((apt) => (
                    <div
                      key={apt.id}
                      className={`text-xs py-1 px-2 rounded flex items-center justify-between ${
                        apt.status === 'available'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-red-50 text-red-700 border border-red-200'
                      }`}
                    >
                      <span className="font-medium">{apt.time}</span>
                      <span className="text-xs">
                        {apt.status === 'available' ? '✓ Free' : '✕ Booked'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">
                    Upcoming Days
                  </p>
                  <div className="space-y-1">
                    {nextDays.slice(1, 4).map((date) => {
                      const availableSlots = generateAppointments(
                        vet.id,
                        date
                      ).filter((apt) => apt.status === 'available').length

                      return (
                        <div
                          key={date.toISOString()}
                          className="text-xs flex justify-between items-center p-1.5 bg-background rounded border border-border"
                        >
                          <span className="text-foreground font-medium">
                            {formatDate(date)}
                          </span>
                          <span className="text-muted-foreground">
                            {availableSlots} slots
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
        Scroll to see all veterinarians or click "Book Appointment" to schedule a consultation
      </div>
    </Card>
  )
}

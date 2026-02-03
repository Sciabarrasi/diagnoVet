'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardHeader } from '@/components/dashboard-header'
import { PatientChart } from '@/components/patient-chart'
import { AppointmentsSchedule } from '@/components/appointments-schedule'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Report {
  id: string
  animalName: string
  species: string
  ownerName: string
  ownerPhone: string
  reason: string
  date: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [userName, setUserName] = useState('User')
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      animalName: 'Bella',
      species: 'Dog',
      ownerName: 'Maria Garcia',
      ownerPhone: '+1 555 123-4567',
      reason: 'Routine checkup',
      date: '2024-01-15',
    },
    {
      id: '2',
      animalName: 'Whiskers',
      species: 'Cat',
      ownerName: 'Juan Rodriguez',
      ownerPhone: '+1 555 234-5678',
      reason: 'Vaccination',
      date: '2024-01-14',
    },
    {
      id: '3',
      animalName: 'Max',
      species: 'Dog',
      ownerName: 'Carlos Lopez',
      ownerPhone: '+1 555 345-6789',
      reason: 'Dental cleaning',
      date: '2024-01-13',
    },
  ])
  const [searchTerm, setSearchTerm] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false) // declare setIsModalOpen variable

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    const userRole = sessionStorage.getItem('userRole')
    
    // only veterinarians can access dashboard
    if (isLoggedIn !== 'true' || userRole !== 'veterinarian') {
      router.push('/')
      return
    }
    
    setAuthorized(true)
    const name = sessionStorage.getItem('userName')

    if (isLoggedIn !== 'true') {
      router.push('/')
      return
    }

    if (name) {
      setUserName(name)
    }

    // check if just completed post-confirmation
    const clinicData = sessionStorage.getItem('clinicData')
    if (clinicData) {
      setShowMessage(true)
      sessionStorage.removeItem('clinicData')
    }
  }, [router])



  const filteredReports = reports.filter((report) =>
    report.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const chartData = [
    { name: '1st Week', pacientes: 2 },
    { name: '2nd Week', pacientes: 3 },
    { name: '3rd Week', pacientes: 4 },
    { name: '4th Week', pacientes: reports.length },
  ]

  const totalReports = reports.length
  const totalPatients = reports.length
  const activeReports = 0

  if (!authorized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        userName={userName}
        onShowMessage={showMessage}
      />

      <main className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-foreground">{totalReports}</p>
              </div>
              <div className="text-2xl">📋</div>
            </div>
            <div className="mt-4 h-12 bg-secondary rounded-lg" />
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-foreground">{totalPatients}</p>
              </div>
              <div className="text-2xl">🐾</div>
            </div>
            <div className="mt-4 h-12 bg-secondary rounded-lg" />
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Active Reports</p>
                <p className="text-3xl font-bold text-foreground">{activeReports}</p>
              </div>
              <div className="text-2xl">✨</div>
            </div>
            <div className="mt-4 h-12 bg-secondary rounded-lg" />
          </Card>
        </div>

        <AppointmentsSchedule />

        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Patients Admitted Last Month
          </h2>
          <PatientChart data={chartData} />
        </Card>

        <div className="mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search patients, guardians, referrers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10"
            />
          </div>
          <Button
            onClick={() => router.push('/create-report')}
            className="hidden sm:flex bg-foreground hover:bg-foreground/90 text-background font-semibold h-10"
          >
            ➕ CREATE NEW REPORT
          </Button>
        </div>

        {filteredReports.length > 0 ? (
          <div className="space-y-3">
            {filteredReports.map((report) => (
              <Card key={report.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-semibold text-foreground">{report.animalName}</p>
                    <p className="text-xs text-muted-foreground">{report.species}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{report.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{report.ownerPhone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{report.reason}</p>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-primary"
                      onClick={() => router.push(`/reports/${report.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reports found</p>
          </div>
        )}
      </main>


    </div>
  )
}

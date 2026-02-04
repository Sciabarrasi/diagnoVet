'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Download, Printer } from 'lucide-react'

interface ImageData {
  id: string
  name: string
  data: string
  type: string
}

interface AnalysisNote {
  imageId: string
  studyType: string
  studyReason: string
  partialObservations: string
}

interface ReportData {
  id: string
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
  date: string
  images?: ImageData[]
  analysisNotes?: AnalysisNote[]
}

export default function ReportDetailPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = params.id as string
  const [report, setReport] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn')
    if (isLoggedIn !== 'true') {
      router.push('/')
      return
    }

    // get report from sessionStorage
    const reportsJson = sessionStorage.getItem('reports')
    if (reportsJson) {
      const reports = JSON.parse(reportsJson)
      const foundReport = reports.find((r: ReportData) => r.id === reportId)
      if (foundReport) {
        setReport(foundReport)
      }
    }
    setLoading(false)
  }, [reportId, router])

  const getSpeciesLabel = (species: string) => {
    const speciesMap: Record<string, string> = {
      dog: 'Dog',
      cat: 'Cat',
      bird: 'Bird',
      rabbit: 'Rabbit',
      hamster: 'Hamster',
      guinea_pig: 'Guinea Pig',
      other: 'Other',
    }
    return speciesMap[species] || species
  }

  const getGenderLabel = (gender: string) => {
    return gender === 'male' ? 'Male' : 'Female'
  }

  const getStatusColor = (status: string) => {
    if (status === 'En progreso') {
      return 'bg-blue-50 border-blue-200 text-blue-900'
    }
    return 'bg-green-50 border-green-200 text-green-900'
  }

  const getStudyTypeLabel = (studyType: string) => {
    const typeMap: Record<string, string> = {
      radiography: 'Radiography (X-Ray)',
      ultrasound: 'Ultrasound (Ecography)',
      both: 'Both',
    }
    return typeMap[studyType] || studyType
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="gap-2 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Card className="p-8 text-center">
            <p className="text-foreground font-semibold mb-2">Report Not Found</p>
            <p className="text-muted-foreground">The report you're looking for doesn't exist.</p>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
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
                <h1 className="text-2xl font-bold text-foreground">{report.animalName}</h1>
                <p className="text-sm text-muted-foreground">Report ID: {report.id}</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-lg border text-sm font-medium ${getStatusColor(report.status)}`}>
              {report.status}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 md:px-6">
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Animal Name</p>
              <p className="text-foreground font-medium">{report.animalName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Admission Date</p>
              <p className="text-foreground font-medium">{report.admissionDate}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Species</p>
              <p className="text-foreground font-medium">{getSpeciesLabel(report.species)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Breed</p>
              <p className="text-foreground font-medium">{report.breed}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Age</p>
              <p className="text-foreground font-medium">{report.age} years</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Weight</p>
              <p className="text-foreground font-medium">{report.weight} kg</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Gender</p>
              <p className="text-foreground font-medium">{getGenderLabel(report.gender)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Castrated/Spayed</p>
              <p className="text-foreground font-medium">{report.isCastrated ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Tutor (Owner) Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Full Name</p>
              <p className="text-foreground font-medium">{report.tutorName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Phone Number</p>
              <p className="text-foreground font-medium">{report.tutorPhone}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Referral Doctor Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Full Name</p>
              <p className="text-foreground font-medium">{report.referralDoctorName}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">Email</p>
              <p className="text-primary font-medium">{report.referralDoctorEmail}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Study Information</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Study Type</p>
                <p className="text-foreground font-medium">{getStudyTypeLabel(report.studyType)}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">Report Date</p>
                <p className="text-foreground font-medium">{report.date}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Consultation Reason</p>
              <p className="text-foreground bg-secondary p-3 rounded-md">{report.consultationReason}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2">Reason for Study</p>
              <p className="text-foreground bg-secondary p-3 rounded-md">{report.studyReason}</p>
            </div>
          </div>
        </Card>

        {report.images && report.images.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Radiographs & Images ({report.images.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {report.images.map((image, index) => {
                const analysisNote = report.analysisNotes?.find(
                  (note) => note.imageId === image.id
                )
                return (
                  <div key={image.id} className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <img
                      src={image.data || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3 bg-secondary">
                      <p className="text-xs font-medium text-foreground truncate">{image.name}</p>
                      {analysisNote && analysisNote.partialObservations && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {analysisNote.partialObservations}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {report.analysisNotes && report.analysisNotes.length > 0 && (
          <Card className="p-6 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Analysis Notes by Image
            </h2>
            <div className="space-y-4">
              {report.analysisNotes.map((note, index) => {
                const image = report.images?.find((img) => img.id === note.imageId)
                return (
                  <div key={note.imageId} className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-4 mb-3">
                      {image && image.data && (
                        <img
                          src={image.data || "/placeholder.svg"}
                          alt={`Analysis ${index + 1}`}
                          className="w-20 h-20 object-cover rounded border border-border shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          Image {index + 1}: {image?.name}
                        </p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs font-medium text-muted-foreground">Study Type:</p>
                            <p className="text-sm text-foreground">
                              {note.studyType === 'radiography'
                                ? 'Radiography'
                                : note.studyType === 'ultrasound'
                                ? 'Ultrasound'
                                : 'Both'}
                            </p>
                          </div>
                          {note.partialObservations && (
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Observations:</p>
                              <p className="text-sm text-foreground">{note.partialObservations}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        <div className="flex gap-3 sticky bottom-0 bg-background py-4 border-t border-border">
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </main>
    </div>
  )
}

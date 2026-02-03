'use client'

import React from "react"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

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
  images: ImageData[]
}

export default function ReportAnalysisPage() {
  const router = useRouter()
  const [report, setReport] = useState<ReportData | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [notes, setNotes] = useState<AnalysisNote[]>([])
  const [loading, setLoading] = useState(true)

  // form state for current image
  const [currentNote, setCurrentNote] = useState<AnalysisNote>({
    imageId: '',
    studyType: '',
    studyReason: '',
    partialObservations: '',
  })

  useEffect(() => {
    const currentReportStr = sessionStorage.getItem('currentReport')
    if (!currentReportStr) {
      router.push('/create-report')
      return
    }

    try {
      const currentReport = JSON.parse(currentReportStr) as ReportData
      setReport(currentReport)

      // initialize notes for all images
      const initialNotes = currentReport.images.map((img) => ({
        imageId: img.id,
        studyType: currentReport.studyType,
        studyReason: currentReport.studyReason,
        partialObservations: '',
      }))
      setNotes(initialNotes)

      // set current note
      if (initialNotes.length > 0) {
        setCurrentNote(initialNotes[0])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error loading report:', error)
      router.push('/create-report')
    }
  }, [router])

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentNote((prev) => ({
      ...prev,
      [name]: value,
    }))

    // update notes array
    setNotes((prev) =>
      prev.map((note) =>
        note.imageId === currentNote.imageId
          ? { ...note, [name]: value }
          : note
      )
    )
  }

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
      setCurrentNote(notes[currentImageIndex - 1])
    }
  }

  const handleNextImage = () => {
    if (currentImageIndex < (report?.images.length || 0) - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
      setCurrentNote(notes[currentImageIndex + 1])
    }
  }

  const handleFinishAnalysis = () => {
    if (!report) return

    // save complete report with analysis notes
    const reports = JSON.parse(sessionStorage.getItem('reports') || '[]')
    const completeReport = {
      ...report,
      analysisNotes: notes,
    }
    reports.unshift(completeReport)
    sessionStorage.setItem('reports', JSON.stringify(reports))

    // clear temporary data
    sessionStorage.removeItem('currentReport')

    router.push('/dashboard')
  }

  if (loading || !report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </Card>
      </div>
    )
  }

  const currentImage = report.images[currentImageIndex]

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Radiograph Analysis
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {report.animalName} - {report.species}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Image {currentImageIndex + 1} of {report.images.length}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center bg-secondary rounded-lg overflow-hidden mb-4">
                <img
                  src={currentImage.data || "/placeholder.svg"}
                  alt={`Radiograph ${currentImageIndex + 1}`}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {currentImage.name}
                </p>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 h-full flex flex-col">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Analysis Notes
              </h2>

              <div className="space-y-4 flex-1">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Study Type
                  </label>
                  <div className="px-3 py-2 border border-border rounded-md bg-secondary text-foreground text-sm">
                    {currentNote.studyType === 'radiography'
                      ? 'Radiography'
                      : currentNote.studyType === 'ultrasound'
                      ? 'Ultrasound'
                      : 'Both'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Study Reason
                  </label>
                  <div className="px-3 py-2 border border-border rounded-md bg-secondary text-foreground text-sm h-20 overflow-y-auto">
                    {currentNote.studyReason}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Partial Observations
                  </label>
                  <textarea
                    name="partialObservations"
                    value={currentNote.partialObservations}
                    onChange={handleNoteChange}
                    placeholder="Write your observations about this radiograph..."
                    className="w-full h-24 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6 pt-4 border-t border-border">
                <Button
                  onClick={handlePrevImage}
                  disabled={currentImageIndex === 0}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  ← Previous
                </Button>
                <Button
                  onClick={handleNextImage}
                  disabled={currentImageIndex === report.images.length - 1}
                  variant="outline"
                  className="flex-1 bg-transparent"
                >
                  Next →
                </Button>
              </div>

              <Button
                onClick={handleFinishAnalysis}
                className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                Finish Analysis & Save
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

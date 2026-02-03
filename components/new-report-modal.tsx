'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface NewReportModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: AnimalData) => void
}

export interface AnimalData {
  animalName: string
  species: string
  ownerName: string
  ownerPhone: string
  reason: string
}

export function NewReportModal({ isOpen, onClose, onSubmit }: NewReportModalProps) {
  const [formData, setFormData] = useState<AnimalData>({
    animalName: '',
    species: '',
    ownerName: '',
    ownerPhone: '',
    reason: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      onSubmit(formData)
      setFormData({
        animalName: '',
        species: '',
        ownerName: '',
        ownerPhone: '',
        reason: '',
      })
      setLoading(false)
      onClose()
    }, 500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>
            Register a new animal that has entered the veterinary clinic
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Animal Name *
            </label>
            <Input
              type="text"
              name="animalName"
              placeholder="E.g. Max"
              value={formData.animalName}
              onChange={handleChange}
              required
              className="h-9 text-sm"
            />
          </div>

          {/* Species */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Species *
            </label>
            <Select value={formData.species} onValueChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                species: value,
              }))
            }}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dog</SelectItem>
                <SelectItem value="cat">Cat</SelectItem>
                <SelectItem value="bird">Bird</SelectItem>
                <SelectItem value="rabbit">Rabbit</SelectItem>
                <SelectItem value="hamster">Hamster</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Owner Name *
            </label>
            <Input
              type="text"
              name="ownerName"
              placeholder="E.g. John Doe"
              value={formData.ownerName}
              onChange={handleChange}
              required
              className="h-9 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Owner Phone *
            </label>
            <Input
              type="tel"
              name="ownerPhone"
              placeholder="E.g. +1 555 123-4567"
              value={formData.ownerPhone}
              onChange={handleChange}
              required
              className="h-9 text-sm"
            />
          </div>

          {/* Reason for Visit */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Reason for Visit *
            </label>
            <Input
              type="text"
              name="reason"
              placeholder="E.g. Regular checkup"
              value={formData.reason}
              onChange={handleChange}
              required
              className="h-9 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-9 text-sm bg-transparent"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 h-9 text-sm bg-primary hover:bg-primary/90"
            >
              {loading ? 'Creating...' : 'Create Report'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

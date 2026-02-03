'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

interface DashboardHeaderProps {
  userName?: string
  onShowMessage?: boolean
  onCreateReport?: () => void
}

export function DashboardHeader({
  userName = 'User',
  onShowMessage = false,
  onCreateReport = () => {},
}: DashboardHeaderProps) {
  const router = useRouter()
  const [showMessage, setShowMessage] = useState(onShowMessage)

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showMessage])

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/')
  }

  const handleSettings = () => {
    router.push('/settings')
  }

  const handleCreateReport = () => {
    router.push('/create-report')
  }

  return (
    <>
      {showMessage && (
        <div className="fixed top-4 left-4 right-4 max-w-md bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 z-50">
          <div className="text-green-600 text-lg">✓</div>
          <div>
            <p className="font-semibold text-green-900 text-sm">Information saved successfully</p>
          </div>
        </div>
      )}

      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">🐾</span>
            </div>
            <span className="text-sm font-semibold text-foreground hidden sm:inline">
              DiagnovetAI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              📊 My Studies
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              ➕ New Report
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleCreateReport}
              className="hidden sm:flex bg-foreground hover:bg-foreground/90 text-background font-semibold text-sm h-9"
            >
              ➕ CREATE NEW REPORT
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-semibold text-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">FERNANDASYVET</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="text-xs">
                  <span className="font-semibold">{userName}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSettings} className="text-xs cursor-pointer">
                  ⚙️ Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-xs cursor-pointer">
                  💬 Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-xs text-destructive cursor-pointer">
                  🚪 Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="sm:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={handleCreateReport}
          className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center"
        >
          ➕
        </Button>
      </div>
    </>
  )
}

# DiagnovetAI - Veterinary Clinic Management System

A modern management application for veterinary clinics built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features
# For Veterinarians

-Multi-Step Authentication: Role Selector → Login → MFA → Clinic Setup → Professional Profile

-Interactive Dashboard: Real-time statistics, patient charts, and appointment schedules

-Report Management: Create reports with detailed analysis of X-rays and ultrasounds

-X-ray Analysis: Two-column interface for analyzing medical images

-Image Upload: Support for multiple JPEG/PNG images with validation

-Profile Settings: Edit clinic information and professional profile

### For Clients

-Role Selector: Clear choice between Veterinarian and Client at login

-Simple Registration: Create an account with email, name, and phone

-Appointment Booking: Select a specialized veterinarian and complete pet information

-Appointment Management: View all booked appointments, cancel, and schedule new ones

-Veterinary Care: Request consultations with 3 specialized veterinarians (2 ultrasound, 1 X-ray)

### General

Language Selector: Spanish and English on all login and registration screens

Responsive Interface: Mobile-first design adaptable to all devices

Route Protection: Authentication validation on every protected route

### Technologies

Frontend: Next.js 16 (App Router)

Language: TypeScript

Styling: Tailwind CSS v4

Components: shadcn/ui

Charts: Recharts

State Management: sessionStorage (hardcoded)

## Usage Flow
### VETERINARIANS
### 1. Role Selector (Main Page)

Access http://localhost:3000

Language selector in the top-right corner (ES/EN)

Button: "Login as Veterinarian"

### 2. Veterinarian Login

Route: /login-veterinarian

Enter any valid email

Language selector available

Button: "Continue"

### 3. MFA - Two-Factor Authentication

Route: /mfa

Demo code: 488 519

Enter the code in the format: XXX XXX

### 4. Pre-Confirmation - Clinic Information

Route: /pre-confirmation

Complete the required fields:

Legal clinic name

Address

Phone number

### 5. Post-Confirmation - Professional Profile

Route: /post-confirmation

Complete the required fields:

Phone number

Professional title (dropdown)

Full name

Optional field: Professional license

### 6. Dashboard

Route: /dashboard

Appointment Schedule: Displays available slots for 3 veterinarians

Real-time statistics

Patient charts

Create new reports

Search reports by name or owner

### 7. Create New Report

Route: /reports/new or click "CREATE NEW REPORT"

Complete form:

Patient (pet) information

Referring professional information

Owner information

Study type (X-ray/Ultrasound)

Reason for consultation and study

Image upload: Multiple JPEG/PNG files

### 8. X-ray Analysis

Route: /report-analysis

Two-column interface:

Left: Large X-ray image

Right: Analysis form

Fields: Study type, reason, partial observations

Image navigation

Click "Finish Analysis & Save" to complete

### 9. Report Details

Route: /reports/[id]

View full details

Image/X-ray gallery

Analysis notes per image

Complete case information

### 10. Settings

Route: /settings

Edit clinic information

Update professional profile

Logout

### CLIENTS
### 1. Role Selector

Access http://localhost:3000

Language selector in the top-right corner

Button: "Login as Client"

### 2. Client Login

Route: /login-client

Enter email

Language selector available

Button: "Continue"

No MFA required

### 3. Registration (Alternative)

Route: /signup

Link available on any login page

Fields: Account type, name, email, phone, password

Full password validation

### 4. Book Appointment

Route: /book-appointment

Protected: Only accessible if authenticated

Veterinarian selector (dropdown with specialties)

Owner and pet information

Available pet types: Dog, Cat, Bird, Rabbit, etc.

Consultation reason (textarea)

Button "Submit Appointment Request"

### 5. My Appointments

Route: /my-appointments

View all booked appointments

Cards with: veterinarian, pet, type, owner, reason

"+ New Appointment" button

"Cancel" button for individual appointments

"Logout" button

Empty screen if no appointments exist

##Session Variables
The application uses sessionStorage to store data:

Veterinarians

userEmail

userRole

isLoggedIn

mfaVerified

clinicData

userData

userName

clinicName

uiLanguage

Clients

clientEmail

userName

userPhone

userRole

isClientLoggedIn

uiLanguage

appointments

Reports and Analysis

currentReport

reports

## Available Veterinarians

Dr. Ana Martinez – Ultrasound Specialist

Dr. Carlos Ruiz – X-ray Specialist

Dr. Sofia Hernandez – Ultrasound Specialist

## Demo Credentials

Veterinarian Email: demo@veterinaria.com

Client Email: cliente@ejemplo.com

## MFA Code: 488 519

Password: Minimum 6 characters

Supported Languages

Spanish (ES)

English (EN)

Important Notes

Persistence: Data is stored in sessionStorage and lost when the browser is closed

Authentication: Demo system with no real backend

Hardcoded Data: All data is for demonstration purposes

No Database: No real database connection

Recently Implemented Features

✅ Dual-role system

✅ Language selector

✅ Client appointment system

✅ Veterinarian dashboard

✅ Image upload

✅ Protected routes

### Recommended Future Improvements

Database integration

Real authentication with JWT

Payment system

Email/SMS notifications

PDF report export

Calendar integrations

Troubleshooting
Language selector not showing

Make sure you are on a login page

Clear browser cache

Login not redirecting

Verify sessionStorage is enabled

Use a valid email

Appointments not saving

Ensure you are logged in

Complete all required fields
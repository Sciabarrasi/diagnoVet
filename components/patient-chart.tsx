'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface PatientChartProps {
  data?: Array<{
    name: string
    pacientes: number
  }>
}

const defaultData = [
  { name: 'Week 1', pacientes: 4 },
  { name: 'Week 2', pacientes: 3 },
  { name: 'Week 3', pacientes: 7 },
  { name: 'Week 4', pacientes: 5 },
]

export function PatientChart({ data = defaultData }: PatientChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
        <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px',
          }}
          cursor={{ fill: 'rgba(20, 184, 166, 0.1)' }}
        />
        <Bar dataKey="pacientes" fill="#14b8a6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

'use client'

import { useState, useEffect } from 'react'

interface PensionResult {
  monthlyPension: number;
  totalSavings: number;
  employerContribution: number;
  employeeContribution: number;
}

export default function PensionCalculator() {
  const [salary, setSalary] = useState('')
  const [age, setAge] = useState('')
  const [retirementAge, setRetirementAge] = useState('67')
  const [result, setResult] = useState<PensionResult | null>(null)
  const [error, setError] = useState('')

  const calculatePension = () => {
    setError('')
    const monthlySalary = parseFloat(salary)
    const currentAge = parseFloat(age)
    const retireAge = parseFloat(retirementAge)

    if (!monthlySalary || !currentAge || !retireAge) {
      setError('נא למלא את כל השדות')
      return
    }

    if (currentAge >= retireAge) {
      setError('גיל הפרישה חייב להיות גדול מגיל הנוכחי')
      return
    }

    try {
      // חישוב פשוט (למטרות הדגמה)
      const yearsUntilRetirement = retireAge - currentAge
      const monthlyEmployerContribution = monthlySalary * 0.075 // 7.5% מהמשכורת
      const monthlyEmployeeContribution = monthlySalary * 0.05 // 5% מהמשכורת
      const totalMonthlyContribution = monthlyEmployerContribution + monthlyEmployeeContribution
      
      // חישוב עם ריבית שנתית של 4%
      const annualInterestRate = 0.04
      const monthlyInterestRate = annualInterestRate / 12
      const totalMonths = yearsUntilRetirement * 12
      
      const totalSavings = totalMonthlyContribution * 
        ((Math.pow(1 + monthlyInterestRate, totalMonths) - 1) / monthlyInterestRate)
      
      // חישוב פנסיה חודשית (4% מהחיסכון)
      const monthlyPension = (totalSavings * 0.04) / 12

      setResult({
        monthlyPension: Math.round(monthlyPension),
        totalSavings: Math.round(totalSavings),
        employerContribution: Math.round(monthlyEmployerContribution),
        employeeContribution: Math.round(monthlyEmployeeContribution)
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (salary && age && retirementAge) {
      calculatePension()
    }
  }, [salary, age, retirementAge])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון פנסיוני
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            משכורת חודשית (₪)
          </label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן משכורת חודשית"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            גיל נוכחי
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן גיל"
            min="18"
            max="100"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            גיל פרישה: {retirementAge}
          </label>
          <input
            type="range"
            min="60"
            max="75"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="w-full"
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-2">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                תוצאות החישוב:
              </h3>
              <div className="space-y-2">
                <p className="text-xl font-bold text-blue-600">
                  פנסיה חודשית משוערת: ₪{result.monthlyPension.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  חיסכון כולל: ₪{result.totalSavings.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  הפרשה מעביד חודשית: ₪{result.employerContribution.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  הפרשה עובד חודשית: ₪{result.employeeContribution.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
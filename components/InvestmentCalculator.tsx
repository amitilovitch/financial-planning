'use client'

import { useState, useEffect } from 'react'

interface InvestmentResult {
  futureValue: number;
  totalInvestment: number;
  totalInterest: number;
  monthlyContribution: number;
}

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [investmentPeriod, setInvestmentPeriod] = useState('10')
  const [result, setResult] = useState<InvestmentResult | null>(null)
  const [error, setError] = useState('')

  const calculateInvestment = () => {
    setError('')
    const P = parseFloat(initialInvestment)
    const PMT = parseFloat(monthlyContribution)
    const r = parseFloat(interestRate) / 100 / 12
    const t = parseFloat(investmentPeriod) * 12

    if (!r || !t) {
      setError('נא למלא את כל השדות')
      return
    }

    try {
      // חישוב ערך עתידי של ההשקעה הראשונית
      const futureValueInitial = P * Math.pow(1 + r, t)
      
      // חישוב ערך עתידי של ההפקדות החודשיות
      const futureValueContributions = PMT * 
        ((Math.pow(1 + r, t) - 1) / r)
      
      const totalFutureValue = futureValueInitial + futureValueContributions
      const totalInvestment = P + (PMT * t)
      const totalInterest = totalFutureValue - totalInvestment

      setResult({
        futureValue: Math.round(totalFutureValue),
        totalInvestment: Math.round(totalInvestment),
        totalInterest: Math.round(totalInterest),
        monthlyContribution: Math.round(PMT)
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (initialInvestment && interestRate && investmentPeriod) {
      calculateInvestment()
    }
  }, [initialInvestment, interestRate, investmentPeriod, monthlyContribution])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון השקעות
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            השקעה ראשונית (₪)
          </label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן סכום השקעה ראשונית"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            הפקדה חודשית (₪)
          </label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן סכום הפקדה חודשית"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            תשואה שנתית (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן אחוז תשואה"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            תקופת השקעה (שנים): {investmentPeriod}
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={investmentPeriod}
            onChange={(e) => setInvestmentPeriod(e.target.value)}
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
                  ערך עתידי: ₪{result.futureValue.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סכום השקעה כולל: ₪{result.totalInvestment.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  ריבית כוללת: ₪{result.totalInterest.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  הפקדה חודשית: ₪{result.monthlyContribution.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
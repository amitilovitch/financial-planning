'use client'

import { useState, useEffect } from 'react'

interface CalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('30')
  const [monthlyPayment, setMonthlyPayment] = useState('')
  const [calculationType, setCalculationType] = useState<'loan' | 'payment'>('loan')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState('')

  const calculateMortgage = () => {
    setError('')
    const r = parseFloat(interestRate) / 100 / 12
    const n = parseFloat(loanTerm) * 12

    if (!r || !n) {
      setError('נא למלא את כל השדות')
      return
    }

    try {
      if (calculationType === 'loan') {
        const P = parseFloat(loanAmount)
        if (!P || P <= 0) {
          setError('נא להזין סכום הלוואה תקין')
          return
        }
        const M = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
        const totalPayment = M * n
        const totalInterest = totalPayment - P

        setResult({
          monthlyPayment: Math.round(M),
          totalPayment: Math.round(totalPayment),
          totalInterest: Math.round(totalInterest)
        })
      } else {
        const M = parseFloat(monthlyPayment)
        if (!M || M <= 0) {
          setError('נא להזין תשלום חודשי תקין')
          return
        }
        const P = M * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))
        const totalPayment = M * n
        const totalInterest = totalPayment - P

        setResult({
          monthlyPayment: Math.round(M),
          totalPayment: Math.round(totalPayment),
          totalInterest: Math.round(totalInterest)
        })
      }
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (loanAmount && interestRate && loanTerm && calculationType === 'loan') {
      calculateMortgage()
    }
  }, [loanAmount, interestRate, loanTerm, calculationType])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון משכנתא
      </h2>
      
      <div className="space-y-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setCalculationType('loan')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              calculationType === 'loan'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            חישוב לפי סכום הלוואה
          </button>
          <button
            onClick={() => setCalculationType('payment')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              calculationType === 'payment'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            חישוב לפי תשלום חודשי
          </button>
        </div>

        {calculationType === 'loan' ? (
          <div>
            <label className="block text-gray-700 mb-2">
              סכום ההלוואה (₪)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="הזן סכום"
            />
          </div>
        ) : (
          <div>
            <label className="block text-gray-700 mb-2">
              תשלום חודשי רצוי (₪)
            </label>
            <input
              type="number"
              value={monthlyPayment}
              onChange={(e) => setMonthlyPayment(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="הזן תשלום חודשי"
            />
          </div>
        )}

        <div>
          <label className="block text-gray-700 mb-2">
            ריבית שנתית (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן אחוז ריבית"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            תקופת ההלוואה (שנים): {loanTerm}
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
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
                  תשלום חודשי: ₪{result.monthlyPayment.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סכום כולל לתשלום: ₪{result.totalPayment.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סכום ריבית כולל: ₪{result.totalInterest.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
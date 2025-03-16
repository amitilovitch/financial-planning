'use client'

import { useState, useEffect } from 'react'

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  effectiveInterestRate: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('5')
  const [loanType, setLoanType] = useState<'fixed' | 'variable'>('fixed')
  const [result, setResult] = useState<LoanResult | null>(null)
  const [error, setError] = useState('')

  const calculateLoan = () => {
    setError('')
    const P = parseFloat(loanAmount)
    const r = parseFloat(interestRate) / 100 / 12
    const t = parseFloat(loanTerm) * 12

    if (!P || !r || !t) {
      setError('נא למלא את כל השדות')
      return
    }

    try {
      let monthlyPayment: number
      let totalPayment: number
      let totalInterest: number
      let effectiveRate: number

      if (loanType === 'fixed') {
        // הלוואה בריבית קבועה
        monthlyPayment = P * (r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1)
        totalPayment = monthlyPayment * t
        totalInterest = totalPayment - P
        effectiveRate = (totalInterest / P) * 100
      } else {
        // הלוואה בריבית משתנה (למטרות הדגמה - חישוב ממוצע)
        const avgRate = r * 1.2 // הנחה של 20% עלייה בריבית
        monthlyPayment = P * (avgRate * Math.pow(1 + avgRate, t)) / (Math.pow(1 + avgRate, t) - 1)
        totalPayment = monthlyPayment * t
        totalInterest = totalPayment - P
        effectiveRate = (totalInterest / P) * 100
      }

      setResult({
        monthlyPayment: Math.round(monthlyPayment),
        totalPayment: Math.round(totalPayment),
        totalInterest: Math.round(totalInterest),
        effectiveInterestRate: Number(effectiveRate.toFixed(1))
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      calculateLoan()
    }
  }, [loanAmount, interestRate, loanTerm, loanType])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון הלוואות
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            סכום הלוואה (₪)
          </label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן סכום הלוואה"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            ריבית שנתית (%)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן ריבית שנתית"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            תקופת הלוואה (שנים): {loanTerm}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            סוג הלוואה
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setLoanType('fixed')}
              className={`flex-1 py-2 px-4 rounded-md ${
                loanType === 'fixed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              ריבית קבועה
            </button>
            <button
              onClick={() => setLoanType('variable')}
              className={`flex-1 py-2 px-4 rounded-md ${
                loanType === 'variable'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              ריבית משתנה
            </button>
          </div>
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
                  סכום כולל: ₪{result.totalPayment.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  ריבית כוללת: ₪{result.totalInterest.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  ריבית אפקטיבית: {result.effectiveInterestRate}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
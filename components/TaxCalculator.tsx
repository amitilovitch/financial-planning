'use client'

import { useState, useEffect } from 'react'

interface TaxResult {
  monthlyTax: number;
  annualTax: number;
  effectiveTaxRate: number;
  netMonthlyIncome: number;
  netAnnualIncome: number;
}

export default function TaxCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState('y')
  const [result, setResult] = useState<TaxResult | null>(null)
  const [error, setError] = useState('')

  const calculateTax = () => {
    setError('')
    const income = parseFloat(monthlyIncome)

    if (!income || income <= 0) {
      setError('נא להזין משכורת חודשית תקינה')
      return
    }

    try {
      // חישוב מס הכנסה לפי מדרגות המס בישראל
      let annualTax = 0
      const annualIncome = income * 12

      if (annualIncome <= 83520) {
        annualTax = annualIncome * 0.1
      } else if (annualIncome <= 120000) {
        annualTax = 8352 + (annualIncome - 83520) * 0.14
      } else if (annualIncome <= 173040) {
        annualTax = 8352 + 5107.2 + (annualIncome - 120000) * 0.2
      } else if (annualIncome <= 239040) {
        annualTax = 8352 + 5107.2 + 10608 + (annualIncome - 173040) * 0.31
      } else if (annualIncome <= 514920) {
        annualTax = 8352 + 5107.2 + 10608 + 20460 + (annualIncome - 239040) * 0.35
      } else {
        annualTax = 8352 + 5107.2 + 10608 + 20460 + 96558 + (annualIncome - 514920) * 0.47
      }

      const monthlyTax = annualTax / 12
      const effectiveTaxRate = (annualTax / annualIncome) * 100
      const netAnnualIncome = annualIncome - annualTax
      const netMonthlyIncome = netAnnualIncome / 12

      setResult({
        monthlyTax: Math.round(monthlyTax),
        annualTax: Math.round(annualTax),
        effectiveTaxRate: Number(effectiveTaxRate.toFixed(1)),
        netMonthlyIncome: Math.round(netMonthlyIncome),
        netAnnualIncome: Math.round(netAnnualIncome)
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (monthlyIncome) {
      calculateTax()
    }
  }, [monthlyIncome])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון מס הכנסה
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            משכורת חודשית ברוטו (₪)
          </label>
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן משכורת חודשית"
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
                  מס חודשי: ₪{result.monthlyTax.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  מס שנתי: ₪{result.annualTax.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  אחוז מס אפקטיבי: {result.effectiveTaxRate}%
                </p>
                <p className="text-gray-600">
                  הכנסה נטו חודשית: ₪{result.netMonthlyIncome.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  הכנסה נטו שנתית: ₪{result.netAnnualIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
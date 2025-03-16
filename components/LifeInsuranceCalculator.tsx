'use client'

import { useState, useEffect } from 'react'

interface InsuranceResult {
  monthlyPremium: number;
  annualPremium: number;
  totalCost: number;
  coverageAmount: number;
}

export default function LifeInsuranceCalculator() {
  const [age, setAge] = useState('')
  const [coverageAmount, setCoverageAmount] = useState('')
  const [insurancePeriod, setInsurancePeriod] = useState('20')
  const [result, setResult] = useState<InsuranceResult | null>(null)
  const [error, setError] = useState('')

  const calculateInsurance = () => {
    setError('')
    const currentAge = parseFloat(age)
    const coverage = parseFloat(coverageAmount)
    const period = parseFloat(insurancePeriod)

    if (!currentAge || !coverage || !period) {
      setError('נא למלא את כל השדות')
      return
    }

    if (currentAge < 18 || currentAge > 70) {
      setError('גיל חייב להיות בין 18 ל-70')
      return
    }

    if (coverage < 100000) {
      setError('סכום הכיסוי המינימלי הוא 100,000 ₪')
      return
    }

    try {
      // חישוב פרמיה חודשית (למטרות הדגמה)
      // הפרמיה מחושבת לפי:
      // 1. גיל המבוטח (ככל שהגיל גבוה יותר, הפרמיה גבוהה יותר)
      // 2. סכום הכיסוי (ככל שהסכום גבוה יותר, הפרמיה גבוהה יותר)
      // 3. תקופת הביטוח (ככל שהתקופה ארוכה יותר, הפרמיה נמוכה יותר)
      
      const ageFactor = 1 + (currentAge - 30) * 0.02 // 2% עלייה בכל שנה מעל גיל 30
      const coverageFactor = coverage / 1000000 // נרמול לפי מיליון ש"ח
      const periodFactor = 1 / Math.sqrt(period) // ירידה לא ליניארית עם התקופה
      
      const monthlyPremium = 100 * ageFactor * coverageFactor * periodFactor
      const annualPremium = monthlyPremium * 12
      const totalCost = annualPremium * period

      setResult({
        monthlyPremium: Math.round(monthlyPremium),
        annualPremium: Math.round(annualPremium),
        totalCost: Math.round(totalCost),
        coverageAmount: Math.round(coverage)
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (age && coverageAmount && insurancePeriod) {
      calculateInsurance()
    }
  }, [age, coverageAmount, insurancePeriod])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון ביטוח חיים
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            גיל
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן גיל"
            min="18"
            max="70"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            סכום כיסוי (₪)
          </label>
          <input
            type="number"
            value={coverageAmount}
            onChange={(e) => setCoverageAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן סכום כיסוי"
            min="100000"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            תקופת ביטוח (שנים): {insurancePeriod}
          </label>
          <input
            type="range"
            min="5"
            max="40"
            value={insurancePeriod}
            onChange={(e) => setInsurancePeriod(e.target.value)}
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
                  פרמיה חודשית: ₪{result.monthlyPremium.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  פרמיה שנתית: ₪{result.annualPremium.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  עלות כוללת: ₪{result.totalCost.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סכום כיסוי: ₪{result.coverageAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
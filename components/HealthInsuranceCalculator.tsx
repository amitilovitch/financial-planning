'use client'

import { useState, useEffect } from 'react'

interface HealthInsuranceResult {
  monthlyPremium: number;
  annualPremium: number;
  totalCost: number;
  coverageDetails: {
    hospitalization: number;
    surgeries: number;
    medications: number;
    dental: number;
  };
}

export default function HealthInsuranceCalculator() {
  const [age, setAge] = useState('')
  const [familySize, setFamilySize] = useState('1')
  const [coverageLevel, setCoverageLevel] = useState<'basic' | 'standard' | 'premium'>('standard')
  const [result, setResult] = useState<HealthInsuranceResult | null>(null)
  const [error, setError] = useState('')

  const calculateInsurance = () => {
    setError('')
    const currentAge = parseFloat(age)
    const size = parseFloat(familySize)

    if (!currentAge || !size) {
      setError('נא למלא את כל השדות')
      return
    }

    if (currentAge < 0 || currentAge > 120) {
      setError('גיל לא תקין')
      return
    }

    if (size < 1 || size > 10) {
      setError('גודל משפחה לא תקין')
      return
    }

    try {
      // חישוב פרמיה בסיסית לפי גיל
      let basePremium = 200
      if (currentAge <= 30) {
        basePremium = 150
      } else if (currentAge <= 50) {
        basePremium = 250
      } else if (currentAge <= 70) {
        basePremium = 400
      } else {
        basePremium = 600
      }

      // התאמה לפי גודל משפחה
      const familyFactor = 1 + (size - 1) * 0.5

      // התאמה לפי רמת כיסוי
      let coverageFactor = 1
      switch (coverageLevel) {
        case 'basic':
          coverageFactor = 0.8
          break
        case 'premium':
          coverageFactor = 1.3
          break
      }

      const monthlyPremium = basePremium * familyFactor * coverageFactor
      const annualPremium = monthlyPremium * 12
      const totalCost = annualPremium * 5 // הנחה של 5 שנים

      // חישוב סכומי כיסוי לפי רמת הביטוח
      const coverageDetails = {
        hospitalization: coverageLevel === 'premium' ? 1000000 : coverageLevel === 'standard' ? 500000 : 250000,
        surgeries: coverageLevel === 'premium' ? 500000 : coverageLevel === 'standard' ? 250000 : 100000,
        medications: coverageLevel === 'premium' ? 100000 : coverageLevel === 'standard' ? 50000 : 25000,
        dental: coverageLevel === 'premium' ? 50000 : coverageLevel === 'standard' ? 25000 : 10000
      }

      setResult({
        monthlyPremium: Math.round(monthlyPremium),
        annualPremium: Math.round(annualPremium),
        totalCost: Math.round(totalCost),
        coverageDetails
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  useEffect(() => {
    if (age && familySize) {
      calculateInsurance()
    }
  }, [age, familySize, coverageLevel])

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון ביטוח בריאות
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
            min="0"
            max="120"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            גודל משפחה
          </label>
          <input
            type="number"
            value={familySize}
            onChange={(e) => setFamilySize(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן גודל משפחה"
            min="1"
            max="10"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            רמת כיסוי
          </label>
          <div className="flex space-x-4">
            <button
              onClick={() => setCoverageLevel('basic')}
              className={`flex-1 py-2 px-4 rounded-md ${
                coverageLevel === 'basic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              בסיסי
            </button>
            <button
              onClick={() => setCoverageLevel('standard')}
              className={`flex-1 py-2 px-4 rounded-md ${
                coverageLevel === 'standard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              סטנדרטי
            </button>
            <button
              onClick={() => setCoverageLevel('premium')}
              className={`flex-1 py-2 px-4 rounded-md ${
                coverageLevel === 'premium'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              פרימיום
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
                  פרמיה חודשית: ₪{result.monthlyPremium.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  פרמיה שנתית: ₪{result.annualPremium.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  עלות כוללת (5 שנים): ₪{result.totalCost.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                פרטי כיסוי:
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  אשפוז: ₪{result.coverageDetails.hospitalization.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  ניתוחים: ₪{result.coverageDetails.surgeries.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  תרופות: ₪{result.coverageDetails.medications.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  טיפולי שיניים: ₪{result.coverageDetails.dental.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
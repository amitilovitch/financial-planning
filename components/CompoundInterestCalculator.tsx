'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface YearlyBreakdown {
  year: number;
  deposits: number;
  returns: number;
  totalSavings: number;
  managementFees: number;
  savingsAfterFees: number;
}

interface CompoundInterestResult {
  futureValue: number;
  totalDeposits: number;
  totalInterest: number;
  totalManagementFees: number;
  finalAmount: number;
  yearlyBreakdown: YearlyBreakdown[];
}

export default function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState('')
  const [monthlyDeposit, setMonthlyDeposit] = useState('')
  const [annualReturn, setAnnualReturn] = useState('')
  const [years, setYears] = useState('20')
  const [managementFee, setManagementFee] = useState('')
  const [result, setResult] = useState<CompoundInterestResult | null>(null)
  const [error, setError] = useState('')

  const calculateCompoundInterest = () => {
    setError('')
    const P = parseFloat(initialDeposit) || 0
    const PMT = parseFloat(monthlyDeposit) || 0
    const r = (parseFloat(annualReturn) || 0) / 100
    const t = parseFloat(years)
    const mf = (parseFloat(managementFee) || 0) / 100

    if (!t) {
      setError('נא למלא את מספר השנים')
      return
    }

    try {
      const yearlyBreakdown: YearlyBreakdown[] = []
      let previousYearTotalWithFees = P
      let previousYearTotalNoFees = P
      let cumulativeManagementFees = 0
      
      // חישוב ערכים שנתיים
      for (let year = 1; year <= t; year++) {
        const yearlyDeposits = PMT * 12
        
        // חישוב תשואה ויתרה ללא דמי ניהול
        const totalNoFees = (previousYearTotalNoFees + yearlyDeposits) * (1 + r)
        
        // חישוב תשואה ויתרה עם דמי ניהול
        const totalBeforeFees = (previousYearTotalWithFees + yearlyDeposits) * (1 + r)
        const yearlyManagementFees = totalBeforeFees * mf
        const totalAfterFees = totalBeforeFees - yearlyManagementFees
        
        // חישוב הרווחים השנתיים (לפי היתרה עם דמי ניהול)
        const yearlyReturns = totalBeforeFees - previousYearTotalWithFees - yearlyDeposits
        
        cumulativeManagementFees += yearlyManagementFees
        
        yearlyBreakdown.push({
          year,
          deposits: Math.round(year === 1 ? yearlyDeposits + P : yearlyDeposits),
          returns: Math.round(yearlyReturns),
          totalSavings: Math.round(totalNoFees), // יתרה ללא דמי ניהול
          managementFees: Math.round(yearlyManagementFees),
          savingsAfterFees: Math.round(totalAfterFees)
        })
        
        previousYearTotalWithFees = totalAfterFees
        previousYearTotalNoFees = totalNoFees
      }

      const lastYear = yearlyBreakdown[yearlyBreakdown.length - 1]
      const totalDeposits = P + (PMT * t * 12)
      const finalAmount = lastYear.savingsAfterFees
      const totalInterest = lastYear.savingsAfterFees - totalDeposits

      setResult({
        futureValue: lastYear.totalSavings,
        totalDeposits: Math.round(totalDeposits),
        totalInterest: Math.round(totalInterest),
        totalManagementFees: Math.round(cumulativeManagementFees),
        finalAmount: Math.round(finalAmount),
        yearlyBreakdown
      })
    } catch (err) {
      setError('אירעה שגיאה בחישוב')
    }
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true,
        labels: {
          font: {
            family: 'system-ui'
          }
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'שנה'
        }
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'סכום בש״ח'
        },
        ticks: {
          callback: function(tickValue: number | string) {
            const value = Number(tickValue)
            return `₪${value.toLocaleString()}`
          }
        }
      }
    }
  } as const

  const getChartData = (breakdown: YearlyBreakdown[]) => {
    return {
      labels: breakdown.map(item => item.year),
      datasets: [
        {
          label: 'יתרה אחרי דמי ניהול',
          data: breakdown.map(item => item.savingsAfterFees),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          fill: false
        },
        {
          label: 'יתרה לפני דמי ניהול',
          data: breakdown.map(item => item.totalSavings),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.5)',
          fill: false
        },
        {
          label: 'סך הפקדות מצטבר',
          data: breakdown.map((item, index) => 
            breakdown.slice(0, index + 1).reduce((sum, curr) => sum + curr.deposits, 0)
          ),
          borderColor: 'rgb(234, 179, 8)',
          backgroundColor: 'rgba(234, 179, 8, 0.5)',
          fill: false
        }
      ]
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        מחשבון ריבית דריבית
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            הפקדה חד פעמית (₪)
          </label>
          <input
            type="number"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן סכום הפקדה חד פעמית"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            הפקדה חודשית (₪)
          </label>
          <input
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(e.target.value)}
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
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן אחוז תשואה שנתית"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            מספר שנות הפקדה: {years}
          </label>
          <input
            type="range"
            min="1"
            max="40"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            דמי ניהול מצבירה (%)
          </label>
          <input
            type="number"
            value={managementFee}
            onChange={(e) => setManagementFee(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="הזן אחוז דמי ניהול"
            step="0.1"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={calculateCompoundInterest}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            חישוב
          </button>
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
                  סכום סופי: ₪{result.finalAmount.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סך הפקדות: ₪{result.totalDeposits.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סך רווחים: ₪{result.totalInterest.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  סך דמי ניהול: ₪{result.totalManagementFees.toLocaleString()}
                </p>
                <p className="text-gray-600">
                  ערך עתידי לפני דמי ניהול: ₪{result.futureValue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                גרף התפתחות החיסכון:
              </h3>
              <div className="h-[400px]">
                <Line options={chartOptions} data={getChartData(result.yearlyBreakdown)} />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                פירוט שנתי:
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">שנה</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">הפקדות</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">רווחים</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">דמי ניהול</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">יתרה לפני דמי ניהול</th>
                      <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">יתרה אחרי דמי ניהול</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.yearlyBreakdown.map((year) => (
                      <tr key={year.year} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{year.year}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₪{year.deposits.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₪{year.returns.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₪{year.managementFees.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">₪{year.totalSavings.toLocaleString()}</td>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">₪{year.savingsAfterFees.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 
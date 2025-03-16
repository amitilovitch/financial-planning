'use client'

import { useRouter } from 'next/navigation'
import Calculator from '@/components/Calculator'
import PensionCalculator from '@/components/PensionCalculator'
import InvestmentCalculator from '@/components/InvestmentCalculator'
import TaxCalculator from '@/components/TaxCalculator'
import LifeInsuranceCalculator from '@/components/LifeInsuranceCalculator'
import LoanCalculator from '@/components/LoanCalculator'
import HealthInsuranceCalculator from '@/components/HealthInsuranceCalculator'
import CompoundInterestCalculator from '@/components/CompoundInterestCalculator'

export default function CalculatorsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <button
            onClick={() => router.back()}
            className="mb-8 px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 flex items-center mx-auto transition-all duration-300 shadow-sm"
          >
            <span className="ml-2">←</span>
            חזרה לדף הקודם
          </button>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            מחשבונים פיננסיים
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            כלים מתקדמים לתכנון וניהול פיננסי חכם
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון בסיסי</h2>
            </div>
            <Calculator />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון פנסיה</h2>
            </div>
            <PensionCalculator />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון מס</h2>
            </div>
            <TaxCalculator />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון ביטוח חיים</h2>
            </div>
            <LifeInsuranceCalculator />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון הלוואות</h2>
            </div>
            <LoanCalculator />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון ביטוח בריאות</h2>
            </div>
            <HealthInsuranceCalculator />
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון ריבית דריבית</h2>
            </div>
            <CompoundInterestCalculator />
          </div>
          
          <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <div className="w-16 h-16 mb-6 bg-teal-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">מחשבון השקעות</h2>
            </div>
            <InvestmentCalculator />
          </div>
        </div>
      </div>
    </main>
  )
} 
import FinancialLessons from '@/components/FinancialLessons'

export default function LessonsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            שיעורים ומדריכים
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            מאגר ידע מקיף בנושאי תכנון פיננסי, השקעות ומיסוי
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <FinancialLessons />
        </div>
      </div>
    </main>
  )
} 
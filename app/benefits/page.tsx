export default function BenefitsPage() {
  const benefits = [
    {
      title: 'הטבות מס להורים',
      description: 'סקירה של הטבות המס להורים, כולל נקודות זיכוי והטבות נוספות.',
      category: 'הטבות מס',
      eligibility: 'הורים לילדים עד גיל 18',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'זכויות סוציאליות למשפחות',
      description: 'מידע על קצבאות ילדים, דמי לידה, והטבות נוספות למשפחות.',
      category: 'זכויות סוציאליות',
      eligibility: 'משפחות עם ילדים',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      title: 'הטבות לסטודנטים',
      description: 'כל ההטבות והזכויות לסטודנטים, כולל מלגות והנחות.',
      category: 'הטבות לסטודנטים',
      eligibility: 'סטודנטים פעילים',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'הטבות למבוגרים',
      description: 'הטבות וזכויות למבוגרים, כולל פנסיה וקצבאות נוספות.',
      category: 'הטבות למבוגרים',
      eligibility: 'מבוגרים מעל גיל 67',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            הטבות וזכויות
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            מידע מקיף על הטבות וזכויות פיננסיות המגיעות לך
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-6">
                  {benefit.icon}
                </div>
                <div>
                  <span className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full mb-2">
                    {benefit.category}
                  </span>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {benefit.title}
                  </h2>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {benefit.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  זכאות: {benefit.eligibility}
                </span>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors">
                  מידע נוסף →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              כלי חיפוש הטבות
            </h2>
            <p className="text-gray-600">
              מצא את ההטבות המתאימות לך לפי הפרמטרים שלך
            </p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                גיל
              </label>
              <input
                type="number"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                placeholder="הכנס את הגיל שלך"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                מצב משפחתי
              </label>
              <select className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all">
                <option value="">בחר מצב משפחתי</option>
                <option value="single">רווק/ה</option>
                <option value="married">נשוי/אה</option>
                <option value="divorced">גרוש/ה</option>
                <option value="widowed">אלמן/ה</option>
              </select>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              חפש הטבות מתאימות
            </button>
          </div>
        </div>
      </div>
    </main>
  )
} 
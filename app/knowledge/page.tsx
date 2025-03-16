export default function KnowledgePage() {
  const articles = [
    {
      title: 'איך להתחיל לתכנן את העתיד הפיננסי שלך?',
      description: 'מדריך מקיף למתחילים בתכנון פיננסי, כולל צעדים ראשונים וטיפים חשובים.',
      category: 'תכנון פיננסי',
      readTime: '10 דקות',
    },
    {
      title: 'הטבות מס שכדאי להכיר',
      description: 'סקירה של הטבות המס החשובות ביותר שיכולות לחסוך לך כסף.',
      category: 'הטבות מס',
      readTime: '8 דקות',
    },
    {
      title: 'חיסכון פנסיוני - המדריך המלא',
      description: 'כל מה שצריך לדעת על חיסכון פנסיוני, קרנות פנסיה וקופות גמל.',
      category: 'פנסיה',
      readTime: '15 דקות',
    },
    {
      title: 'איך לבחור משכנתא?',
      description: 'מדריך מפורט לבחירת משכנתא מתאימה והשוואת הצעות מחיר.',
      category: 'משכנתא',
      readTime: '12 דקות',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        מידע ומומחיות
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <article key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {article.title}
            </h2>
            
            <p className="text-gray-600 mb-4">
              {article.description}
            </p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{article.readTime}</span>
              <button className="text-blue-600 hover:text-blue-800">
                קרא עוד →
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          קטגוריות נוספות
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['השקעות', 'ביטוח', 'חיסכון', 'תכנון פנסיוני'].map((category) => (
            <button
              key={category}
              className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 
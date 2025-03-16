import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            תכנון פיננסי
          </Link>
          
          <div className="flex space-x-4 space-x-reverse">
            <Link href="/knowledge" className="text-gray-600 hover:text-gray-900">
              מידע ומומחיות
            </Link>
            <Link href="/calculators" className="text-gray-600 hover:text-gray-900">
              מחשבונים
            </Link>
            <Link href="/benefits" className="text-gray-600 hover:text-gray-900">
              הטבות וזכויות
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 
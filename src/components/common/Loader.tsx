export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="loading-container">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <div className="text-gray-600">{label}</div>
      </div>
    </div>
  )
}



import MoodInput from '../components/MoodInput'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[85vh] px-6 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-white mb-3">Find your next game</h1>
        <p className="text-gray-400 text-sm max-w-md">
          Tell us how you're feeling. Meridian finds hidden gems that match your mood and budget.
        </p>
      </div>
      <MoodInput />
    </main>
  )
}
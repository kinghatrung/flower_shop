import { Check } from 'lucide-react'

function StepIndicator({ currentStep, totalSteps = 3, steps = ['Step 1', 'Step 2', 'Step 3'] }) {
  return (
    <div className='w-full py-12'>
      <div className='flex items-center justify-between gap-3'>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={stepNumber} className='flex flex-1 items-center'>
              {/* Step Circle */}
              <div className='relative flex flex-col items-center'>
                <div
                  className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-semibold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/40'
                      : isActive
                        ? 'bg-pink-500 text-white shadow-xl shadow-pink-500/50 ring-4 ring-pink-200 scale-110'
                        : 'bg-pink-100 text-pink-600'
                  }`}
                >
                  {isCompleted ? (
                    <Check
                      className='h-6 w-6 animate-in fade-in zoom-in duration-300'
                      strokeWidth={3}
                    />
                  ) : (
                    <span className={isActive ? 'font-bold' : ''}>{stepNumber}</span>
                  )}
                </div>

                {/* Step Label */}
                {steps[index] && (
                  <div
                    className={`mt-4 text-center text-sm font-medium transition-all duration-300 ${
                      isActive || isCompleted
                        ? 'text-pink-700 opacity-100'
                        : 'text-pink-500 opacity-75'
                    }`}
                  >
                    {steps[index]}
                  </div>
                )}
              </div>

              {/* Connector Line */}
              {stepNumber < totalSteps && (
                <div className='mx-3 flex-1 h-1.5 rounded-full overflow-hidden bg-pink-200 transition-all duration-500'>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCompleted
                        ? 'bg-gradient-to-r from-pink-500 to-pink-400 w-full'
                        : 'bg-pink-200 w-0'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StepIndicator

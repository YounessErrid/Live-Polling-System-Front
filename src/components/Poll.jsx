import React from 'react'

export const Poll = () => {
  return (
   <>
    <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-7x1 rounded-2xl overflow-hidden shadow-lg bg-white">
                <div className="p-4">
                    <h2 className="text-center text-xl font-semibold text-gray-900">Which AI is the best?</h2>
                    <div className='flex justify-center'>
                        <div className='px-5 py-6'>
                            <p className="text-gray-600 mt-2"> ChatGpt </p>
                        </div>
                        <div className='px-5 py-6'>
                            <p className="text-gray-600 mt-2"> DeepSeek </p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='px-4 py-6'>
                            <p className="text-gray-600 mt-2"> 70% </p>
                        </div>
                        <div className='px-4 py-6'>
                            <p className="text-gray-600 mt-2"> 30% </p>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='px-4 py-6'>
                            <p className="text-gray-600 mt-2"> 70 Votes </p>
                        </div>
                        <div className='px-4 py-6'>
                            <p className="text-gray-600 mt-2"> 30 Votes </p>
                        </div>
                    </div>
                    <div className='cl-comments'>
                        <h2>Comments</h2>
                        <p className="text-gray-600 mt-2"> I think chat gpt is the best </p>
                        <p className="text-gray-600 mt-2"> In my opinion DeepSeek is better than ChatGpt </p>
                    </div>
                </div>
            </div>
        </div>
    </main>
   </>
  )
}
export default Poll;
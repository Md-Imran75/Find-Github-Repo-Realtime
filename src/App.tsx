import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Repositories from './components/Repositories';

const queryClient = new QueryClient();

function App() {
  const [keyword, setKeyword] = useState('');



  return (
    <div className='bg-slate-100  py-20 h-screen overflow-y-scroll'>

      <div className='flex flex-col justify-center items-center w-full '>

        <div className='text-slate-600 mb-10 text-center'>
          <div className='text-2xl font-bold'>Find Github Repositories</div>
          <span className='text-sm font-normal '>developed by Md Imran Khan</span>
        </div>


        <form onSubmit={e => e.preventDefault()}>
          <input className='border-none outline-none bg-gray-600 text-white px-2 text-sm py-1 font-bold rounded md' type="text" value={keyword} onChange={event => setKeyword(event.target.value)} placeholder='search repo...' />
        </form>


        <div className='mt-5'>
          <QueryClientProvider client={queryClient}>
            <Repositories keyword={keyword} />
          </QueryClientProvider>

        </div>

      </div>


    </div>
  )
}

export default App

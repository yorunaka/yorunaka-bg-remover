import React, { useState } from 'react'
import './fonts/silkscreen.ttf'
import ani1 from './assets/ani1.gif'
import ani2 from './assets/ani2.gif'

const App = () => {
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [fileName, setFileName] = useState('')

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      setFileName(file.name)
      setPreviewURL(URL.createObjectURL(file))
      console.log(file.name)
      console.log('sukses coy')
      return
    }
  }

  return (
    <div className='h-screen w-full top-0 justify-items-center content-center'>
      <div className='bg-white shadow-md h-fit w-fit p-6'>
        <div className='flex gap-4 justify-center'>
          <img src={ani2} alt="" />
          <div id='title' className='text-center font-bold text-2xl'>
              <h1>
                mY Playground
              </h1>
          </div>
          <img src={ani1} alt="" />
        </div>
        <div className='flex gap-1 overflow-visible pt-4'>
          <div className='border border-blue-400 rounded-md'>
            <input type="file" name="fileInput" id="fileInput" className='hidden' onChange={handleInputFile} />
            {!fileName ? 
              <label htmlFor="fileInput" className='p-8 text-sm text-slate-400'
              >
                Select or Drag your image
                </label>            
            : 
              <label htmlFor="fileInput" className='p-8 text-sm text-black'
              >
                {fileName}
                </label>            
             }
          </div>
            <button type="submit" className='text-white px-3 py-2 bg-blue-500 hover:bg-sky-400 rounded-md'>Submit</button>
        </div>
        {previewURL && (
          <div className='flex pt-4 max-w-full max-h-full justify-center'>
            <img src={previewURL} alt="" className='w-72'/>
          </div>
        )}
      </div>
    </div>
  )
}
// gif by @BLZ
export default App
import React, { useState } from 'react'
import './fonts/silkscreen.ttf'
import ani1 from './assets/ani1.gif'
import ani2 from './assets/ani2.gif'

const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewURL, setPreviewURL] =  useState<string | null>(null);
  const [fileName, setFileName] = useState('')

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(file){
      setSelectedFile(file)
      setFileName(file.name)
      setPreviewURL(URL.createObjectURL(file))
      return
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile){
      alert('please selct a file!')
      return
    }
    const formData = new FormData()
    formData.append('image', selectedFile)

    try {
      const res = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
        headers:{}
      })

      const data = await res.json()
      console.log(`Server Response: ${data.message}`);
    } catch {
      console.error('no files uploaded')
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
          <div className='pt-4 flex gap-2 flex-col justify-center'>
            <div className='flex max-w-full max-h-full justify-center'>
              <img src={previewURL} alt="" className='w-72'/>
            </div>
            <button className='px-3 py-2 bg-blue-400 cursor-pointer text-white rounded-md hover:bg-sky-400'
            onClick={handleSubmit}>
              Submit
            </button>          
          </div>
        )}
      </div>
    </div>
  )
}
// gif by @BLZ
export default App
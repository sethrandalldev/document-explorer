import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  return (
    <>
      <div className="App">
        <h1>File Upload</h1>
        <h2>File Selected: {selectedFile?.name}</h2>
        <div class="mb-3">
          <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={e => setSelectedFile(e.target.files[0])} />
        </div>
      </div>
    </>
  )
}

export default App

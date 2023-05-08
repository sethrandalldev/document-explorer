import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [documents, setDocuments] = useState([])
  const [answer, setAnswer] = useState('')
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/documents')
      .then(res => res.json())
      .then(data => setDocuments(data))
  }, [])

  const handleQuestionSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    console.log(e.target.question.value)
    formData.append('question', e.target.question.value)
    formData.append('document_id', selectedDocument.id)
    formData.append('document_title', selectedDocument.title)
    setSpinner(true)
    fetch('http://localhost:5000/question', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setSpinner(false)
        setAnswer(data.answer)
      })
  }

  const handleDocumentSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('document', selectedFile)
    formData.append('title', selectedFile.name)
    fetch('http://localhost:5000/documents', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  const renderDocumentExplorer = () => {
    return (
    <form className="m-3" onSubmit={handleDocumentSubmit}>
        <h1>File Upload</h1>
        <h2>File Selected: {selectedFile?.name}</h2>
        <div className="mb-3">
          <input className="form-control form-control-sm" id="formFileSm" type="file" onChange={e => setSelectedFile(e.target.files[0])} />
        </div>
      <button type="submit" className={`${selectedFile ? '' : 'disabled'} btn btn-primary`}>Upload</button>
    </form>
    )
  }

  const renderDocuments = () => {
    return documents.map(document => {
      return (
        <button 
          key={document.id}
          className={`list-group-item list-group-item-action ${document.id === selectedDocument?.id ? 'active' : ''}`}
          onClick={() => setSelectedDocument(document)}
          type="button"
        >
          <h2>{document.title}</h2>
        </button>
      )
    })
  
  }

  return (
    <>
      <div className="App">
        {renderDocumentExplorer()}
        <form className="m-3" onSubmit={handleQuestionSubmit}>
          <div className="list-group">
            {renderDocuments()}
          </div>
          <div className="input-group">
            <span className="input-group-text">Ask Question:</span>
            <textarea className="form-control" aria-label="question" name="question"></textarea>
          </div>
          <div>
            <button type="submit" className="btn btn-primary mb-3">Submit</button>
          </div>
        </form>
        {spinner && (
          <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        )}
        {answer && (
          <div>
            <h1>Answer:{answer}</h1>
          </div>
        )}
      </div>
    </>
  )
}

export default App

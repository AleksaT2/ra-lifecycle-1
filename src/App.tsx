import { useState } from 'react'

import './App.css'

import Form from './components/Form'

import { TForm } from './components/types'
import Watch from './components/Watch'




function App() {
  const [watchesArray, setWatchesArray] = useState<TForm[]>([])

  const addWatch = (obj: TForm) => {
    if (!obj) {
      return
    }
    setWatchesArray([...watchesArray, obj])
  }

  const deleteWatch = (obj: TForm) => {
    if (watchesArray.length === 1) {

      setWatchesArray([])
      return
    }
    setWatchesArray(watchesArray.filter((watch) => watch.name !== obj.name))
  }

  return (
    <>
     <Form addWatch={addWatch} />
     <div className="watches">
      {watchesArray.map((watch) => (
        <Watch key={watch.name} onDelete={deleteWatch} data={watch} />
      ))}
     </div>
    </>
  )
}

export default App;
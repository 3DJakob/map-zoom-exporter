import './App.css'
import { useState } from 'react'
const { ipcRenderer } = window.require('electron')

function App () {
  const [images, setImages] = useState([])

  const getImage = async () => {
    const url = new URL('https://maps.googleapis.com/maps/api/staticmap')
    const params = {
      center: '40.714728,-73.998672',
      format: 'png',
      zoom: 12,
      size: '640x640',
      maptype: 'satellite',
      key: 'ADD API KEY'
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    const res = await window.fetch(url)
    const imageBlob = await res.blob()
    const imageObjectURL = URL.createObjectURL(imageBlob)
    console.log(imageObjectURL)
    setImages([imageObjectURL])
    // console.log(imageBlob, 'res')
  }

  return (
    <div className='App'>
      hello world
      <button onClick={() => {
        ipcRenderer.send('asynchronous-message', 'ping')
      }}
      >Com
      </button>
      <button onClick={getImage}>
        do stuff
      </button>
      {images.map(img => <img src={img} />)}
    </div>
  )
}

export default App

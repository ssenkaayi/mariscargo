import React from 'react'
import { BrowserRouter} from 'react-router-dom'
import NavPage from './components/NavPage'

function App() {
  return (
   <React.Fragment>

    <BrowserRouter>

      <NavPage/>
      
    </BrowserRouter>

   </React.Fragment>

  )
}

export default App 
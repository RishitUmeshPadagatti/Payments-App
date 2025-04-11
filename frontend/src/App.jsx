import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Dashboard} from "./pages/Dashboard"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/business/:id" element={<Business />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

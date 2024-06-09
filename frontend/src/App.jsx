import { Suspense, lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
const Signup = lazy(() => import ("./pages/Signup"))
const Signin = lazy(() => import ("./pages/Signin"))
const Dashboard = lazy(() => import ("./pages/Dashboard"))
const SendMoney = lazy(() => import ("./pages/SendMoney"))

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Suspense fallback="Loading..."><Signup /></Suspense>} />
        <Route path="/signin" element={<Suspense fallback="Loading..."><Signin /></Suspense>} />
        <Route path="/dashboard" element={<Suspense fallback="Loading..."><Dashboard /></Suspense>} />
        <Route path="/send" element={<Suspense fallback="Loading..."><SendMoney /></Suspense>} />
        <Route path="/" element={<Suspense fallback="Loading..."><Dashboard /></Suspense>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

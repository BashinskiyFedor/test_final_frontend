import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CampaignsPage from './pages/CampaignsPage'
import EditorPage from './pages/EditorPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CampaignsPage />} />
        <Route path="/campaigns/:id" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import HeaderAdmin from './components/nav/HeaderAdmin'
import Header from './components/nav/Header'

function App() {
  return (
    <Router>
      <Header />
    </Router>
  )
}

export default App

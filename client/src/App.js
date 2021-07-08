import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css' //css for toastify pop ups
import { toast, ToastContainer } from 'react-toastify'
import HeaderAdmin from './components/nav/HeaderAdmin'
import Header from './components/nav/Header'
import AllUsers from './pages/admin/user/AllUsers'
import Footer from './components/nav/Footer'
import CreateUser from './pages/admin/user/CreateUser'

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Route path='/admin/users' component={AllUsers} exact />
      <Route path='/admin/users/create' component={CreateUser} exact />
      <Footer />
    </Router>
  )
}

export default App

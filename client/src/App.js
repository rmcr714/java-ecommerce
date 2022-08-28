import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import 'react-toastify/dist/ReactToastify.css' //css for toastify pop ups
import { toast, ToastContainer } from 'react-toastify'
import HeaderAdmin from './components/nav/HeaderAdmin'
import Header from './components/nav/Header'
import AllUsers from './pages/admin/user/AllUsers'
import Footer from './components/nav/Footer'
import CreateUser from './pages/admin/user/CreateUser'
import EditUser from './pages/admin/user/EditUser'
import AllCategories from './pages/admin/categories/AllCategories'
import CreateCategory from './pages/admin/categories/CreateCategory'
import EditCategory from './pages/admin/categories/EditCategory'
import AllBrands from './pages/admin/brands/AllBrands'
import CreateBrand from './pages/admin/brands/CreateBrand'
import EditBrand from './pages/admin/brands/EditBrand'
import AllProducts from './pages/admin/products/AllProducts'
import CreateProduct from './pages/admin/products/CreateProduct'

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Route path='/admin/users' component={AllUsers} exact />
      <Route path='/admin/users/create' component={CreateUser} exact />
      <Route path='/admin/users/edit/:id' component={EditUser} exact />
      <Route path='/admin/categories' component={AllCategories} exact />
      <Route path='/admin/categories/create' component={CreateCategory} exact />
      <Route path='/admin/categories/edit/:id' component={EditCategory} exact />
      <Route path='/admin/brands' component={AllBrands} exact />
      <Route path='/admin/brands/create' component={CreateBrand} exact />
      <Route path='/admin/brands/edit/:id' component={EditBrand} exact />
      <Route path='/admin/products' component={AllProducts} exact />
      <Route path='/admin/products/create' component={CreateProduct} exact />

      <br />
      <br />
      <br />
      <Footer />
    </Router>
  )
}

export default App

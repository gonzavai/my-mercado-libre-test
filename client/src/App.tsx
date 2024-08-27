import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchBox from './components/SearchBox/SearchBox';
import Breadcrumb from './components/Breadcrumb/Breadcrumb'
import MainLayout from './layouts/MainLayout/MainLayout'
import './styles/styles.scss';
import Home from './pages/Home/Home';
import SearchResults from './pages/SearchResults/SearchResults';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import { ProductProvider } from './context/ProductContext';

function App() {
  return (
    <ProductProvider>
      <Router>
        <SearchBox />
          <MainLayout>
            <Breadcrumb />
            <Routes>
              <Route path="/" element={<Home />}  />
              <Route path="/items" element={<SearchResults />}  />
              <Route path="/items/:id" element={<ProductDetail />} />
            </Routes>
          </MainLayout>
      </Router>
    </ProductProvider>
  );
}

export default App;
import React from 'react';
import './App.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import CategoriesList from './CategoriesList.js';

function AddAutorizationData(params) {
  let x = params;
  x.user = process.env.REACT_APP_API_USERNAME;
  x.password = process.env.REACT_APP_API_PASSWORD;
  return x;
}

function App() {
  const [isCategoriesLoaded, setIsCategoriesLoaded] = React.useState(false);
  const [progressBarText, setProgressBarText] = React.useState('Идёт загрузка категорий...');
  const [categories, setCategories] = React.useState([]);
  const [stocksList, setStocksList] = React.useState([]);


  async function GetCatalogCategoriesAndStocks(numberOfAttempts) {
    try {
      const result = await axios.post(
        '/Api/GetCatalogCategories', AddAutorizationData({
          responseFormat: 1
        }));
      if (result.data.Header.Code == 0) {
        const categories = result.data.Body.Categories.filter(category => category.SubCategories.length > 2);
        setCategories(categories);
        // Т.к. есть ограничение на частоту вызовов приходится обращаться к API последовательно.
        await GetStock(categories[0].CategoryID, 1);
        await GetStock(categories[1].CategoryID, 1);
        await GetStock(categories[2].CategoryID, 1);
        await GetStock(categories[3].CategoryID, 1);
        await GetStock(categories[4].CategoryID, 1);
        setIsCategoriesLoaded(true);
      }
      else if (numberOfAttempts > 0 && result.data.Header.Code == 1) {
        setTimeout(GetCatalogCategoriesAndStocks, 61000, numberOfAttempts - 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function GetStock(categoryId, numberOfAttempts) {
    setProgressBarText("Загрузка артикулов из категории «" + categoryId + "»...");
    try {
      const result = await axios.post(
        '/Api/GetStock', AddAutorizationData({
          categoryId: categoryId,
          packStatus: 0,
          responseFormat: 1,
          includeSubCategories: 1,
          inStock: 0
        }));
      if (result.data.Header.Code == 0) {
        setStocksList(stocksList => [...stocksList, result.data.Body.CategoryItem]);
      }
      else if (numberOfAttempts > 0 && result.data.Header.Code == 1) {
        setTimeout(GetStock, 61000, categoryId, numberOfAttempts - 1);
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    GetCatalogCategoriesAndStocks(1);
  }, []);

  return (
    <div className="App">
      {
        !isCategoriesLoaded &&
        <div style={{ marginTop: 100 }}>
          <CircularProgress />
          <p>{progressBarText}</p>
        </div>
      }
      <CategoriesList categories={categories} stocksList={stocksList} />
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (product) => {
    const keywordMatch = product.title.toLowerCase().includes(searchKeyword.toLowerCase());
    const typeMatch = selectedType === '' || product.category === selectedType;
    const minPriceMatch = minPrice === '' || product.price >= parseFloat(minPrice);
    const maxPriceMatch = maxPrice === '' || product.price <= parseFloat(maxPrice);
    return keywordMatch && typeMatch && minPriceMatch && maxPriceMatch;
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handlePriceFilterClick = () => {
    setShowPriceDropdown(!showPriceDropdown);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleBackButtonClick = () => {
  setSelectedProductId(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedProductId) {
    const selectedProduct = products.find((product) => product.id === selectedProductId);

    return (
<div className="product-details-container">
  <h2 className="product-details-title">{selectedProduct.title}</h2>
  <div className="product-details-content">
    <div className="product-details-photo">
      <img src={selectedProduct.image} alt={selectedProduct.title} />
    </div>
    <div className="product-details-info">
    <p className="rating">Rating: {selectedProduct.rating.rate}</p>
      <p className="description">Description: {selectedProduct.description}</p>
      <p className="category">Category: {selectedProduct.category}</p>
      <p className="price">Price: ${selectedProduct.price}</p>
    </div>
  </div>
  <button className="back-button" onClick={handleBackButtonClick}>Back</button>
</div>

    );
  }
  
  return (
    <div className="container">
      <h1>Frontend-Assignment</h1>
      <div className="filters">
        <input type="text" placeholder="Search by keyword" value={searchKeyword} onChange={handleSearchChange} />
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">All Types</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelry">Jewelry</option>
          <option value="electronics">Electronics</option>
        </select>
        <div className="price-filter">
          <button className="price-filter-button" onClick={handlePriceFilterClick}>
            Price
          </button>
          {showPriceDropdown && (
            <div className="price-filter-dropdown">
              <div>
                <label htmlFor="minPrice">Min Price:</label>
                <input type="number" id="minPrice" value={minPrice} onChange={handleMinPriceChange} />
              </div>
              <div>
                <label htmlFor="maxPrice">Max Price:</label>
                <input type="number" id="maxPrice" value={maxPrice} onChange={handleMaxPriceChange} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="product-grid">
      {products.filter(filterProducts).map((product) => (
          <div
            className="product"
            key={product.id}
            onClick={() => handleProductClick(product.id)}
          >
            <img className="product-image" src={product.image} alt={product.title} />
            <div className="product-details">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

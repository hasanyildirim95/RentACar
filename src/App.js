import React from "react";
import { Component } from "react";
import Categories from "./Categories";
import Products from "./Products";
import Header from "./Header";
import { Col, Container, Row } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import CartDetail from "./CartDetail";
import Notfound from "./Notfound";



export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: [],
    email: "",
    password: "",
    select: "",
    selectMultiple:"",
    text: ""
    };
  chanceCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    alertify.success(this.state.email + " login successfull", 2);
  };
  handleImageSubmit = (imageData) => {
    this.setState({ imageData });
  };


  componentDidMount() {
    this.getProducts();
  }


  addtoCart = (product) => {
    let newCart = this.state.cart
    var addedItem = newCart.find((c) => c.product.id === product.id);
    alertify.success(product.productName+" Added")
    if(addedItem){
      addedItem.quantity += 1
      
    }
    else {
      newCart.push({product:product,quantity:1})
    }
    this.setState({ cart: newCart });
  
    
  }

  removeToCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + "removed from cart!", 2);
  };


  render() {

    return (
      <Container>
        <Header cart={this.state.cart} removeToCart={this.removeToCart} />
        <Row>
          <Col xs="3">
            <Categories
              chanceCategory={this.chanceCategory}
              currentCategory={this.state.currentCategory}
            />
          </Col>
          <Col xs="9">
            <Routes>
              <Route
                path="/"
                element={
                  <Products
                    products={this.state.products}
                    addtoCart={this.addtoCart}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <CartDetail
                    cart={this.state.cart}
                    removeToCart={this.removeToCart}
                  />
                }
              />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    );
  }
}

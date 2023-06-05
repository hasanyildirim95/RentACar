import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardText,
    Col,
  
} from "reactstrap";
import { Link } from "react-router-dom";

export default class Products extends Component {
  //Set-ExecutionPolicy -ExecutionPolicy RemoteSigned json
  state = {
    products: [],
    currentProduct: "",
  };
  changeCurrentProduct = (product) => {
    this.setState({
      currentProduct: product.productName,
    });
  };

  render() {
    const { products } = this.props;
    return (
      <div>
        <h2>Cars</h2>
        <CardGroup>
          {products.map((product) => (
            <Col xs="3">
              <Card
                style={{ marginLeft: "10px", marginRight: "10px" }}
                key={product.id}>
                <CardImg
                  top
                  width="100%"
                  src={product.image}
                  alt={product.productName}
                />
                <CardBody>
                    <b>Car Name: {product.productName}</b>
                          <CardText>{product.cost} ₺</CardText>
                          <Link  to="/cart">
                          <Button onClick={() => this.props.addtoCart(product)} color="success">
                    Rent This Car
                  </Button></Link>
                  
                </CardBody>
              </Card>
            </Col>
          ))}
        </CardGroup>
      </div>
    );
  }
}



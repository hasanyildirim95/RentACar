import React, { Component } from "react";
import { Table } from "reactstrap";


export default class cart extends Component {

  state = {
    totaldate: ""
  }

  handleOnchange = () => {
    var valstart = document.getElementById("datestart").value;
    var valfinish = document.getElementById("datefinish").value;
    
    var totaldate = (valfinish.replace(/-/g, "")-valstart.replace(/-/g, "") );
    console.log(totaldate)
    this.setState({totaldate:totaldate})
    
  }

  render() {

   

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th> Car id</th>
              <th> Car Model</th>
              <th>Date Start</th>
              <th>Date Finish</th>
              <th>Cost ₺</th>
              <th>Total Cost ₺</th>
              <th>Rent</th>
              <th>Delete </th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart.map((c, index) => (
              <tr key={c.product.id}>
                <td>{index + 1}</td>
                <td>{c.product.categoryId}</td>
                <td>{c.product.productName}</td>
                <td> <input  id="datestart" type="Date" /></td>
                <td> <input onChange={this.handleOnchange} id="datefinish" type="Date" /></td>
                <td>{c.product.cost }</td>
                <td>{c.product.cost*this.state.totaldate }</td>
                <td>
                  <button className="btn btn-success">
                    Rent This Car
                  </button>
                </td>
                
                <td>
                  <button className="btn btn-danger" onClick={() => this.props.removeToCart(c.product)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
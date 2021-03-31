import './App.css';
import { Component } from 'react';

class Forms extends Component {

  constructor(props) {
    super(props);
    let monthNumber = (new Date().getMonth());
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthName = monthNames[monthNumber];
    this.state = {
      items: [],
      monthName: monthName,
      itemContent: "",
      isPurchased: false,
      itemId: ''
    };
    this.create = this.create.bind(this);
    this.readAll = this.readAll.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.readAll();
  }

  textChange = (e) => {
    this.setState({ itemContent: e.target.value });
  }

  addItem = (e) => {
    if (e.key === 'Enter') {
      this.create(e);
      this.readAll(e);
      this.textInput.value = "";
    }
  }

  removeItem = (e) => {
    this.deleteOne(e);
    this.readAll(e)
  }
  purchaseItem = (e) => {
    this.updateOne(e);
    this.readAll(e);
  }

  create(e) {
    e.preventDefault();
    fetch("http://localhost:5000/grocery/add", {
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        "groceryItem": this.state.itemContent,
        "isPurchased": false
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  }

  readAll(e) {
    fetch("http://localhost:5000/grocery/getAll")
      .then(response => response.json())
      .then(response => {
        console.log(response)
        this.setState({
          items: response
        })
        console.log(this.state.items)
      })
      .catch(err => {
        console.log(err);
      });

  }

  updateOne(e) {
    fetch("http://localhost:5000/grocery/updatePurchaseStatus", {
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        "_id": this.state.items[e]._id,
        "isPurchased": true
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  }
  deleteOne(e) {
    fetch("http://localhost:5000/grocery/deleteGroceryItem", {
      "method": "DELETE",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json"
      },
      "body": JSON.stringify({
        "_id": this.state.items[e]._id,
      })
    })
      .then(response => response.json())
      .then(response => {
        // console.log(response)
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    return (

      <div className="form-area">
        <h2>Plan for the month of {this.state.monthName} </h2>
        <div className="form-list">
          <form className="input">
            <input
              placeholder="Add Shopping Item"
              aria-label="add-item"
              onChange={this.textChange}
              onKeyPress={this.addItem}
              ref={el => this.textInput = el}
            />
          </form>
          <ol>
            {
              this.state.items.map((itm, k) => {
                return (
                  <li>
                    &nbsp;&nbsp;&nbsp;
                    <p style={{
                      textDecoration: itm.isPurchased ? 'line-through' : 'none'
                    }}>{itm.groceryItem}</p>
                    <span className="button-group">
                      <button className="buttonp" variant="outline-dark" size="sm" onClick={() => { this.purchaseItem(k) }}><b>Purchased</b></button>&nbsp;&nbsp;&nbsp;
                    <button className="buttonr" variant="outline-dark" size="sm" onClick={() => { this.removeItem(k) }}><b>X</b></button>
                    </span>

                  </li>
                )

              })
            }

          </ol>
        </div>
      </div>
    );
  }
}

export default Forms;
import React from "react";
import { db } from "./FirebaseConfig";
import { ref, onValue ,set} from "firebase/database";
import { Component } from "react";

export class Contents extends Component {
  state = {
    categories: [],
    products: [],
    quantity:0,
  };
  componentDidMount() {
    this.getCategories();
    this.getProducts();
    
  }


  handleChange=(quantity)=>{
    this.setState({quantity:quantity});
  }


  addtoCart(product){
    let productid=(Math.random()*99999000).toFixed();
    let cartid=localStorage.getItem('cartid');
    if(cartid==null)
    {
      let cartid=(Math.random()*99999000).toFixed();
      const reference=ref(db,'shopping-cart/'+cartid+'/items/'+productid);
      set(reference,{
        'product':product,
        'quantity':Number(this.state.quantity)
      });
      localStorage.setItem('cartid',cartid);
    }
    else
    {
      const reference=ref(db,'shopping-cart/'+cartid+'/items/'+productid);
      set(reference,{
        'product':product,
        'quantity':Number(this.state.quantity)
      })
    }
  }


  getProducts() {
    const reference = ref(db, "products");
    onValue(reference, (snapshot) => {
      let products = snapshot.val();
      this.setState({ products: products });
    });
  }

  getCategories() {
    const reference = ref(db, "category");
    onValue(reference, (snapshot) => {
      let categories = snapshot.val();
      this.setState({ categories: categories });
    });
  }
  render() {
    return (
      <div className="m-3 mt-5">
        <div className="row">
          <div className="col-3 ">
            <ul className="list-group position-fixed">
              <li key={1} className="list-group-item active">
                All Categories
              </li>
              {this.state.categories.map((category) => (
                <li key={category["categoryname"]} className="list-group-item">
                  {category["categoryname"]}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-9">
            <div className="row">
              {this.state.products.map((product) => (
                <div className="col-4">
                  <div
                    key={product["title"]}
                    className="card"
                    style={{ width: "18rem" }}
                  >
                    <img src={product["imageURL"]} className="card-img-top" />
                    <div className="card-body">
                      <h5 className="card-title">{product["title"]}</h5>
                      <h5 className="card-title">{product["price"]}</h5>
                      <div className="row">
                        <div className="col-6">
                          <select key={product['title']} className="form-select" onClick={(e)=>this.handleChange(e.target.value)}>
                            <option value="0">Quantity</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      
                      <div className="col-6">
                        <button className="btn btn-primary" onClick={()=>{this.addtoCart(product)}}>Add to cart</button>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

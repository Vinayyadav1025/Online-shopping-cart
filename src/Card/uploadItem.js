import React from "react";
import { Component } from "react";
import { db } from "./FirebaseConfig";
import { ref, onValue, set } from "firebase/database";

export class uploadItem extends Component {
  state = {
    credentails: {
      productCategory: "",
      productName: "",
      productPrice: "",
      productImage: "",
    },
    productSize:[],
    categorySize:[],
    errors: {},
  };

  componentDidMount(){
    let reference=ref(db,'products');
    onValue(reference, (snapshot) => {
      let productSize = snapshot.val();
      this.setState({ productSize: productSize });
    });
    let reference1=ref(db,'category');
    onValue(reference1, (snapshot) => {
      let categorySize = snapshot.val();
      this.setState({ categorySize: categorySize });
    });
    console.log(this.state.productSize.length);
  }

  validate=()=>{
    let errors={};
    if(this.state.credentails.productCategory.trim()==='')
      errors.productCategory="Product Category Required";
    if(this.state.credentails.productName.trim()==='')
      errors.productName="Product Name Required";
    if(this.state.credentails.productPrice.trim()==='')
      errors.productPrice="Product Price Required";
    if(this.state.credentails.productImage.trim()==='')
      errors.productImage="Product Image Required";
    return Object.keys(errors).length===0?null:errors;
  }

  handleChange = (e) => {
    this.state.credentails[e.currentTarget.name]=e.currentTarget.value;
    this.setState({credential:this.state.credentails});
 };


 handleSubmit=(e)=>{
  e.preventDefault();
  let errors=this.validate();
  this.setState({errors:errors||{}});
}




handleChange1= async (e)=>{
  const file=e.target.files[0];
  const base64=await this.convertBase64(file)
  this.setState({credential:base64});
}
convertBase64=(file)=>{
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload=()=>{
      resolve(fileReader.result);
    }

    fileReader.onerror=(error)=>{
      reject(error);
    }
  })
}




  render() {
    return (
      <div className="container mt-5">
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Product Category
            </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange}
              name="productCategory"
              id="productCategory"
            />
            {this.state.errors.productCategory !== undefined && (
              <div className="alert alert-danger">
                {this.state.errors.productCategory}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange}
              name="productName"
              id="productName"
            />
            {this.state.errors.productName !== undefined && (
              <div className="alert alert-danger">
                {this.state.errors.productName}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Product Price
            </label>
            <input
              type="Number"
              className="form-control"
              onChange={this.handleChange}
              name="productPrice"
              id="productPrice"
            />
            {this.state.errors.productPrice !== undefined && (
              <div className="alert alert-danger">
                {this.state.errors.productPrice}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">
              Product Image
            </label>
            {/* Take input Image */}
             
            <input
              className="form-control"
              type="file"
              id="formFile"
              onChange1={(e)=>{this.handleChangeImage(e)}}
              name="formFile"
            />
            {this.state.errors.formFile !== undefined && (
              <div className="alert alert-danger">
                {this.state.errors.formFile}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

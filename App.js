import React from 'react';
import { Navbar } from './Card/Navbar';
import { Contents } from './Card/contents';
import { Switch, Route } from 'react-router-dom';
import {ShoppingCart} from './Card/Shopping-Cart';
import {uploadItem} from './Card/uploadItem';
export default function App(){
    return(
        <div className="m-2">
            <Navbar/>
            <Switch>
                <Route path="/shopping-cart" component={ShoppingCart}/>
                <Route path="/uploadItem" component={uploadItem}/>
                <Route path='/' component={Contents}/>
            </Switch>
        </div>
    );
}
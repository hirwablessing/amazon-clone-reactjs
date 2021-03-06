import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import { auth } from "./firebase/firebase";
import { useStateValue } from "./components/context/StateProvider";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51HQ8sSK3NONn8GuVva0BnPmdnqA10GHSJWP9bGxsSwkV2RYAF1pYZFeWFrbivRDGrmBwITSXBEwNzzW9ZOQY2Zrl00JxKxrL82"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run once the app component loads...
    auth.onAuthStateChanged((authUser) => {
      // console.log("The user is >>>>", authUser);

      if (authUser) {
        //the user just logged in the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    // return () => {
    //   cleanup
    // }
  }, []);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/orders">
          <Header />
            <Orders />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

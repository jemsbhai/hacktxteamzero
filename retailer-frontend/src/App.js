import "materialize-css/dist/css/materialize.min.css";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Inventory from "./pages/inventory/inventory";


function App() {
  // const dispatch = useDispatch();
  // const [display, setDisplay] = React.useState("block");

  return (
    <Fragment>
      <div className="navbar-fixed navbar-top">
        <nav className="white">
          <div class="nav-wrapper">
            <Link to="/" class="brand-logo left">
              {/* <img src={Logo}></img> */}
            </Link>
            <ul class="right">
              <li>
                <Link
                  to="/logreg/login"
                  class="waves-effect waves-light btn btn-base btn-small-radius"
                >
                  Login/ Register
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div>
        {/* <Header /> */}
        <Route exact path='/' component={Home}/>
        <Route exact path="/inventory" component={Inventory}/>
        {/* <Route exact path='/' component={Landing} />
      <Route exact path='/register' component={Register} /> */}
        {/* <Bottom /> */}
        {/* <Route exact path="/" component={Landing} /> */}

      </div>

      <div className="navbar-fixed navbar-bottom navv">
        <nav className="black">
          <div class="nav-wrapper">
            <ul class="center">
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Site map
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </Fragment>
  );
}

export default App;

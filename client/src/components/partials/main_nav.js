import React from 'react';

//only import one module of the library, we can name it any name
//Here name it as A
import { A } from 'hookrouter';

function MainNav(){
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light"><a className="navbar-brand" href="/">The Blog</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div
            className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><A className="nav-link" href="/">Home</A></li>
              <li className="nav-item"><A className="nav-link" href="/about">About</A></li>
              <li className="nav-item"><A className="nav-link" href="/contact">Contact</A></li>
            </ul>
          </div>
        </nav>
      );
}

export default MainNav;


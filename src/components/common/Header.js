import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';


const Header = () => {

  return (
    <nav>
      <IndexLink to="/terminal/default/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="lines" activeClassName="active">Lines</Link>
      {" | "}
      <Link to="Login" activeClassName="active">Login</Link>
    </nav>
  );
};

Header.propTypes = {};

export default Header;


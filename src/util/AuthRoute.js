import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component, user, ...rest }) => {
  return(<Route
    {...rest}
    render= {props =>
      user.authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />)
}


const mapStateToProps = (state) => ({
  user: state.user
})

AuthRoute.propTypes = {
  user : PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute);

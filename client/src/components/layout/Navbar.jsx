import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {clearCurrentProfile} from "../../actions/profileActions"

class Navbar extends Component {
  onLogOutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            className="nav-link"
            href="#"
            onClick={this.onLogOutClick.bind(this)}
          >
          <img  className="rounded-circle" src={user.avatar} alt={user.name} style={{width:'25px',marginRight:'30px'}}
           title="You must have a Gravatar connector to your email to display an image" /> </a>{" "}
           Logout
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/register">
            SignUp
          </a>{" "}
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/login">
            Login{" "}
          </a>{" "}
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">
            ConnectDEV{" "}
          </a>{" "}
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Developers{" "}
                </a>{" "}
              </li>{" "}
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>{" "}
        </div>{" "}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser,clearCurrentProfile })(Navbar);

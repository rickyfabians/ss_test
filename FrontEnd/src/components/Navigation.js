import React from 'react';
import './Navigation.css';


class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: this.props.data,
      comment: ''
    };
  }
  render() {
    return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg bg-white main-menu">
        <img className="rounded float-left" height="50" width="160" src="https://2.bp.blogspot.com/-5z_MHEBu3dY/VzKRzoAiR_I/AAAAAAAAA5c/sdX8Xb5kWGkbyjhzEA7_XPsp53fhzLpMQCLcB/s320/salestock.png"/>
        <ul className="navbar-nav mx-4">
          <li className="nav-item ">
            <a className="nav-link text-secondary" href="#">Pria</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link text-secondary" href="#">Wanita</a>
          </li>
        </ul>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="form-inline col-sm-10">
            <input className="form-control col-sm-10 " type="text" placeholder="Cari..." value={this.state.comment} 
        onChange={ this.handleChange.bind(this) }/>
          </form>
        </div>
        <div className="d-flex justify-content-end">
        <img className="float-right mr-3" height="28" src="https://s-media-cache-ak0.pinimg.com/originals/f3/32/27/f33227ffe2a3108831b2977c9e781404.png"/>
        <img className="float-right mr-3" height="28" src="https://toppng.com/public/uploads/preview/shopping-cart-11530997200fagmo4tzjs.png"/>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sub-menu">
      <div className="collapse navbar-collapse mt-2 " id="navbarText">
        <ul className="navbar-nav">
          <li className="nav-item ">
            <a className="nav-link " href="#">Atasan</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#">Bawahan</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#">Dress <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#">Sepatu</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#">Aksesoris</a>
          </li>
          <li className="nav-item">
            <a className="nav-link " href="#">Perhiasan</a>
          </li>
        </ul>
      </div>
    </nav>
    </div>
    )
  }

  handleChange(e) {
    this.setState({ comment: e.target.value });
  }
}

export default Navigation;
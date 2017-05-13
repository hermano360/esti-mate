var React = require('react');
var {Link,IndexLink} = require('react-router');

var Nav = React.createClass({
  render: function(){
    return(
      <div className='top-bar'>
        <div className='top-bar-left'>
          <ul className='menu'>
            <li className='menu-text'>Esti-Mate</li>
            <li>
              <IndexLink to="/" activeClassName="active-link">Home</IndexLink>
            </li>
            <li>
              <Link to="/contact" activeClassName="active-link">Contact</Link>
            </li>
            <li>
              <Link to="/" activeClassName="active-link">TBD</Link>
            </li>
          </ul>
        </div>
        <div className="top-bar-right">
          <ul className="menu">
            <li className="menu-text">
              Copyright 2017 <a href="http://google.com" target="_blank">Rob Leon</a>
            </li>
          </ul>
        </div>
      </div>

    )
  }
});

module.exports = Nav;

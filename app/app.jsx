var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var Main = require('Main');
var Contact = require('Contact');
var Intro = require('Intro');
var NewEstimate = require('NewEstimate');
// Load foundation
$(document).foundation();

require('style!css!sass!applicationStyles');

ReactDOM.render(
<Router history={hashHistory}>
	<Route path="/" component={Main}>
		<Route path="/contact" component={Contact}/>
		<Route path="/newestimate" component={NewEstimate}/>
		<IndexRoute component={Intro}/>
	</Route>
</Router>,
	document.getElementById('app')
);

'use strict';

const React = require('react');
const logo = require('./images/izph.jpg');
require('./index.less');

class Index extends React.Component {

    render() {

        return (
            <div className={"container"}>
                <div className={"title"}>this is webpack-ssr test</div>
                <img className={"logo"} src={logo} />
            </div>
        )

    }
}

module.exports = <Index />;
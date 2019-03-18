import React, {Component} from 'react';
import './title.css';

export default class Title extends Component {
    render() {
        return(
            <section className="main-title">
                <div className="container">
                    <h1>{'Pok\u00E9'}<span>Worth</span></h1>
                </div>
            </section>
        )
    }
}
import React, {Component} from 'react';
import {} from './circle-link.css';

// Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(faCircle);
library.add(fab);

export default class CircleLink extends Component {
   render() {
       return(
        <div className="cl-wrapper">
            <a href={this.props.site.url} alt={this.props.site.name} target='_blank' rel="noopener noreferrer">
                <span id={this.props.site.name + "-span"} className="fa-layers fa-fw fa-3x">
                    <FontAwesomeIcon id={this.props.site.name + "-circle"} icon={["fas", "circle" ]} color={this.props.bkgdColor} />
                    <FontAwesomeIcon id={this.props.site.name} icon={["fab", this.props.site.name]} color={this.props.iconColor} transform="shrink-6" />
                </span>
            </a>
        </div>
       )
   };
};
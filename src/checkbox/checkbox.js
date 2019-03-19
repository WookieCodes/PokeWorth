import React, {Component} from "react";
import {FormGroup, Input, Label} from 'reactstrap';
import "./checkbox.css";

export default class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.onBoxChange = this.onBoxChange.bind(this);
    }

    onBoxChange = e => {
        this.props.onCheckChange(e);
    }

    render () {
        return(
        <div className="col-xl col-lg-3 col-6" key={this.props.label}>
            <FormGroup check inline className="input-group-text" key={this.props.label}>
                <Label check className="labelText">
                    {this.props.label}<br></br><Input type="checkbox" id={this.props.label.replace(/\s+/g, '')} onChange={this.onBoxChange}/> 
                </Label>
            </FormGroup>
        </div>
        )
    }
}
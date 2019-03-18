import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import './selection-list.css';

export default class SelectionList extends Component {
    constructor(props) {
        super(props);

        //Bind functions
        this.createSelectionList = this.createSelectionList.bind(this);
    }

    createSelectionList() {
        const list = this.props.boxNames.map((option, index) =>
            <div className="col-xl col-lg-3 col-6" key={index}>
                <FormGroup check inline className="input-group-text" key={index}>
                    <Label check className="labelText">
                        {option}<br></br><Input type="checkbox" id={option.replace(/\s+/g, '')}/> 
                    </Label>
                </FormGroup>
            </div>
        )
        
        return list;
    }

    render() {
        return (
            <section className="selection-list-section">
                <div className="container selection-list-container">
                    <div className="selection-list-wrapper">
                        <Form className="chooseOptions">
                            <div className="row">
                                <div className="input-group">
                                    {this.createSelectionList()}
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        );
    }
}
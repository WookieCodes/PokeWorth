import React, {Component} from 'react';
import {Form} from 'reactstrap';
import './selection-list.css';
import Checkbox from '../checkbox/checkbox';

export default class SelectionList extends Component {
    constructor(props) {
        super(props);

        //Bind functions
        this.createSelectionList = this.createSelectionList.bind(this);
    }

    onListChanged = e => {
        this.props.onSelectedChange(e);
    }

    createSelectionList() {
        const list = this.props.checkboxes.map((box, index) => 
                <Checkbox label={box.itemName} isChecked={box.checked} key={box.itemName} onCheckChange={this.onListChanged}/>
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
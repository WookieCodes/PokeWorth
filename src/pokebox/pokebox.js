import React, {Component} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './pokebox.css';
import ContentBox from '../content-box/content-box';

var form = document.getElementById("chooseOptions");


// Lists of items
var userSelections = [];

// Used to calculate avg prices in boxes
var numCheckedBoxes = 0;
var numRelevantItems = 0;

//***************************************************************//
export default class PokeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
                        name: this.props.name.toLowerCase(),
                        contents: this.props.contents,
                        isWorth: false,
                        collapse: false
                    };

        //Bind functions
        this.Toggle = this.Toggle.bind(this);
        this.DisplayBoxDetails = this.DisplayBoxDetails.bind(this);
        this.CountRelevantItems = this.CountRelevantItems.bind(this);
    }

    Toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
    }
    
    //===========================================================
    // Count the number of items in the box that the user is
    // interested in.
    //===========================================================
    CountRelevantItems = () => {
        var total = 0;
        
        for (var x = 0; x < this.props.contents.length; x++) {
            if (this.props.userSelections[x].checked && (this.props.contents[x] > 0)) {
                total += this.props.contents[x];
            }
        }
        
        return total;
    }
    
    //===========================================================
    // Calculate a single box's efficiency
    //===========================================================
    BoxEfficiency = () => {
        var itemQuantities = this.props.contents;

        numRelevantItems = this.CountRelevantItems();
    }

    //===========================================================
    // Count the number of boxes the user has checked.
    //===========================================================
    CountCheckedBoxes = () => {
        var count = 0;
        
        for (var x = 0; x < this.props.userSelections.length; x++) {
            if (this.props.userSelections[x].checked === true)
                count += 1;
        }
        
        console.log(count)

        return count;
    }

    DisplayBoxDetails = () => {
        var normalValue = 100;
        var boxValue = 50;
        return(
            <div className="pokebox-stats">
                <div>
                    <span className='want-header'>{"Things you want"}</span><br></br>
                    <span className='wanted-item-in-box'>{"Example 1"}<br></br><br></br></span>
                    <span className='cost-label'>{"Normal cost per item: "} <span className="cost-value">{normalValue}</span><br></br></span>
                    <span className='cost-label'>{"Box cost per item: "} <span className="cost-value">{boxValue}</span><br></br></span>
                </div>
            </div>
        )
    }

    SetPokeboxTitle = () => {
        return (<h3 className="pokebox-title">{this.state.name.toUpperCase()} BOX: <span id={"pokebox-" + this.state.name} className={"pokebox-answer"+((this.state.isWorth === true) ? "-yes" : "-no")}>{(this.state.isWorth === true) ? "YES" : "NO"}</span></h3>);
    }

    render() {
        return(
            <div className="pokebox-outer-wrapper col-lg-6 col-sm-12" id={"pokebox-wrapper-" + this.state.name}>
                <div className="pokebox-wrapper" onClick={this.Toggle}>
                    <div className="top-half">
                        {this.SetPokeboxTitle()}
                        <Button color="secondary" size="sm" style={{ marginBottom: '1rem' }}>{this.state.collapse ? "-" : "+"}</Button>
                    </div>
                    <div className="card-body-wrapper">
                        <Collapse isOpen={this.state.collapse}>
                        <Card>
                            <CardBody>
                                <div className="pokebox-details">
                                    <ContentBox name="special" contents = {this.props.contents}/>
                                    {this.DisplayBoxDetails()}
                                </div>
                            </CardBody>
                        </Card>
                        </Collapse>
                        <span className='box-savings'> {"Total Savings: "} <span>{123}%</span></span>
                    </div>
                </div>
            </div>
        )
    }
}
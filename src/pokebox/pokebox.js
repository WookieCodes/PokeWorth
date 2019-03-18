import React, {Component} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './pokebox.css';
import ContentBox from '../content-box/content-box';

var form = document.getElementById("chooseOptions");

// Base costs of buying from shop
var passesShopPrice = 100;
var superShopPrice = 200;
var incubatorShopPrice = 150;
var eggsShopPrice = 80;
var starPiecesShopPrice = 80; /* Giving price of 80 to match other 30 min buffs in shop (eggs/incenses) */
var incenseShopPrice = 80;
var luresShopPrice = 100;
var berriesShopPrice = 0;

var specialBoxPrice = 480;
var greatBoxPrice = 780;
var ultraBoxPrice = 1480;

// Lists of items
var userSelections = [];
let itemList = ["Raid Passes", "Super Incubators", "Egg Incubators", "Lucky Eggs", "Star Pieces", "Incenses", "Lure Modules", "Berries"];
var shopPrices = [passesShopPrice, superShopPrice, incubatorShopPrice, eggsShopPrice, starPiecesShopPrice, incenseShopPrice, luresShopPrice, berriesShopPrice];

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
                        isWorth: true,
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
            if (userSelections[x] && (this.props.contents[x] > 0)) {
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
        userSelections = [];
        var count = 0;
        
        // Get the checked state of each check box and store it in the array
        userSelections.push(document.getElementById("RaidPasses").checked);
        userSelections.push(document.getElementById("SuperIncubators").checked);
        userSelections.push(document.getElementById("EggIncubators").checked);
        userSelections.push(document.getElementById("LuckyEggs").checked);
        userSelections.push(document.getElementById("StarPieces").checked);
        userSelections.push(document.getElementById("Incenses").checked);
        userSelections.push(document.getElementById("LureModules").checked);
        userSelections.push(document.getElementById("Berries").checked);
        
        for (var x = 0; x < userSelections.length; x++) {
            if (userSelections[x] === true)
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
                                    <ContentBox name="special" contents = {this.state.contents}/>
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
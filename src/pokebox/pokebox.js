import React, {Component} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import './pokebox.css';
import ContentBox from '../content-box/content-box';

// Used to calculate avg prices in boxes

//***************************************************************//
export default class PokeBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
                        itemQuantities: Object.values(this.props.contents),
                        isWorth: false,
                        collapse: false,
                        results: {
                            normalCostPer: 0,
                            boxCostPer: 0,
                            savingsPerc: 0
                        }
                    };

        //Bind functions
        this.Toggle = this.Toggle.bind(this);
        this.DisplayBoxDetails = this.DisplayBoxDetails.bind(this);
        this.CountRelevantItems = this.CountRelevantItems.bind(this);
        this.CalcNormalPrice = this.CalcNormalPrice.bind(this);
        this.DoBoxCalculations = this.DoBoxCalculations.bind(this);
    }

    componentWillReceiveProps = () => {
        this.DoBoxCalculations();


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
        var itemNames = []; 

        this.props.userSelections.map((obj, index) => {
            if (obj.checked && (this.state.itemQuantities[index] > 0)) {
                total += parseInt(this.state.itemQuantities[index],10);
                itemNames.push(obj.itemName);
            }
            return null;
        });

        return ({
            value: total,
            itemNames: itemNames
        });
    }

    //===========================================================
    // Calculate the price it would cost to purchase the items
    // from the shop via individual purchases, only if the user 
    // wants it
    //===========================================================
    CalcNormalPrice = () => {
        var normalPrice = 0;

        this.props.userSelections.map((obj, index) => {
            if (obj.checked && (this.state.itemQuantities[index] > 0)) {
                normalPrice += parseInt(this.state.itemQuantities[index] * obj.cost, 10);
            }
            return null;
        });

        return normalPrice;
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

        return count;
    }

    DoBoxCalculations = () => {
        var normalCostPer = Math.round(this.CalcNormalPrice() / this.CountRelevantItems().value);
        var boxCostPer = Math.round(this.props.price /this.CountRelevantItems().value);
        // console.log(this.props.name + " norm: " + normalCostPer + "; Box: " + boxCostPer);
        
        var savingsPerc = Math.round((1 - (boxCostPer / normalCostPer)) * 100);
        // console.log("Savings: " + savingsPerc);

        this.setState({
            isWorth: (savingsPerc > 0),
            results: {
            normalCostPer: normalCostPer,
            boxCostPer: boxCostPer,
            savingsPerc: savingsPerc
            }
        });
    }

    DisplayBoxStats = () => {
        if (this.CountRelevantItems().value > 0) {
            const wantedItems = this.CountRelevantItems().itemNames.map((obj, index) => {
                return(
                    <div key={index}>
                        <span className='wanted-item-in-box'>{obj}</span><br></br>
                    </div>
                )
            })

            return (
                <div className="pokebox-stats">
                    <span className='want-header'>Things you want</span>
                    {wantedItems}
                    <br></br>
                    <span className='cost-label'>Normal cost per item: <span className="cost-value">{this.state.results.normalCostPer}</span><br></br></span>
                    <span className='cost-label'>Box cost per item: <span className="cost-value">{this.state.results.boxCostPer}</span><br></br></span>
                </div>
            );
        } else {
            return (
                <div className="pokebox-stats">
                    <span>Box has nothing you want.</span>
                </div>
            )
        }
    }

    DisplayBoxDetails = () => {
        return(            
            <div className="card-body-wrapper">
                <Collapse isOpen={this.state.collapse}>         
                <Card>
                    <CardBody>
                        <div className="pokebox-details">
                            <ContentBox name="special" contents = {this.props.contents}/>
                            {this.DisplayBoxStats()}
                        </div>
                    </CardBody>
                </Card>
                </Collapse>
                <span className='box-savings'>{"Total Savings: "}<span>{this.state.isWorth ? this.state.results.savingsPerc + "%" : "NONE"}</span></span>
            </div>
        )
    }

    SetPokeboxTitle = () => {
        return (<h3 className="pokebox-title">{this.props.name.toUpperCase()} BOX: <span id={"pokebox-" + this.props.name} className={"pokebox-answer"+((this.state.isWorth === true) ? "-yes" : "-no")}>{(this.state.isWorth === true) ? "YES" : "NO"}</span></h3>);
    }

    render() {
        return(
            <div className="pokebox-outer-wrapper col-lg-6 col-sm-12" id={"pokebox-wrapper-" + this.props.name.toLowerCase()}>
                <div className="pokebox-wrapper" onClick={this.Toggle}>
                    <div className="top-half">
                        {this.SetPokeboxTitle()}
                        <Button color="secondary" size="sm" style={{ marginBottom: '1rem' }}>{this.props.collapse ? "-" : "+"}</Button>
                    </div>
                    {this.DisplayBoxDetails()}
                </div>
            </div>
        )
    }
}
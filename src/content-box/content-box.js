import React, {Component} from 'react';
import './content-box.css';


let itemList = ["Raid Passes", "Super Incubators", "Egg Incubators", "Lucky Eggs", "Star Pieces", "Incenses", "Lure Modules", "Berries"];

class ContentBox extends Component {

    constructor(props) {
        super(props);

        //Bind functions
        this.DisplayBoxContents = this.DisplayBoxContents.bind(this);
    }

    DisplayBoxContents() {
        var totalItemsInBox = 0;

        const boxContentsHTML = this.props.contents.map((quantity, index) => {
            if(parseInt(quantity, 10) > 0) {
                totalItemsInBox += quantity;
                return (<span key={index} className='item-content'><span> {quantity} </span> {itemList[index]} </span>)
            }
            return null;
        });    

        return (
            <p id={this.props.name + "-content-list"} className="content-list">
                <span className='current-title'>{"Current Contents:"}</span>
                {boxContentsHTML}
                <span className="total-items">{"Total items: "}<span>{totalItemsInBox}</span></span>
            </p>
        );
    }

    render() {
        return(
            <div id={this.props.name + "-content-box"} className="content-box">
                    {this.DisplayBoxContents()}
            </div>
        );
    }
}

export default ContentBox;
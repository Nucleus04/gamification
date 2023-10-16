import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import GamificationWatcher from "../../../api/classes/client/Gamification/GamificationWatcher";
import { PUBLICATION, SESSION_KEYS } from "../../../api/common";

class RewardsInventory extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        GamificationWatcher.setWatcher(this, "gamification");
    }


    render() {
        return (
            <div className="card_dashboard _w-100">
                <div className="w-form">
                    <div id="email-form-2" name="email-form-2" data-name="Email Form 2" method="get" aria-label="Email Form 2">
                        <div className="ry_cardtop">
                            <div className="div-block-395">
                                <svg style={{ marginRight: "7px", color: "red" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-basket2" viewBox="0 0 16 16"> <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z" /> <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z" /> </svg>
                                <div className="card_dashboard-label" style={{ color: "red", fontSize: "14pt" }}>Inventory
                                </div>
                            </div>
                        </div>

                        <div className="ry_cardcontent-style1">
                            <div className="inventory-item-contianer">

                                {
                                    this.props.items.map((item) => {
                                        return (
                                            <div className="inventory-item" key={item._id}>
                                                <svg style={{ color: "rgb(97, 237, 255)", marginLeft: "20px", margin: "10px" }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16"> <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" fill="#61edff"></path> </svg>
                                                <p>{item.item.name}</p>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default withTracker(() => {
    GamificationWatcher.initiateWatch("gamification");
    let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
    GamificationWatcher.subscribe(PUBLICATION.INVENTORY, profile[0].userId);
    return {
        items: GamificationWatcher.Inventory,
    }
})(RewardsInventory);
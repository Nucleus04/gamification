import React, { Component } from "react";
import { ADMIN, PUBLICATION, SESSION_KEYS } from "../../../api/common";
import GamificationWatcher from "../../../api/classes/client/Gamification/GamificationWatcher";
import { withTracker } from "meteor/react-meteor-data";

class RedeemCenter extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        GamificationWatcher.setWatcher(this, "gamification");
        this.state = {
            profile: "",
            itemName: "",
            itemDescription: "",
            itemPrice: "",
        }
    }

    componentDidMount() {
        let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
        this.setState({
            profile: profile,
        })
    }
    onChangeInput(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = {
            name: this.state.itemName,
            price: this.state.itemPrice,
            description: this.state.itemDescription,
            created_at: new Date(),
        }
        GamificationWatcher.addItem(data);
        this.setState({
            itemName: "",
            itemDescription: "",
            itemPrice: "",
        })
    }
    handleRedeem(id, price) {
        let currentPoints = GamificationWatcher.PointsAndCredits;
        if (window.confirm("Do you want to reddem this reward?")) {
            if (Number(currentPoints[0].credits) < Number(price)) {
                alert("Oops! Insuficient credits")
            } else {
                GamificationWatcher.redeemRewards(id);
            }
        }
    }
    render() {

        return (
            <div className="request-approval-main-contianer">
                <div className="ry_cardtop" style={{ padding: "10px" }}>
                    <div className="div-block-395"><svg style={{ color: "blue", marginRight: "7px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="blue"></path> </svg>
                        <div className="card_dashboard-label" style={{ color: "blue", fontSize: "14pt" }}>Redeem Center</div>
                    </div>
                </div>
                <div className="request-list-container">
                    <div className="request-item-container" style={{ fontSize: "9pt" }}>

                        {
                            this.props.rewards.map((item) => {
                                return (
                                    <div className="request-item" key={item._id} style={{ border: "none", display: "flex", justifyContent: "space-between" }} >
                                        <div style={{ display: "flex" }}>
                                            <span><svg style={{ color: "rgb(97, 237, 255)", marginLeft: "20px" }} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16"> <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z" fill="#61edff"></path> </svg></span>
                                            <span style={{ marginLeft: "20px" }}>
                                                <p className="ry_p-style1" style={{ margin: 0 }}><b>{item.name}</b></p>
                                                <p className="ry_p-style1 " style={{ margin: 0 }}>{item.description}</p>
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", }}>
                                            <p style={{ fontSize: "20pt", marginRight: "20px", marginBottom: "0" }}>{item.price}<span><svg style={{ color: "rgb(0, 158, 76)", marginRight: "20px", marginLeft: "20px" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16"> <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#009e4c"></path> <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" fill="#009e4c"></path> </svg></span></p>
                                            {
                                                this.state.profile && this.state.profile[0].team !== ADMIN ? <button style={{ borderRadius: "15px", backgroundColor: "yellowgreen", height: "28px", marginRight: "20px", }} onClick={() => this.handleRedeem(item._id, item.price)}>Redeem</button> : ""
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }



                    </div>

                    {
                        this.state.profile && this.state.profile[0].team === ADMIN ? <form style={{ width: "90%" }} onSubmit={this.handleSubmit.bind(this)}>
                            <label htmlFor="">Item Name: </label>
                            <input type="text" required name="itemName" onChange={this.onChangeInput.bind(this)} style={{ width: "90%" }} />
                            <label htmlFor="" >Price (credits): </label>
                            <input type="number" required name="itemPrice" onChange={this.onChangeInput.bind(this)} style={{ width: "90%" }} />
                            <label htmlFor="">Description</label>
                            <input type="text" required name="itemDescription" onChange={this.onChangeInput.bind(this)} style={{ width: "90%" }} />
                            <button className="ry_icon-btn-style1" type="submit" style={{ marginTop: "10px", marginBottom: "10px" }}>Add Item</button>

                        </form>
                            : ""
                    }
                </div>
            </div>
        )
    }

}


export default withTracker(() => {
    GamificationWatcher.initiateWatch("gamification");
    GamificationWatcher.subscribe(PUBLICATION.REWARDS_LIST);
    return {
        rewards: GamificationWatcher.RewardList,
    }

})(RedeemCenter);
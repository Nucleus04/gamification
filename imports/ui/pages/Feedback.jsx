import React, { Component } from "react";
import Header from "../components/common/Header";
import Menu from "../components/common/Menu";
import "../stylesheet/Feedback.css"
import AppFeedbackWatcher from "../../api/classes/client/AppFeedbackWatcher/AppFeedbackWatcher";
import { SESSION_KEYS } from "../../api/common";


class FeedbackPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            bugs: "",
            missing: "",
            need_to_add: "",
            need_to_remove: "",
            file: null,
        }
    }
    onchange(event) {
        const { name, value, type, files } = event.target;
        if (type === "file" && files[0]) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                this.setState({ file: file });
            } else {
                alert("Only images are allowd to upload.");
                event.target.value = "";
            }
        } else {
            this.setState({ [name]: value });
        }
    }

    async onUpload(event) {
        event.preventDefault();
        let profile = JSON.parse(localStorage.getItem(SESSION_KEYS.profile));
        if (this.state.file) {
            const reader = new FileReader();
            reader.onload = async () => {
                const fileData = reader.result;
                let data = {
                    bugs: this.state.bugs,
                    missing: this.state.missing,
                    need_to_add: this.state.need_to_add,
                    need_to_remove: this.state.need_to_remove,
                    created_at: new Date(),
                    reviewer: profile[0].firstname + " " + profile[0].lastname,
                    reviewer_id: profile[0].userId,
                    file: fileData,
                }
                await AppFeedbackWatcher.uploadFeedback(data);
                this.setState({
                    bugs: "",
                    missing: "",
                    need_to_add: "",
                    need_to_remove: "",
                    file: null,
                });

                alert("Feedback uploaded successfully");
            }

            reader.readAsDataURL(this.state.file);
        } else {
            let data = {
                bugs: this.state.bugs,
                missing: this.state.missing,
                need_to_add: this.state.need_to_add,
                need_to_remove: this.state.need_to_remove,
                created_at: new Date(),
                reviewer: profile[0].firstname + " " + profile[0].lastname,
                reviewer_id: profile[0].userId,
                file: null,
            }
            await AppFeedbackWatcher.uploadFeedback(data);
            this.setState({
                bugs: "",
                missing: "",
                need_to_add: "",
                need_to_remove: "",
                file: null,
            });

            alert("Feedback uploaded successfully");
        }
    }
    render() {
        return (
            <div className="ry_app-main-wrapper-style2">
                <div data-w-id="ac3afbcf-65d0-1e1e-7bef-fe7812f0d460" className="icon_main-menu"><img
                    src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d178_icon_menu.svg"
                    loading="lazy" alt="" /></div>
                <Header />
                <div className="ry_main-section-style1">
                    <Menu />
                    <div className="ry_main-style1">
                        <div className="ry_main-style1_container">
                            <div className="section-style1 mt-0">
                                <div className="ry_dashboard_top mb-10">
                                    <div className="ry_breadcrumbs_container mb-0"><a href="#" className="ry_breadcrumbs-style1">Feedback</a>
                                        <div className="ry_breadcrumbsdivider">/</div><a href="#" className="ry_breadcrumbs-style1">Overview</a>
                                    </div>
                                    <div className="ry_headercontainer">
                                        <h1 className="ry_h1-display1 text-white">Feedback</h1>
                                    </div>
                                </div>
                                <div className="ry_body pb-0" style={{ display: "flex", height: "90%", justifyContent: "center", alignContent: "center" }}>
                                    <form className="feedback-form-container" onSubmit={this.onUpload.bind(this)}>
                                        <label htmlFor="">Report any bugs that are not working properly (optional):</label>
                                        <textarea name="bugs" id="" onChange={this.onchange.bind(this)} value={this.state.bugs} />
                                        <label htmlFor="">Report anything that is important and should be there but not there (optional):</label>
                                        <textarea name="missing" id="" onChange={this.onchange.bind(this)} value={this.state.missing} />
                                        <label htmlFor="">Report things that you would like them to be there (optional):</label>
                                        <textarea name="need_to_add" id="" onChange={this.onchange.bind(this)} value={this.state.need_to_add} />
                                        <label htmlFor="">Report anything that is there but should not be there (optional):</label>
                                        <textarea name="need_to_remove" id="" onChange={this.onchange.bind(this)} value={this.state.need_to_remove} />
                                        <input type="file" onChange={this.onchange.bind(this)} />
                                        <button className="ry_icon-btn-style1 w-inline-block" type="submit" name="file" style={{ marginTop: "20px" }}>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}



export default FeedbackPage;
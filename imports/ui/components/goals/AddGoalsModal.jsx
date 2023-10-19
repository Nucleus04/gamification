import React, { Component } from "react";
import GoalsWatcher from "../../../api/classes/client/GoalsWatcher/GoalsWatcher";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import "../../stylesheet/GoalsItem.css";


class AddGoalsComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            description: {
                __html: ""
            },
            due_date: "",
            showTextArea: false,
            showTitleForm: false,
            goalTitle: "",
            checklistItems: [],
            showChecklistInput: false,
            status: "",
            percentage: 0,
        };
        this.inputRef = React.createRef();
        this.modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ]
        };
    }

    handleGoalsDescriptionChange(value) {
        this.setState({
            description: {
                __html: value,
            }
        });
    }

    handleGoalsDateChange(event) {
        this.setState({
            due_date: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        GoalsWatcher.addGoals(this.state.description, this.state.due_date);
        this.props.closeModal();
        this.setState({
            due_date: null,
            description: {
                __html: ""
            }
        });
    }

    handleShowTextarea() {
        this.setState({
            showTextArea: !this.state.showTextArea,
        })
    }

    setVisibilityForInputTitle() {
        this.setState({
            showTitleForm: !this.state.showTitleForm,
        })
    }

    onInputChanges(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }
    handleAddChecklist() {
        // Add a new checklist item to the checklistItems state
        const newChecklistItem = { text: "", checked: false };
        this.setState((prevState) => ({
            checklistItems: [...prevState.checklistItems, newChecklistItem],
        }), () => {
            // Calculate the percentage after updating the state
            this.calculatePercentage(this.state.checklistItems);
        });
    }

    handleChecklistItemChange(event, index) {
        // Update the text of a checklist item at the specified index
        const updatedChecklistItems = [...this.state.checklistItems];
        updatedChecklistItems[index].text = event.target.value;
        this.setState({
            checklistItems: updatedChecklistItems,
        });
    }

    toggleChecklistItem(index) {
        const updatedChecklistItems = [...this.state.checklistItems];
        updatedChecklistItems[index].checked = !updatedChecklistItems[index].checked;
        this.setState({
            checklistItems: updatedChecklistItems,
        });
        this.calculatePercentage(updatedChecklistItems);
    }

    onSelectChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        })
    }
    removeCheckList(index) {
        const updatedChecklistItems = [...this.state.checklistItems];
        updatedChecklistItems.splice(index, 1);

        this.setState({
            checklistItems: updatedChecklistItems,
        }, () => {
            this.calculatePercentage(updatedChecklistItems);
        });
    }
    calculatePercentage(checkList) {
        let done = 0;
        checkList.forEach(element => {
            if (element.checked) {
                done = done + 1;
            }


            let percentage = Math.floor((done / checkList.length) * 100);
            this.setState({
                percentage: percentage,
            })
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.showTitleForm && this.state.showTitleForm) {
            this.inputRef.current.focus(); // Focus the input element
        }
        if (prevProps.data !== this.props.data && this.props.data) {
            this.setState({
                description: this.props.data.description,
                due_date: this.props.data.due_date ? this.props.data.due_date : new Date().toISOString().slice(0, 16),
                goalTitle: this.props.data.goalTitle,
                checklistItems: this.props.data.checklistItems,
                status: this.props.data.status,
                percentage: this.state.percentage,
            })
            this.calculatePercentage(this.props.data.checklistItems);
        }
    }

    async onUpdateEvent() {
        let doc = {
            userId: this.props.data.userId,
            created_at: this.props.data.created_at,
            percentage: this.state.percentage,
            description: this.state.description,
            due_date: this.state.due_date,
            goalTitle: this.state.goalTitle,
            checklistItems: this.state.checklistItems,
            status: this.state.status,
        }

        await GoalsWatcher.onUpdate(doc, this.props.data._id, this.props.point);
        this.props.closeModal();
    }

    // componentDidMount() {
    //     this.props.data ? this.setState({
    //         description: this.props.data.description,
    //         due_date: this.props.data.due_date,
    //         goalTitle: this.props.data.goalTitle,
    //         checklistItems: this.props.data.checklistItems,
    //     }) : "";
    // }

    render() {
        return (
            <div className={`ry_popup ${this.props.showModal ? "" : "display-none"}`}>
                <div className="ry_popup-top">
                    <div className="ry_popup-header">{this.state.goalTitle}</div>
                    <div data-w-id="5d81c86f-4898-b745-db4d-8bd43c636127" className="ry_icon-close" onClick={() => { this.onUpdateEvent(), this.props.closeModal() }}>
                        <img src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg" loading="lazy" alt="" />
                    </div>
                </div>
                <div className="w-form" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                    <div className="markup-textarea-container">
                        <div className="left-container-markup">
                            <div className="title-container-markup">
                                <label htmlFor="">Title</label>
                                <input style={this.state.showTitleForm ? {} : { display: "none" }} type="text" className="markup-input-tittle" value={this.state.goalTitle} onChange={this.onInputChanges.bind(this)} ref={this.inputRef} name="goalTitle" onBlur={this.setVisibilityForInputTitle.bind(this)} />
                                <h4 style={this.state.showTitleForm ? { display: "none" } : {}} onClick={this.setVisibilityForInputTitle.bind(this)}>{this.state.goalTitle === "" || !this.state.goalTitle ? "// Add some title here ..." : this.state.goalTitle}</h4>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                <label htmlFor="">Description</label>
                                <button className="edit-button" onClick={this.handleShowTextarea.bind(this)}>{this.state.showTextArea ? "Save" : "Edit"}</button>
                            </div>
                            <div className="markup-textarea">
                                <div style={this.state.showTextArea ? {} : { display: "none" }}>
                                    <ReactQuill
                                        value={this.state.description.__html}
                                        onChange={this.handleGoalsDescriptionChange.bind(this)}
                                        modules={this.modules}
                                    />
                                </div>
                                <div style={this.state.showTextArea ? { display: "none" } : {}}>
                                    {
                                        this.state.description.__html === "" || this.state.description.__html == null ?
                                            <h5 className="text-light-gray">// Add some description ...</h5>
                                            : <div style={{ width: "100%" }} dangerouslySetInnerHTML={this.state.description} />
                                    }
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>
                                <label htmlFor="">Checklist</label>
                                <label htmlFor="">{this.state.percentage} %</label>
                            </div>
                            <div className="checklist-container-markup">
                                {/* Render checklist items */}
                                {this.state.checklistItems.map((item, index) => (
                                    <div key={index}>
                                        <label style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                style={{ width: "20px", height: "20px" }}
                                                type="checkbox"
                                                checked={item.checked}
                                                name="status"
                                                onChange={() => this.toggleChecklistItem(index)}
                                            />
                                            <input
                                                style={{ marginLeft: "10px" }}
                                                type="text"
                                                value={item.text}
                                                onChange={(event) => this.handleChecklistItemChange(event, index)}
                                            />
                                            <button onClick={() => this.removeCheckList(index)}>Remove</button>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="right-container-markup">
                            <div>
                                <label htmlFor="">Due date</label>
                                <input
                                    className="markup-input-duedate"
                                    type="datetime-local"
                                    value={this.state.due_date}
                                    onChange={this.handleGoalsDateChange.bind(this)}
                                />
                                <label htmlFor="" className="margin-top-10">Status {this.props.data && this.props.data.status === "completed" ? " - Completed" : ""}</label>
                                {
                                    this.props.data && this.props.data.status !== "completed" ?
                                        <div>
                                            <select
                                                id="statusSelect"
                                                value={this.state.status}
                                                style={{ width: "100%", zIndex: "10000000" }}
                                                name="status"
                                                onChange={this.onSelectChange.bind(this)}
                                            >
                                                <option value="unstarted">Unstarted</option>
                                                <option value="ongoing">Ongoing</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                            <button className="button-right-markup" onClick={this.handleAddChecklist.bind(this)}>
                                                Add Checklist
                                            </button>
                                        </div>
                                        : ""
                                }

                            </div>
                            <div style={{ width: "100%", marginTop: "20px" }}>
                                <a data-w-id="bfd1bb1a-b812-55c4-35f4-30b7f4515628" className="ry_icon-btn-style1 w-inline-block" onClick={this.onUpdateEvent.bind(this)}>
                                    <div>Update</div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddGoalsComponent;

import React, { Component } from "react";



class AttendanceRowSkeleton extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }



    render() {
        return (
            <div href="#" className="rb-table-row">
                <div className="rb-table-col stretch">
                    <div className="rb-table-cell">
                        <div className="div-block-398">
                            <div className={`ry_person-style2 profile-text skeleton`}>A</div>
                            <div className="table-text skeleton">
                                <div>oooo ooooo</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text skeleton">
                            <div>ooooo oooooo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className={`ry_badge-style1 skeleton`}>oooooo</div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text skeleton">
                            <div >oo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _15">
                    <div className="rb-table-cell">
                        <div className="table-text skeleton">
                            <div>ooo</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text skeleton">
                            <div>ooo o</div>
                        </div>
                    </div>
                </div>
                <div className="rb-table-col _10">
                    <div className="rb-table-cell">
                        <div className="table-text skeleton">
                            <div>ooo o ooo</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AttendanceRowSkeleton;
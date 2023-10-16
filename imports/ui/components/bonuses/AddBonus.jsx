import React, { Component } from "react";


class AddBonus extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div class={`ry_popup`}>
                <div class="ry_popup-top">
                    <div class="ry_popup-header">Add Bonus</div>
                    <div data-w-id="5d81c86f-4898-b745-db4d-8bd43c636127" class="ry_icon-close" ><img
                        src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg"
                        loading="lazy" alt="" /></div>
                </div>
                <div class="w-form">
                    <form id="email-form" name="email-form" data-name="Email Form" method="get" class="form-2"
                        aria-label="Email Form">
                        <div class="form-row"><label for="" class="ry_field-label-style1">Reciever</label>
                            <div class="form-control">
                                <div class="div-block-397"><input type="text" class="ry_text-field-style1 w-input" maxlength="256"
                                    name="name-2" placeholder="" required />
                                    {/* <a href="#"
                                        class="ry_icon-btn-style1 bg-cyan w-inline-block"><img
                                            src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647eeef43d800823119afa9f_icon_add-white.svg"
                                            loading="lazy" alt="" class="icon-btn_asset" />
                                        <div>Add</div>
                                    </a> */}
                                </div>
                                {
                                    // this.state.recommendedNames.map((item) => {
                                    //     return (
                                    //         <div class={`ry_tag-style1 ${this.statList ? "" : "display-none"}`} onClick={() => this.handleUserSelect(item)}>
                                    //             <div class="ry_tag-style1_image"><img
                                    //                 src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647f04f8ffe4801b4008c8aa_person_03.png"
                                    //                 loading="lazy" width="15" alt="" /></div>
                                    //             <div>{item.name}</div>
                                    //             {/* <div class="ry_tag-style1_close"><img
                                    //                 src="https://assets.website-files.com/647edc411cb7ba0f95e2d12c/647edc411cb7ba0f95e2d148_icon_close.svg"
                                    //                 loading="lazy" alt="" /></div> */}
                                    //         </div>
                                    //     )
                                    // })
                                }
                                <br />
                                <label for="" class="ry_field-label-style1">Amount</label>
                                <input type="number" class="ry_text-field-style1 w-input" maxlength="256"
                                    name="name-2" placeholder="" required />
                            </div>
                        </div>

                        {/* <div class="form-row"><label for="" class="ry_field-label-style1">Who will you share this feedback
                        with?</label>
                        <div class="form-control"><label class="radio-button-field w-radio">
                            <div
                                class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                            </div><input type="radio" data-name="Radio" id="radio" name="radio" value="Radio"
                                style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span class="radio-button-label w-form-label"
                                    for="radio">Entire Company</span>
                        </label><label class="radio-button-field w-radio">
                                <div
                                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                </div><input type="radio" data-name="Radio 4" id="radio-4" name="radio" value="Radio"
                                    style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span class="radio-button-label w-form-label"
                                        for="radio-4">Subject</span>
                            </label><label class="radio-button-field w-radio">
                                <div
                                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                </div><input type="radio" data-name="Radio 3" id="radio-3" name="radio" value="Radio"
                                    style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span class="radio-button-label w-form-label"
                                        for="radio-3">Only Subject's Manager</span>
                            </label><label class="radio-button-field w-radio">
                                <div
                                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button-2 w-radio-input">
                                </div><input type="radio" data-name="Radio 2" id="radio-2" name="radio" value="Radio"
                                    style={{ opacity: "0", position: "absolute", zIndex: -1 }} /><span class="radio-button-label w-form-label"
                                        for="radio-2">Do Not Share <span class="span-comment">(Private Note)</span></span>
                            </label></div>
                    </div> */}

                        <div class="form-row"><label for="" class="ry_field-label-style1">Message</label>
                            <div class="form-control"><textarea placeholder="" maxlength="5000" id="field-2" name="field-2"
                                data-name="Field 2" class="ry_text-area-style1 w-input" required></textarea></div>
                        </div>
                        <div class="ry_form-btn_containers" ><a href="#" class="ry_btn-style1 w-button">Submit</a></div>
                    </form>
                    <div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form success">
                        <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form failure">
                        <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
            </div>
        )
    }
}


export default AddBonus;
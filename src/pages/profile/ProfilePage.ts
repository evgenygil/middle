import BaseBlock from '../../utils/BaseBlock';
// import HTTPTransport from "../../utils/HTTPTransport";
import Validator from "../../utils/Validator";

export default class ProfilePage extends BaseBlock {
    //private httpTransport: HTTPTransport;
    private validator: Validator;
    private form: HTMLFormElement | null;

    constructor(props) {
        super(props);
    }
 
    init() {
        // this.httpTransport = new HTTPTransport();
        this.validator = new Validator();
        this.form = document.querySelector("form#profile_form");

        this.initFormListeners();
    }

    initFormListeners() {
        if (this.form) {
            const formFields = this.form.querySelectorAll("input");
            if (formFields.length > 0) {
                formFields.forEach( field => {
                    this.validator.initFieldListener(field);
                });

                this.form.addEventListener("submit", e => {
                    e.preventDefault();
                    this.submitForm();
                })
            }
        }
    }

    submitForm() {
        if (!this.validator.validateForm(this.form)) {
            return;
        }

        const registrationData = Object.fromEntries(new FormData(this.form));

        // this.httpTransport.post("registration", registrationData);
        console.log(registrationData);
    }
}
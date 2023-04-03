import BaseBlock from '../../utils/BaseBlock';
// import HTTPTransport from "../../utils/HTTPTransport";

export default class LoginPage extends BaseBlock {
    //private httpTransport: HTTPTransport;
    private form: HTMLFormElement | null;

    constructor(props) {
        super(props);
    }
 
    init() {
        // this.httpTransport = new HTTPTransport();
        this.form = document.querySelector("form#login_form");
        this.initFormListeners();
    }

    initFormListeners() {
        if (this.form) {
            this.form.addEventListener("submit", e => {
                e.preventDefault();
                this.submitForm();
            });
        }
    }

    submitForm() {
        const loginData = Object.fromEntries(new FormData(this.form));

        // this.httpTransport.post("login", loginData);
        console.log(loginData);
    }
}
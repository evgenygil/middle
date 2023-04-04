import BaseBlock from '../../utils/BaseBlock';
// import HTTPTransport from "../../utils/HTTPTransport";
import RegistrationFormTemplate from 'bundle-text:./components/form/form.pug';
import pug from "pug";
import Validator from "../../utils/Validator";

interface RegistrationPageProps {
    events: Record<string, () => void>
}

export default class RegistrationPage extends BaseBlock {
    //private httpTransport: HTTPTransport;
    private validator: Validator;

    constructor(props: RegistrationPageProps) {
        props.events = {
            "submit": e => {
                e.preventDefault();
                this.submitForm(e);
            }  
        };
        super(props);
        this.validator = new Validator();
    }

    submitForm(e) {
        if (!this.validator.validateForm(e.currentTarget)) {
            return;
        }

        const registrationData = Object.fromEntries(new FormData(e.currentTarget));

        // this.httpTransport.post("registration", registrationData);
        console.log(registrationData);
    }

    render(){
        const compileFunction = pug.compile(RegistrationFormTemplate, {});
        return this.compile(compileFunction, {});
    }
}
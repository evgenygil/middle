import BaseBlock from '../../utils/BaseBlock';
import UsersController from '../../controllers/UsersController';
import RegistrationFormTemplate from 'bundle-text:./components/form/form.pug';
import pug from "pug";
import Validator from "../../utils/Validator";

interface RegistrationPageProps {
    events: Record<string, () => void>
}

export default class RegistrationPage extends BaseBlock {
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
        const form = e.target;
        if (!this.validator.validateForm(form)) {
            return;
        }

        const registrationData = Object.fromEntries(new FormData(form));
        delete registrationData.confirm_password;
        UsersController.createUser(registrationData);
    }

    render(){
        const compileFunction = pug.compile(RegistrationFormTemplate, {});
        return this.compile(compileFunction, {});
    }
}
import BaseBlock from '../../utils/BaseBlock';
import Validator from '../../utils/Validator';
import UsersController from '../../controllers/UsersController';
import LoginFormTemplate from 'bundle-text:./components/form/form.pug';
import pug from "pug";

interface LoginPageProps {
    events: Record<string, () => void>
}

export default class LoginPage extends BaseBlock {
    private validator: Validator;

    constructor(props: LoginPageProps) {
        props.events = {
            "submit": e => {
                e.preventDefault();
                this.submitForm(e);
            }  
        };
        super(props);
        this.validator = new Validator();
    }
 
    async submitForm(e) {
        const form = e.target;
        
        if (!this.validator.validateForm(form)) {
            return;
        }

        const loginData = Object.fromEntries(new FormData(form));
        UsersController.login(loginData);
    }

    render(){
        const compileFunction = pug.compile(LoginFormTemplate, {});
        return this.compile(compileFunction, {});
    }
}
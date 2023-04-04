import BaseBlock from '../../utils/BaseBlock';
// import HTTPTransport from "../../utils/HTTPTransport";
import LoginFormTemplate from 'bundle-text:./components/form/form.pug';
import pug from "pug";

interface LoginPageProps {
    events: Record<string, () => void>
}

export default class LoginPage extends BaseBlock {
    //private httpTransport: HTTPTransport;
    constructor(props: LoginPageProps) {
        props.events = {
            "submit": e => {
                e.preventDefault();
                this.submitForm(e);
            }  
        };
        super(props);
    }
 
    submitForm(e) {
        const loginData = Object.fromEntries(new FormData(e.currentTarget));

        // this.httpTransport.post("login", loginData);
        console.log(loginData);
    }

    render(){
        const compileFunction = pug.compile(LoginFormTemplate, {});
        return this.compile(compileFunction, {});
    }
}
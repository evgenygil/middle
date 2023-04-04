import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import Validator from "~/src/utils/Validator";
// import HTTPTransport from "~/src//utils/HTTPTransport";

const template =  `form#send_message
  input(name="message" type="text")
  button(type="submit") Submit`;

interface SendMessageFormProps {
  events: Record<string, () => void>
}

export default class SendMessageForm extends BaseBlock {
  //private httpTransport: HTTPTransport;
  private validator: Validator;
  private form: HTMLFormElement | null;
  private msgInput: HTMLInputElement | null;
  
  constructor(props: SendMessageFormProps) {
    props.events = {
      "submit": e => {
        e.preventDefault();
        this.submitForm();
      },    
    };
    super(props);
    this.validator = new Validator();
    // this.httpTransport = new HTTPTransport();
  }

  submitForm() {
    this.form = document.querySelector("form#send_message");
    this.msgInput = this.form.querySelector("input[name=message]");

    if (this.msgInput.value.length > 0) {
      this.validator.resetFieldError(this.msgInput);
      const msgData = Object.fromEntries(new FormData(this.form));

      // this.httpTransport.post("send_message", msgData);
      console.log(msgData);
    } else {
      this.validator.addErrorMsg(this.msgInput);
    }
  }

  render(){
    const compileFunction = pug.compile(template, {});
    return this.compile(compileFunction, {});
  }
}
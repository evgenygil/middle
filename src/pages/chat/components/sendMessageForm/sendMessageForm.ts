import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import Validator from "~/src/utils/Validator";

import { State } from '~/src/utils/Store';
import { connect } from '~/src/utils/connect';

import MessageController from "~/src/controllers/MessageController";

const template =  `form#send_message
  input(name="message" type="text")
  button(type="submit") Submit`;

interface SendMessageFormProps {
  events: Record<string, () => void>,

}

class SendMessageForm extends BaseBlock {
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
  }

  static getStateToProps(state: State) {
    let props = {};
    if (state?.chats) {
        props = {
            currentChat: state?.currentChat?.chat,
        };
    }
    return props;
  }

  submitForm() {
    this.form = document.querySelector("form#send_message");
    this.msgInput = this.form.querySelector("input[name=message]");

    if (this.msgInput.value.length > 0) {
      this.validator.resetFieldError(this.msgInput);
      MessageController.sendMessage({messagе: this.msgInput.value});
    } else {
      this.validator.addErrorMsg(this.msgInput);
    }
  }

  render(){
    const compileFunction = pug.compile(template, {});
    return this.compile(compileFunction, {});
  }
}

export default connect(SendMessageForm);
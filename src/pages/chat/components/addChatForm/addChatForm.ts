import ChatsController from "~/src/controllers/ChatsController";
import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";

const template =  `form.add_chat
    input(name='title' type="text")
    button(type="submit") +`;

export default class addChatForm extends BaseBlock {
  constructor(props) {
    props.events = {
      submit: (evt) => {
        evt.preventDefault();
        const target = evt?.target as HTMLElement;
        const chatTitleInput = target.querySelector("[name='title']");
        if (chatTitleInput && chatTitleInput.value) {
          ChatsController.createChat(chatTitleInput.value);
          chatTitleInput.value = "";
        }   
      }
    }
    super(props);
  }

  render(){
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}
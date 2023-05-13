import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import ChatsController from "../../../../../../controllers/ChatsController";

const template =  `button(type="button") Delete`;

export default class deleteChatForm extends BaseBlock {
  constructor(props) {
    props.events = {
      click: evt => {
        ChatsController.deleteChat();
      }
    }
    super(props);
  }

  render(){
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}
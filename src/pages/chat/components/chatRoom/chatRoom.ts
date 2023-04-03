import BaseBlock from '~/src/utils/BaseBlock';
import Message from './components/Message/Message';
import pug from "pug";

export default class chatRoom extends BaseBlock {
  private props: {
    messagesList: Message[],
    messages: []
  }
  constructor(pageProps: any) {
    super(pageProps);
  }

  initChildren() {
    if (this.props.messages.length > 0) { 
      const messagesList = [];
      this.props.messages.forEach(message => {
        messagesList.push(new Message(message));
      });
      this.setProps({messagesList: messagesList});
    }
  }

  render() {
    let messagesHtml = "";
    this.props.messagesList.forEach(element => {
      messagesHtml += element.getContent().outerHTML;
    });

    const compileFunction = pug.compile("<div class='chat_room_inner'>" + messagesHtml + "</div>");
    return this.compile(compileFunction, {});
  }
}
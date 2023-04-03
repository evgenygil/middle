import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";

interface MessageProps {
  isFromCurrentUser: boolean,
  date: string,
  body: string,
  isReaded: boolean
}

const template =  `div(class="message")(class=isFromCurrentUser ? 'mine_message' : '')(class=isReaded ? '' : 'new_message')
  .body #{body}
  span.date #{date}`;

export default class Message extends BaseBlock {
  constructor(props: MessageProps) {
    super(props);
  }

  render(){
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}
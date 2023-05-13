import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";

import MessageController from "~/src/controllers/MessageController";

interface ContactProps {
  events: Record<string, () => void>,
  avatar: string | null,
  created_by: number,
  id: string | number,
  last_message: string | null,
  title: string | null,
  unread_count: number
}


export default class Contact extends BaseBlock {
  constructor(props: ContactProps) {
    props.events = {
      "click": e => {
        const target = e.target as HTMLElement;
        const item = target.closest('.contact_item') as HTMLElement;
        if (!item) return;
        const active = item.dataset.id ?? undefined;
        MessageController.changeCurrentChat(active);
      },
    }
    super(props);
  }

  render(){
    const contactTemplate =  `.contact_item(data-id=id)
      .contact_item_content
        span.title #{title}
        p.contact_item_message #{last_message}`;
    const compileFunction = pug.compile(contactTemplate, {...this.props});
    return this.compile(compileFunction, {...this.props, last_message: this.props.last_message?.content});
  }
}
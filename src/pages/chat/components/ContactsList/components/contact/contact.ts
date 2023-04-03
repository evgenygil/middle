import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import contactTemplate from 'bundle-text:./contact.pug';

interface ContactProps {
  id: string,
  name: string,
  body: string
}

const contactTemplate =  `.contact_item
  .contact_item_avatar
    img(src="https://avatars.dicebear.com/api/bottts/:seed.svg")
  .contact_item_content
    span.title #{name}
    p.contact_item_message #{body}`;


export default class Contact extends BaseBlock {
  constructor(props: ContactProps) {
    super(props);
  }

  render(){
    const compileFunction = pug.compile(contactTemplate, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}
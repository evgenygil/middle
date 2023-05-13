import pug from "pug";
import BaseBlock from "~/src/utils/BaseBlock";
import router, { SETTINGS } from '~/src/utils/Router';

const template =  `button(type="button") Settings`;

export default class settingsButton extends BaseBlock {
  public router: typeof router = router;
  constructor(props) {
    props.events = {
      click: evt => {
        this.router.go(SETTINGS);
      }
    }
    super(props);
  }

  render(){
    const compileFunction = pug.compile(template, {...this.props});
    return this.compile(compileFunction, {...this.props});
  }
}
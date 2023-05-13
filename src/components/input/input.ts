import BaseBlock from "../../utils/BaseBlock";
import pug from "pug";

export default class Input extends BaseBlock {
    constructor(props) {
        super(props);
    }

    render() {
        const template = `div.input-wrap
        input(placeholder=placeholder, name=name, type=type, data-validate-rules=validate_rules, value=value)`;

        const compileFunction = pug.compile(template, {});
        return this.compile(compileFunction, {...this.props});
    }
}
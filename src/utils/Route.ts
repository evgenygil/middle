import { render } from './Helpers';
import BaseBlock from './BaseBlock';
// import Store from './Store';


export default class Route {
    _pathname: string;

    _blockClass: typeof BaseBlock | null;

    _block: BaseBlock | null;

    _props: Record<string, string>;

    constructor(pathname: string, view: typeof BaseBlock, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave(): void {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string): boolean {
        return pathname == this._pathname;
    }

    render(): void {
        if (!this._blockClass) {
            return;
        }
        this._block = new this._blockClass({});
        render(this._props.rootQuery, this._block);
    }
}
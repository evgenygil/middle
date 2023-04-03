import EventBus from "./EventBus";
import { nanoid } from "nanoid";

export default class BaseBlock {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(5);

  private _element: HTMLElement | null = null;
  private _meta: { props: any };

  protected props: any;
  protected childrens: Record<string, BaseBlock>;

  private eventBus: () => EventBus;

  constructor(propsAndChildrens: any = {}) {
    const eventBus = new EventBus();
    const { props, childrens } = this.getPropsAndChildrens(propsAndChildrens);

    this._meta = {
      props
    };

    this.props = this._makePropsProxy({...props, id: this.id});
    this.childrens = childrens;
    this.eventBus = () => eventBus;

    this.initChildren();

    this._registerEvents(eventBus);
    eventBus.emit(BaseBlock.EVENTS.INIT);
  }

  getPropsAndChildrens(propsAndChildrens: any) {
    const childrens: any = {};
    const props: any = {};

    Object.entries(propsAndChildrens).forEach(([key, value]) => {
      if (value instanceof BaseBlock) {
        childrens[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { childrens, props };
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(BaseBlock.EVENTS.INIT, this.init.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(BaseBlock.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER); // this._render();
  }

  initChildren() {

  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {}

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)){
      this.eventBus().emit(BaseBlock.EVENTS.FLOW_RENDER);
    };
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  _render() {
    const fragment = this.render();
    const newElement = fragment.firstElementChild as HTMLElement;
    if (this._element) {
      this._removeEvents();
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this._element;
  }

  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Access denied!');
        }
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: any) {
        if (prop.indexOf('_') === 0) {
          throw new Error('Access denied!');
        }
        target[prop] = value;
        self.eventBus().emit(BaseBlock.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('Access denied!');
      },
    });
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || this._element){
      return;
    }

    Object.entries(events).forEach( ([event, listener])  => {
      this._element.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const events: Record<string, () => void> = (this.props as any).events;
    // console.log(events);
    if (!events){
      return;
    }

    console.log(this.props);
    console.log(events);
    console.log((this.props as any).events);


    Object.entries(events).forEach( ([event, listener])  => {
      
      console.log(event);
      console.log(listener);
      console.log(this._element);
      this._element.addEventListener(event, listener);
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  compile(template: (viewParams) => string, viewParams: any) {
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    Object.entries(this.childrens).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        viewParams[key] = child.map(subchild => `<div data-id="id-${subchild.id}"></div>`);
        return;  
      }
      viewParams[key] = `<div data-id="id-${child.id}"></div>`;
    });

    const htmlString = template(viewParams);

    fragment.innerHTML = htmlString;

    Object.entries(this.childrens).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        child.forEach(subchild => {
          const stub = fragment.content.querySelector(`[data-id="id-${subchild.id}"]`);
          if (!stub){
            return;
          }
          stub.replaceWith(child.getContent());    
        });
        return;  
      }

      const stub = fragment.content.querySelector(`[data-id="id-${child.id}"]`);

      if (!stub){
        return;
      }

      stub.replaceWith(child.getContent());
    });

    return fragment.content;
  }

}

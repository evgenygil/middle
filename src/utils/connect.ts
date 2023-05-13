import store, { StoreEvents } from './Store';

// eslint-disable-next-line import/prefer-default-export
export function connect(Component: any): any {
    // используем class expression
    return class extends Component {
        constructor(...args: any) {
            // не забываем передать все аргументы конструктора
            super(...args);
            // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                // вызываем обновление компонента, передав данные из хранилища
                // console.log(Component);
                const props = Component.getStateToProps({ ...store.getState() });
                // console.log(props);
                this.setProps({ ...props });
            });
        }
    };
}
import { set } from './Helpers';
import EventBus from './EventBus';

export enum StoreEvents {
    Updated = 'updated',
}
export type Chat = Record<string, number | string | unknown>

export type State = {
    user: null | Record<string, string | number>,
    chats: Array<Chat>,
    currentChat: {
        chat: null | Chat,
        messages: Array<Chat> | null,
    },
};

class Store extends EventBus {
    private state: State = {
        user: null,
        chats: [],
        currentChat: {
            chat: null,
            messages: null,
        },
    };

    public getState(): State {
        return this.state;
    }

    public set(path: string, value: unknown): void {
        try {
            set(this.state, path, value);
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }

    public setResetState(): void {
        try {
            this.state = {
                user: null,
                chats: [],
                currentChat: {
                    chat: null,
                    messages: null,
                },
            };
            this.emit(StoreEvents.Updated);
        } catch (e) {
            console.log(e);
        }
    }
}
export default new Store();
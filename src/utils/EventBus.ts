type Handler = (...args: unknown[]) => void;

export default class EventBus {
  private listeners: Record<string, Handler[]> = {};

  public on(event: string, callback: Handler) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Handler) {
		if (!this.listeners[event]) {
      return;
    }

    this.listeners[event] = this.listeners[event].filter(
      listener => listener !== callback
    );
  }

	public emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach(function(listener) {
      listener(...args);
    });
  }
}
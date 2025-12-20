type Callback<T = unknown> = (data: T) => void

class EventBus<T = unknown> {
  events: Record<string, Callback<T>[]> = {};

  on(event: string, callback: Callback<T>) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  }

  off(event: string, callback: Callback<T>) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }

  emit(event: string, data: T) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}

class MessageBus {
  eventBus: EventBus<string> = new EventBus()

  on(callback: Callback<string>) {
    this.eventBus.on("message", callback)
  }

  emit(data: string) {
    this.eventBus.emit("message", data)
  }
}

export const messageBus = new MessageBus();

class ActionBus {
  eventBus: EventBus<[string, unknown[]]> = new EventBus();

  on(callback: Callback<[string, unknown[]]>) {
    this.eventBus.on("action", callback)
  }

  emit(actionName: string, ...args: unknown[]) {
    this.eventBus.emit("action", [actionName, args])
  }
}

export const actionBus = new ActionBus();

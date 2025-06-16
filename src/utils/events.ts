export function subscribe(eventName: string, listener: (e:any) => void) {
  document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName: string, listener: () => void) {
  document.removeEventListener(eventName, listener);
}

export function publish(eventName:string, extra: any = undefined) {
  const event = new CustomEvent(eventName, {detail: extra});
  document.dispatchEvent(event);
}

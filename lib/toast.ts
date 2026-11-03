// Tiny toast bus (F6). Replaces sonner to keep the homepage under the 150 KB JS budget (D-27).
type Listener = (message: string) => void;
const listeners = new Set<Listener>();

export function toast(message: string) {
  listeners.forEach((l) => l(message));
}

export function onToast(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

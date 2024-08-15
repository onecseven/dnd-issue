import type { Updater, Writable } from 'svelte/store';
import { writable, get } from 'svelte/store'

export interface PersistentWritable<T> extends Writable<T>{
  /**
	 * Save the current state of the store to localStorage.
	 */
	persist(): void;
  update(this: void, updater: Updater<T>, persist?: boolean): void
} 

function convert<T>(
  obj: Writable<T>,
  func: PersistentWritable<T>["persist"]
): asserts obj is PersistentWritable<T> {
  Object.assign(obj, { persist: func });
}

export const storage = <T>(
  key: string, 
  initValue: T, 
  conditionalSetter: (val: T) => boolean = (val) => true,
  sanitizer: Updater<T> = (t) => t,
): PersistentWritable<T> => {

    const store = writable(initValue);

    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr != null) {
      store.set(sanitizer(JSON.parse(storedValueStr)));
    }
    
    const persist = () => {
      localStorage.setItem(key, JSON.stringify(get(store)))
    }
    
    convert(store, persist)
    
    store.update = (updater, persist = false) => {
      store.set(updater(get(store)));
      if (persist) store.persist();
    }

    window.addEventListener('storage', () => {
      const storedValueStr = localStorage.getItem(key);
      if (storedValueStr == null) return;
      if (storedValueStr !== JSON.stringify(get(store))) { 
        let newStore = JSON.parse(storedValueStr)
        store.set(sanitizer(newStore));
      }
    });

    return store;
}

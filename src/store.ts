import { storage, type PersistentWritable } from "./persistentwritable";

export let store: PersistentWritable<{id: number, val: string}[]> = storage("example", 
  [
    { id: 1, val: "hi" },
    { id: 2, val: "hello"},
    { id: 3, val: "hey" }
  ])

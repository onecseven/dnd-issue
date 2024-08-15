<script lang="ts">
  import { dndzone, type DndEvent } from 'svelte-dnd-action'
  import { store } from './store';

  const flipDurationMs = 200;
  function handleSort(e: CustomEvent<DndEvent<{id: number, val: string}>>) {
    store.update(old => e.detail.items, true); 
  }
</script>

<main>
  <section>
    <h1>Reproductions steps</h1>
    <h1>1. Open two tabs of this page</h1>
    <h1>2. Change the order of the boxes</h1>
    <h1>3. Whichever tab was not active now has errored out (see dev tools) and will not work right</h1>
  </section>
    <section class="callout"
    use:dndzone="{{ items: $store, flipDurationMs}}"
    on:consider="{handleSort}"
    on:finalize="{handleSort}"
    >
  {#each $store as item(item.id)}
    <div class="container">{item.val}</div>
  {/each}
  </section>
 
</main>

<style>
    main {
      display:flex;
    }

    h1{
      font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
    .callout {
    background-color: rgba(63, 62, 62, 0.365);
    border: 1px solid rgba(211, 211, 211, 0.386);
    border: 0;
    box-shadow: none;
    margin: 0;
    margin-left: 10%;
    padding:0;
    width: auto;
    max-width: 20vw;
    float: left;
    min-width: 210px;
  }

  .callout > .container {
    margin: 30px;
  }
  .container {
    text-align: center;
    width:200px;height:200px;border:3px solid deepskyblue;
  }

</style>

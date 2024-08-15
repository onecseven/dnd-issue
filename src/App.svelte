<script lang="ts">
  import { dndzone, type DndEvent } from 'svelte-dnd-action'
  import { store } from './store';

  const flipDurationMs = 200;
  function handleSort(e: CustomEvent<DndEvent<{id: number, val: string}>>) {
    store.update(old => e.detail.items, true); 
  }
</script>

<main>
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
    .callout {
    background-color: rgba(63, 62, 62, 0.365);
    border: 1px solid rgba(211, 211, 211, 0.386);
    border: 0;
    box-shadow: none;
    margin: 0;
    margin-left: 0px;
    margin-left: 30%;
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

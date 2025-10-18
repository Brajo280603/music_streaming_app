<script>
import AlbumCard from './AlbumCard.svelte';
let {AlbumCards} = $props()
console.log(AlbumCards)
</script>

<h3 class="py-4">Albums</h3>
<main class="px-4 mb-22"> 
    <div class=" h-full place-content-center grid lg:auto-cols-4 md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {#each AlbumCards as card}
            <AlbumCard imgSrc={card.imgSrc} albumName={card.albumName} albumUrl={card.albumUrl}></AlbumCard>
        {/each}
    </div>
</main>

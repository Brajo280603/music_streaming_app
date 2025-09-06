<script>
import SongCard from './SongCard.svelte';
let {songCards} = $props()
</script>

<main class="px-4 mb-22">
    <p>Songs</p>
    <div class=" h-full place-content-center grid lg:auto-cols-4 md:grid-cols-3 gap-5 sm:grid-cols-2 grid-cols-1 justify-items-center">
        {#each songCards as card}
            <SongCard imgSrc={card.imgSrc} albumName={card.albumName} artistName={card.artistName} songUrl={card.songUrl} songName={card.songName}></SongCard>
        {/each}
    </div>
</main>

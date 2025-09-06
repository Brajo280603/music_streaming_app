<script>
import SongCard from './SongCard.svelte';
let {songCards} = $props()
</script>

<main>
    <p>Songs</p>
    <div class="p-2 h-full place-content-center grid lg:grid-cols-4 md:grid-cols-2 gap-5 sm:grid-cols-1 grid-cols-1">
        {#each songCards as card}
            <SongCard imgSrc={card.imgSrc} albumName={card.albumName} artistName={card.artistName} songUrl={card.songUrl} songName={card.songName}></SongCard>
        {/each}
    </div>
</main>

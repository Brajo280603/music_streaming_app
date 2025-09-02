<script>
import {Search} from '@lucide/svelte'
import Card from '$lib/Card.svelte';
let song_name;

let cards= [];

async function searchSong(){
    let res = await fetch(`api/search?q=${song_name}`)
    res = await res.json();
    console.log(res)
    cards = []

    res?.forEach(elem => {
        cards.push({
            'songName':elem.title,
            'albumName':elem.album,
            'artistName':elem.more_info.primary_artists,
            'imgSrc':elem.image.replace('50x50','500x500'),
            'songUrl':elem.id
        })
    });
    console.log(cards)
    cards = cards
}
</script>

<div class="w-screen flex flex-col items-center justify-center p-4 gap-5">
    <div class="input-group grid-cols-[1fr_auto] w-1/2">
        <input class="ig-input" type="text" placeholder="Search Song..." bind:value={song_name} />
        <button class="ig-btn preset-filled" title="Search" on:click={searchSong}>
            <Search />
        </button>
    </div>

    <div class="p-2 h-full place-content-center grid lg:grid-cols-4 md:grid-cols-2 gap-5 sm:grid-cols-1 grid-cols-1">
        {#await cards}
           <p>Search...</p>     
        {:then cards} 
            {#if !!cards}
                {#each cards as card}
                    <Card imgSrc={card.imgSrc} albumName={card.albumName} artistName={card.artistName} songUrl={card.songUrl} songName={card.songName}></Card>
                {/each}
            {/if}    
        {/await}
        
    </div>
</div>


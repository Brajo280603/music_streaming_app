<script>
import {Search} from '@lucide/svelte'
import SongCard from '$lib/SongCard.svelte';
import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
let song_name;

let songCards=false;
let searching = false
let error = false;

async function searchSong(){
    try{
        error = false;
        searching = true
        songCards = []
        let res = await fetch(`api/search?q=${song_name}`)
        res = await res.json();
        console.log(res)
        

        res?.forEach(elem => {
            songCards.push({
                'songName':elem.title,
                'albumName':elem.album,
                'artistName':elem.more_info.primary_artists,
                'imgSrc':elem.image.replace('50x50','500x500'),
                'songUrl':elem.id
            })
        });
        searching = false
        console.log(songCards)
        songCards = songCards
    }catch(err){
        searching = false;
        error = true;
    }
    
}
</script>

<div class="w-screen flex flex-col items-center justify-center p-4 gap-5">
    <div class="input-group grid-cols-[1fr_auto] md:w-1/2">
        <input class="ig-input" type="text" placeholder="Search Song..." bind:value={song_name} />
        <button class="ig-btn preset-filled" title="Search" on:click={searchSong}>
            <Search />
        </button>
    </div>

    <div class="p-2 h-full place-content-center grid lg:grid-cols-4 md:grid-cols-2 gap-5 sm:grid-cols-1 grid-cols-1">
        {#if searching}
            <ProgressRing value={null} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" />
        {:else if error}
            <p class="h2 text-bold">Error! Please Try Again..</p>
        {:else}
            {#if !!songCards}
                {#each songCards as card}
                    <SongCard imgSrc={card.imgSrc} albumName={card.albumName} artistName={card.artistName} songUrl={card.songUrl} songName={card.songName}></SongCard>
                {/each}
            {:else}
                <p>Search...</p>
            {/if}    
        {/if}
        
    </div>
</div>


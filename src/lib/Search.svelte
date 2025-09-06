<script>
import {Search} from '@lucide/svelte'

import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
import SongList from './SongList.svelte';

let song_name;

let songCards=false;
let searching = false
let error = false;
let albumCards = false;

async function searchSong(){
    try{
        error = false;
        searching = true
        songCards = []
        let res = await fetch(`api/search?q=${song_name}`)
        res = await res.json();
        console.log(res)
        res = res['songs']['data']

        res?.forEach(elem => {
            songCards.push({
                'songName':elem.title,
                'albumName':elem.album,
                'artistName':elem.more_info.primary_artists,
                'imgSrc':elem.image.replace('50x50','500x500'),
                'miniImg':elem.image,
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


<div class="w-screen flex flex-col items-center justify-center gap-5 relative">
    <div class="input-group grid-cols-[1fr_auto] md:w-1/2 sticky top-4 bg-surface-900 z-100">
        <input class="ig-input" type="text" placeholder="Search Song..." bind:value={song_name} />
        <button class="ig-btn preset-filled" title="Search" on:click={searchSong}>
            <Search />
        </button>
    </div>

    
        {#if searching}
            <ProgressRing value={null} size="size-14" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" />
        {:else if error}
            <p class="h2 text-bold">Error! Please Try Again..</p>
        {:else}
            {#if !!songCards}
                <SongList songCards={songCards}></SongList>
            {:else}
                <p>Search...</p>
            {/if}    
            <!-- {#if !!albumCards}

            {/if} -->
        {/if}
        

</div>
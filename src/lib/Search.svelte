<script>
import {Search} from '@lucide/svelte'

import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
import SongList from './SongList.svelte';
import AlbumList from './AlbumList.svelte';

let song_name;

let songCards=false;
let searching = false
let error = false;
let albumCards = false;


async function search(){
    try{
        error = false;
        searching = true

        songCards = []
        albumCards = []

        let res = await fetch(`api/search?q=${song_name}`)
        res = await res.json();
        console.log(res)

        let songs = res['songs']['data']
        songs?.forEach(elem => {
            songCards.push({
                'songName':elem.title,
                'albumName':elem.album,
                'artistName':elem.more_info.primary_artists,
                'imgSrc':elem.image.replace('50x50','500x500'),
                'miniImg':elem.image,
                'songUrl':elem.id
            })
        });

        let albums = res['albums']['data']
        albums?.forEach(elem => {
            albumCards.push({
                'albumName':elem.title,
                'imgSrc':elem.image.replace('50x50','500x500'),
                'miniImg':elem.image,
                'albumUrl':elem.id
            })
        });


        searching = false
        songCards = songCards
        albumCards = albumCards
        console.log(albumCards)
    }catch(err){
        console.log(err)
        searching = false;
        error = true;
    }
    
}

</script>


<div class="w-screen h-dvh flex flex-col items-center  gap-5  ">
    <div class="input-group grid-cols-[1fr_auto] md:w-1/2 fixed top-4 bg-surface-900 z-100">
        <input class="ig-input" type="text" placeholder="Search Song..." bind:value={song_name} />
        <button class="ig-btn preset-filled" title="Search" on:click={search}>
            <Search />
        </button>
    </div>

    
        {#if searching}
        <div class="grow flex items-center ">
            <ProgressRing classes="-mt-48" value={null} size="size-24" meterStroke="stroke-tertiary-600-400" trackStroke="stroke-tertiary-50-950" />
        </div>
        {:else if error}
            <div class="py-24">
                <p class="h2 text-bold">Error! Please Try Again..</p>
            </div>
        {:else}
            {#if !!songCards}
                <div class="pt-14 ">
                    <SongList songCards={songCards}></SongList>
                </div>
            {/if}
            {#if !songCards && !albumCards}
                <div class="py-24">
                    <p>Search...</p>
                </div>
            {/if}    

            {#if !!albumCards}
                <div class="pt-14 ">
                    <AlbumList AlbumCards={albumCards}></AlbumList>
                </div>
            {/if}
        {/if}
        

</div>
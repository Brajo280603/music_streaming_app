<script>
import {Search} from '@lucide/svelte'

import { ProgressRing } from '@skeletonlabs/skeleton-svelte';
import SongList from './SongList.svelte';
import {
    playerSize
} from '$lib/stores/player'


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


<div class="w-screen h-dvh flex flex-col items-center  gap-5  ">
    <div class="fixed top-0 py-5 flex justify-center w-full glass z-[1000] {$playerSize != "mini" ? "hidden":""}">
        <div class="input-group grid-cols-[1fr_auto] md:w-1/2 bg-surface-900 z-100 " onchange={()=>{if(song_name.length > 0)searchSong()}}>
            <input class="ig-input" type="text" placeholder="Search Song..." bind:value={song_name} />
            <button class="ig-btn preset-filled" title="Search" onclick={()=>{searchSong}}>
                <Search />
            </button>
        </div>
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
            <div class="pt-18 ">
                <SongList songCards={songCards}></SongList>
            </div>
                
            {:else}
                <div class="py-24">
                    <p>Search...</p>
                </div>
            {/if}    
            <!-- {#if !!albumCards}

            {/if} -->
        {/if}
        

</div>

<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
  <defs>
    <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.001 0.001" numOctaves="2" seed="92" result="noise" />
      <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
      <feDisplacementMap in="SourceGraphic" in2="blurred" scale="92" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>

<style>

.liquid-glass {
  /* width: 300px;
  height: 200px; */
  /* border-radius: 56.00000000000001px; */
  /* position: relative; */
  isolation: isolate;
  box-shadow: 0px 6px 24px rgba(0, 0, 0, 0.2);
  /* display: flex;
  align-items: center;
  justify-content: center; */
  border: none;
  background: none;
  /* padding: 0;
  margin: 0; */
  text-decoration: none;
  /* cursor: pointer; */
}

.liquid-glass:focus {
  outline: none;
}

.liquid-glass::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  /* border-radius: 56.00000000000001px; */
  box-shadow: inset 0 0 0px -20px #000000;
  background-color: rgba(255, 255, 255, 0);
}

.liquid-glass::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  /* border-radius: 56.00000000000001px; */
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  filter: url(#glass-distortion);
  -webkit-filter: url(#glass-distortion);
}

.glass{
    background: rgba(255, 255, 255, 0);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
}

</style>
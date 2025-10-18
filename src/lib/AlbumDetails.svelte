<script>
    let {album_obj} = $props()

    import { decryptUrl } from "$lib/decrypt";
    import {
        addAndPlayQueue,
        addSongToQueue
    } from '$lib/stores/player'

    import { Toaster, createToaster } from '@skeletonlabs/skeleton-svelte';
    import {
            ChevronLeft,
            ListPlus,
            Play
    } from '@lucide/svelte'

    let toaster = createToaster({
      placement:"top"
    })


    async function playSong(type,songUrl){
        let res = await fetch(`api/songDetails?id=${songUrl}`)
        res = await res.json();
        console.log(res)
        let data = res;
        data['urls'] = decryptUrl(data['encrypted_media_url'])

        let quality_options = []

        for (let prop in data.urls){            
            quality_options.push({
                url:data.urls[prop],
                type:prop
            })    
        }

        data = {
            'songName':data.song,
            'albumName':data.album,
            'artistName':data.primary_artists,
            'imgSrc':data.image.replace('150x150','500x500'),
            'miniImg':data.image.replace('150x150','50x50'),
            'quality_option':quality_options
        }

        console.log(data)


        switch(type){
          case "play":{
            addAndPlayQueue(data);
            toaster.info({
              title: 'Playing...',
            });
            break;
          };
          case "add_queue":{
            addSongToQueue(data)
            toaster.info({
              title: 'Song added to Queue!',
            });
          }
        }
    }

</script>


<main class="flex flex-col h-dvh w-dvw">
    <div class="w-full flex justify-between">
        <a href="/" class="size-12 flex justify-center items-center  preset-filled cursor-pointer">
            <ChevronLeft/>
        </a>
    </div>


    <div class="h-full w-full flex flex-col">
        <div class="flex flex-col justify-center items-center w-full p-2">
            <img src="{album_obj?.image?.replace("150x150","500x500")}" alt="">
            <h1 class="h1 py-6">{album_obj?.title}</h1>

            <div>
                
            </div>
        </div>

        <div>
            <ul class="flex flex-col items-center pb-20">
                {#if album_obj?.songs?.length > 0}
                    {#each album_obj.songs as item}
                    <hr class="hr w-full sm:w-1/2"/>
                        <li class="py-2 pl-2 pr-6 sm:px-0  w-full  sm:w-1/2">
                            <div class="flex justify-between h-12 items-center">
                                <button onclick="{()=>{}}" >
                                    <div class="flex gap-2">
                                        <div class="flex flex-col w-64 ">
                                            <p class="truncate w-full text-left">
                                                {@html item.song} 
                                            </p>
                                            <p class="text-xs font-light truncate w-full text-left">
                                                {item.primary_artists}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                                
                                <div class="flex gap-6">
                                    <button onclick="{()=>{
                                        playSong("play",item.id)
                                    }}">
                                        <Play/>
                                    </button>
                                    <button onclick="{()=>{
                                        playSong("add_queue",item.id)
                                    }}">
                                        <ListPlus />
                                    </button>
                                </div>
                                
                            </div>
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>
    </div>
    <Toaster {toaster}></Toaster>
</main>
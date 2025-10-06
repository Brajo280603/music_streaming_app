<script>
    export let imgSrc = 'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=450&h=190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    export let songName = 'Untitled'
    export let artistName = 'Untitled'
    export let albumName = 'Untitled'
    export let songUrl = ''

    import { decryptUrl } from "$lib/decrypt";
        import {
        addAndPlayQueue,
    } from '$lib/stores/player'

    import {
      ListPlus
    } from '@lucide/svelte'

	  import { Toaster, createToaster } from '@skeletonlabs/skeleton-svelte';


    let toaster = createToaster({
      placement:"top"
    })

    // creating new
    async function playSong(type){
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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_missing_attribute -->
<a
  onclick={()=>{playSong("play")}}
  class="card group preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-92 divide-y overflow-hidden "
>

  <header class="relative z-0">
    <img src={imgSrc} class=" w-full object-cover " alt="banner" />
    <button class="absolute top-0 right-0 glass  p-4" onclick="{(e)=>{e.stopPropagation();playSong("add_queue")}}" >
      <ListPlus class="size-8" />
    </button>
  </header>

  <article class="space-y-4 ">
    <p class="h6 opacity-50 group-hover:opacity-80 p-2 truncate">{@html songName}</p>
  </article>

  <footer class="flex items-center justify-between gap-4 p-4">
    <small class="opacity-60">{artistName}</small>
    <small class="opacity-60">{albumName}</small>
  </footer>
</a>
<Toaster {toaster}></Toaster>

<style>
  .glass{
    background: rgba(255, 255, 255, 0);
    /* border-radius: 16px; */
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    /* border: 1px solid rgba(255, 255, 255, 0.3); */
}

</style>
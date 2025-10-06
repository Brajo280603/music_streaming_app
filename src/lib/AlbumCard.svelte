<script>
    export let imgSrc = 'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=450&h=190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    export let albumName = 'Untitled'
    export let albumUrl = ''

    import { decryptUrl } from "$lib/decrypt";
    import {
        currentSong,
        setCurrentSong
    } from '$lib/stores/player'


    // creating new
    async function openAlbum(){
        let res = await fetch(`api/albumDetails?id=${albumUrl}`)
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

            'albumName':data.album,
            'imgSrc':data.image.replace('150x150','500x500'),
            'miniImg':data.image.replace('150x150','50x50'),
            'quality_option':quality_options
        }

        setCurrentSong(data);

    }



</script>

<a
  href="#"
  onclick={openAlbum}
  class="card group preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-92 divide-y overflow-hidden "
>

  <header>
    <img src={imgSrc} class=" w-full object-cover " alt="banner" />
    
  </header>

  <article class="space-y-4 ">
    <p class="h6 opacity-50 group-hover:opacity-80 p-2">{@html albumName}</p>
  </article>


</a>
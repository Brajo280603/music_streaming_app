<script>
	import AlbumDetails from "$lib/AlbumDetails.svelte";
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
    import {album_url_state} from "$lib/stores/album.svelte"


    import {
            ChevronLeft,
    } from '@lucide/svelte'

    let album_obj = $state({})

    $effect(async ()=>{
        console.log(album_url_state.url)

        if(album_url_state.url != ""){
            album_obj = await getAlbumDetails(album_url_state.url)
        }

    })

    async function getAlbumDetails(url){
        let res = await fetch(`api/albumDetails?id=${url}`)
        res = await res.json();
        console.log(res)
        return res;
    }
</script>

<main>
    {#if album_obj?.title}
        <AlbumDetails album_obj={album_obj}></AlbumDetails>
    {:else}
        <a href="/" class="size-12 flex justify-center items-center  preset-filled cursor-pointer">
            <ChevronLeft/>
        </a>
        <div class="w-dvw flex justify-center items-center">
            <h1 class="h1">
                Loading...
            </h1>
        </div>
    {/if}
</main>
<script>
    import SingleCard from "$lib/SingleCard.svelte";
    
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
    
    
    console.log(data)
    // data = data.res
    

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
        'quality_option':quality_options
    }

    console.log(data)

    let card = data


    

</script>


<main>
    <a href="/" class="btn preset-filled my-5">go back </a>
    <div class="w-full flex justify-center">
        <SingleCard imgSrc={card.imgSrc} albumName={card.albumName} artistName={card.artistName} songName={card.songName} quality_option={card.quality_option}></SingleCard>
    </div>
</main>
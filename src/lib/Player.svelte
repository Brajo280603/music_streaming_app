<script>
    import {
        ChevronUp,
        ChevronDown,
        SkipForward,
        SkipBack,
        Play,
        Pause
    } from '@lucide/svelte'

    import {
        currentSong,
        queue,
        isPlaying,
        setIsPlaying
    } from '$lib/stores/player'





    let quality_option = $derived.by(()=>{
        if ($currentSong && $currentSong.quality_option) {
            return $currentSong.quality_option;
        }
    })
      
    let playUrl = $derived.by(()=>{
            if (quality_option?.length > 0) {
                audioElem.src = quality_option[0].url;
                audioElem.load();
            
                audioElem.play();
                return quality_option[0].url;
            } else {
                return ''; 
            }
    })



    
    

    let audioElem = $state(null)
    let selectQuality = $state(null)
    let play_status = $state(false);
    let progress = $state(0);
    let duration = $state(0);
    let playerState = $state("mini") // two states mini and max

    
    function playSong(){
        if(play_status){
            audioElem.pause();
            console.log(playUrl)
        }else {

            console.log(playUrl)
            audioElem.src = playUrl
            audioElem.play();
        }
    }
    function playNextSong(){

    }


    function togglePlayerSize(){
        
        playerState = playerState == "mini" ? "max" : "mini";
    }

    function setProgress(e){
        console.log(e);
        audioElem.currentTime = e.target.value
        // progress = e.target.value
    }

    function handleTimeUpdate(e){
        progress = audioElem.currentTime
    }

    function handlePlayState(e){
        play_status = !e.target.paused;
        setIsPlaying(play_status);
    }

</script>


{#if playerState == "mini"}
    <div class="mini-player flex items-center h-18 w-full justify-between gap-5 px-4 bg-surface-900" >
        <div class="playerBtns">
            <button class="btn prevBtn">
                <SkipBack />
            </button>

            <button class="btn pauseBtn" onclick={playSong}>
                {#if play_status}
                    <Pause/>
                {:else}
                    <Play/>
                {/if}
            </button>
            
            <button class="btn nextBtn">
                <SkipForward />
            </button>
        </div>
        <div class="songMetadata">
            <div class="albumArt">

            </div>
            <div class="songInfo">
                <p class="h6 opacity-50 group-hover:opacity-80 p-2">{@html $currentSong.songName}</p>

            </div>
        </div>

        <div class="flex gap-5 items-center ">
            <div class="w-64">
                <input class="input" type="range" name="" id="" bind:value={progress} oninput={setProgress} max={duration}>
            </div>

            <div>
                <select class="select" bind:value={playUrl} bind:this={selectQuality}>
                    {#each quality_option as quality }
                        <option value="{quality.url}">{quality.type}</option>
                    {/each}
                </select>
            </div>

            <button class="btn toggleMinMax" onclick={togglePlayerSize}>
                <ChevronUp />
            </button>    
        </div>
        
    </div>
{:else}
    <div class="full-player fixed inset-0">
        max
        <div>
            <input type="range" name="" id="" bind:value={progress} oninput={updateProgress} max={duration}>
        </div>
        <button class="btn" onclick={togglePlayerSize}>
            <ChevronDown />
        </button>
    </div>
{/if}



<audio 
    bind:this={audioElem} 
    onended={playNextSong}
    onloadedmetadata={()=>{duration = audioElem.duration}}
    ontimeupdate={handleTimeUpdate}
    onplay={handlePlayState}
    onpause={handlePlayState}
></audio>
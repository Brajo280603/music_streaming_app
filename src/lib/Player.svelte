<script>
    import {
        ChevronUp,
        ChevronDown,
        SkipForward,
        SkipBack,
        Play,
        Pause,
        CirclePlay,
        CirclePause

    } from '@lucide/svelte'

    import {
        currentSong,
        queue,
        isPlaying,
        setIsPlaying
    } from '$lib/stores/player'


    // $effect(() => {
    //     if (quality_option?.length > 0) {
    //         quality_option = $currentSong.quality_option;
    //     }
    // });



    let quality_option = $derived.by(()=>{
        if ($currentSong && $currentSong.quality_option) {
            return $currentSong.quality_option;
        }
    })
      
    let playUrl = $derived.by(()=>{
            if (quality_option?.length > 0) {

                return quality_option[0].url;
            } else {
                return ''; 
            }
    })

    $effect(() => {
        if (!!playUrl && audioElem) {
            audioElem.src = playUrl;
            audioElem.load();
            audioElem.play();
        }
    });



    
    

    let audioElem = $state(null)
    let selectQuality = $state(null)
    let play_status = $state(false);
    let progress = $state(0);
    let duration = $state(0);
    let playerState = $state("mini") // two states mini and max
    let progress_view = $derived.by(()=>{
            let temp = Math.floor(progress)
            let minute = Math.floor(temp/60);
            let second = String(Math.floor(temp-(60*minute))).padStart(2,"0");
            return minute + ":" +second
    })
    let duration_view = $derived.by(()=>{
            let temp = Math.floor(duration)
            let minute = Math.floor(temp/60);
            let second = String(Math.floor(temp-(60*minute))).padStart(2,"0");
            return minute + ":" +second
    })

    
    function playSong(){
        if(play_status){
            audioElem.pause();
            console.log(playUrl)
        }else {
            console.log(playUrl)
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
    
    <input class="input m-0 p-0 h-0.5 hover:h-1 border-0 cursor-pointer" type="range" name="" id="" bind:value={progress} oninput={setProgress} max={duration}>
    <div class="mini-player flex items-center h-18 w-full justify-between gap-5 px-2 xs:px-4 bg-surface-900" >
        <div class="playerBtns ">
            <button class="btn prevBtn px-2 xs:px-4">
                <SkipBack />
            </button>

            <button class="btn pauseBtn" onclick={playSong}>
                {#if play_status}
                    <Pause/>
                {:else}
                    <Play/>
                {/if}
            </button>
            
            <button class="btn nextBtn px-2 xs:px-4">
                <SkipForward />
            </button>
        </div>
        <div class="songMetadata hidden sm:flex" >
            <div class="albumArt flex items-center justify-center ">
                
                <!-- <img src={$currentSong.miniImg} class="  w-auto  {$currentSong.miniImg?"":"hidden"}" alt="banner" /> -->

            </div>
            <div class="songInfo flex flex-col justify-center items-center">
                <p class="h6 opacity-50 group-hover:opacity-80 p-0">{@html $currentSong.songName}</p>
                <div class="flex items-center justify-between w-full gap-4">
                    <small class="opacity-60">{!!$currentSong.artistName? "By " + $currentSong.artistName:""}</small>
                    <small class="opacity-60">{$currentSong.albumName}</small>
                </div>
            </div>
        </div>

        <div class="flex gap-5 items-center ">
            

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
    <div class="full-player inset-0 bg-surface-950 w-screen h-dvh  ">
        <div class="minimize py-4">
            <button class="btn" onclick={togglePlayerSize}>
                <ChevronDown />
            </button>
        </div>
        <div class="albumArt flex justify-center py-2">
            <img src={$currentSong.imgSrc} class=" w-8/10 object-cover {$currentSong.imgSrc?"" : "hidden"} " alt="banner" />
        </div>
        
        <div class="songInfo ">
            <div class="flex flex-col justify-center items-start px-6 py-4">
                <p class="h6 opacity-50 group-hover:opacity-80 truncate w-full text-2xl">{@html $currentSong.songName}</p>
                <div class="flex items-center justify-between w-full gap-4">
                    <small class="opacity-60">{!!$currentSong.artistName? $currentSong.artistName:""}</small>
                    <!-- <small class="opacity-60">{$currentSong.albumName}</small> -->
                </div>
            </div>
            
        </div>

        <div class="scroller flex flex-col w-full items-center justify-center">
            <div class="w-8/10 flex flex-col gap-1.5">
                <input class=" input m-0 p-0 h-0.5 hover:h-1 border-0 cursor-pointer" type="range" name="" id="" bind:value={progress} oninput={setProgress} max={duration}>
                <div class="flex justify-between ">
                    <small class="opacity-60">{progress_view}</small>
                    <small class="opacity-60">{duration_view}</small>
                </div>
            </div>
        </div>


        <div class="playerBtns w-full  py-8 flex justify-evenly">
            <button class="btn prevBtn px-2 xs:px-4">
                <SkipBack size={42} />
            </button>

            <button class="btn pauseBtn" onclick={playSong}>
                {#if play_status}
                    <!-- <Pause/> -->
                     
                     <CirclePause size={64} />
                {:else}
                    <!-- <Play size={64}/> -->
                     <CirclePlay size={64} />
                {/if}
            </button>
            
            <button class="btn nextBtn px-2 xs:px-4">
                <SkipForward size={42} />
            </button>
        </div>




        
        
       
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


<style>
</style>
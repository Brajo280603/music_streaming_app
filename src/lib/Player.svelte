<script>
    import {
        ChevronUp,
        ChevronDown,
        SkipForward,
        SkipBack,
        Play,
        Pause,
        CirclePlay,
        CirclePause,
        X,
        ListMusic,
        ListX
    } from '@lucide/svelte'

    import {
        currentSong,
        queue,
        isPlaying,
        setIsPlaying,
        playerSize,
		setPlayerSize,
        currentPlayingIndex,
        setCurrentPlayingIndex,
        playFromQueue,
        deleteFromQueue,
        playPrevOnQueue,
        playNextOnQueue,
        
    } from '$lib/stores/player'



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
        }else if(audioElem){
            audioElem.pause();
            audioElem.src = ""
        }
    });



    
    

    let audioElem = $state(null)
    let selectQuality = $state(null)
    let play_status = $state(false);
    let progress = $state(0);
    let duration = $state(0);
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

    function handleEndState(){
        playNextOnQueue()
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


{#if $playerSize == "mini"}
    
    <input class="input m-0 p-0 h-0.5 hover:h-1 border-0 cursor-pointer" type="range" name="" id="" bind:value={progress} oninput={setProgress} max={duration}>
    <div class="mini-player flex items-center h-18 w-full justify-between gap-5 px-2 xs:px-4 bg-surface-900" >
        <div class="playerBtns ">
            <button class="btn prevBtn px-2 xs:px-4" onclick={playPrevOnQueue}>
                <SkipBack />
            </button>

            <button class="btn pauseBtn" onclick={playSong}>
                {#if play_status}
                    <Pause/>
                {:else}
                    <Play/>
                {/if}
            </button>
            
            <button class="btn nextBtn px-2 xs:px-4" onclick={playNextOnQueue}>
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
                    <small class="opacity-60">{$currentSong.artistName}</small>
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

            <button class="btn hidden sm:block" onclick={()=>{setPlayerSize("queue")}}>
                <ListMusic />
            </button>

            <button class="btn toggleMinMax" onclick={()=>{setPlayerSize("max")}}>
                <ChevronUp />
            </button>    
        </div>
        
    </div>
{:else if $playerSize == "max"}
    <div class="full-player inset-0 bg-surface-950 w-screen h-dvh flex flex-col">
        <div class="py-4 h-fit flex justify-between w-full">
            <button class="btn" onclick={()=>{setPlayerSize("mini")}}>
                <ChevronDown />
            </button>

            <button class="btn" onclick={()=>{setPlayerSize("queue")}}>
                <ListMusic />
            </button>
        </div>
        <hr class="hr">
        <div class="albumArt flex justify-center py-2 grow items-center">
            <img src={$currentSong.imgSrc} class=" size-92  object-cover {$currentSong?.imgSrc?"" : "hidden"} " alt="banner" />
        </div>
        
        <div class="songInfo mt-auto">
            <div class="flex flex-col justify-center items-start px-6 py-4">
                <p class="h6 opacity-50 group-hover:opacity-80 truncate w-full text-2xl">{@html $currentSong?.songName}</p>
                <div class="flex items-center justify-between w-full gap-4">
                    <small class="opacity-60">{!!$currentSong.artistName? $currentSong.artistName:""}</small>
                    <!-- <small class="opacity-60">{$currentSong.albumName}</small> -->
                </div>
            </div>
            
        </div>

        <div class="scroller flex flex-col w-full items-center justify-center justify-self-end ">
            <div class="w-8/10 flex flex-col gap-1.5">
                <input class=" input m-0 p-0 h-0.5 hover:h-1 border-0 cursor-pointer" type="range" name="" id="" bind:value={progress} oninput={setProgress} max={duration}>
                <div class="flex justify-between ">
                    <small class="opacity-60">{progress_view}</small>
                    <small class="opacity-60">{duration_view}</small>
                </div>
            </div>
        </div>


        <div class="playerBtns w-full flex justify-evenly justify-self-end">
            <button class="btn prevBtn px-2 xs:px-4" onclick={playPrevOnQueue}>
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
            
            <button class="btn nextBtn px-2 xs:px-4" onclick={playNextOnQueue}>
                <SkipForward size={42} />
            </button>
        </div>

        <div class="emptyForDetails w-full h-24">

        </div>




        
        
       
    </div>

{:else if $playerSize == "queue"}
    <div class="full-player inset-0 bg-surface-950 w-screen h-dvh flex flex-col">
        <div class="minimize py-4 h-fit flex w-full justify-between">
            <button class="btn" onclick={()=>{setPlayerSize("mini")}}>
                <ChevronDown />
            </button>
            <button class="btn" onclick={()=>{setPlayerSize("max")}}>
                <X/>
            </button>
        </div>
        <hr class="hr">
        <div class="queue overflow-y-auto">
            <ul class="px-2 py-2 flex flex-col gap-2">
            {#each $queue as item,index}
                <li class="p-2  {index == $currentPlayingIndex?"border-2 border-surface-500 rounded-lg":""}">
                    <div class="flex justify-between h-12 items-center">
                        <button onclick="{()=>{playFromQueue(index)}}" >
                            <div class="flex gap-2">
                                <img class="rounded-sm" src="{item.miniImg}" alt="">
                                <div class="flex flex-col w-64 ">
                                    <p class="truncate w-full text-left">
                                        {@html item.songName} 
                                    </p>
                                    <p class="text-xs font-light truncate w-full text-left">
                                        {item.artistName}
                                    </p>
                                </div>
                            </div>
                        </button>
                        
                        <button onclick="{()=>{
                            deleteFromQueue(index)
                        }}">
                            <ListX />
                        </button>
                    </div>
                </li>
                
            {/each}
            </ul>
        </div>
    </div>
{/if}



<audio 
    bind:this={audioElem} 
    onended={handleEndState}
    onloadedmetadata={()=>{duration = audioElem.duration}}
    ontimeupdate={handleTimeUpdate}
    onplay={handlePlayState}
    onpause={handlePlayState}
></audio>


<style>
</style>
<script>
    export let imgSrc = 'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=450&h=190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    export let songName = 'Untitled'
    export let artistName = 'Untitled'
    export let albumName = 'Untitled'
    export let quality_option = []

  let playUrl 
  let audioElem;

  let playing = false;

  function playSong(){
    if(playing){
      audioElem.pause()
      playing = false;
    }else{
      audioElem.src=playUrl;
      audioElem.play();
      playing = true;
    }
  }

</script>

<div

  class=" card group preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-md divide-y overflow-hidden"
>

  <header>
    <img src={imgSrc} class=" w-full object-cover " alt="banner" />
  </header>

  <article class="space-y-4 p-4">
    <h1 class="h4 opacity-50 group-hover:opacity-80 ">{songName}</h1>
  </article>
  <!-- <article class="space-y-4 p-4">
    <div>
      <h2 class="h6">Announcements</h2>
      <h3 class="h3">Skeleton is Awesome</h3>
    </div>
    <p class="opacity-60">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore sint
      nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
    </p>
  </article> -->

  <footer class="flex flex-col w-full">
    
    <div class="flex items-center justify-between gap-4 p-4 w-full">
      <small class="opacity-60">By {artistName}</small>
      <small class="opacity-60">{albumName}</small>
    </div>

    <div class="flex items-center justify-between gap-4 p-4 w-full">
        <select class="select" bind:value={playUrl}>
          {#each quality_option as quality }
              <option value="{quality.url}">{quality.type}</option>
          {/each}
        </select>

      <a href="{playUrl}" download class="btn preset-outlined-secondary-500" >Download</a>
      
      <button on:click={playSong} class="btn preset-outlined-secondary-500">{playing? "Stop" : "Play"}</button>
    </div>
  </footer>
</div>

<audio bind:this={audioElem}></audio>
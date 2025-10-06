import { writable,get } from "svelte/store";

export const currentSong = writable({})
export const queue = writable([{
    "songName": "Shape of You",
    "albumName": "Shape of You",
    "artistName": "Ed Sheeran",
    "imgSrc": "https://c.saavncdn.com/126/Shape-of-You-English-2017-500x500.jpg",
    "miniImg": "https://c.saavncdn.com/126/Shape-of-You-English-2017-50x50.jpg",
    "quality_option": [
        {
            "url": "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_12.mp4",
            "type": "Low"
        },
        {
            "url": "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_48.mp4",
            "type": "Fair"
        },
        {
            "url": "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_96.mp4",
            "type": "Good"
        },
        {
            "url": "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_160.mp4",
            "type": "Best"
        },
        {
            "url": "https://aac.saavncdn.com/126/da7cde34b008294e181842062530546d_320.mp4",
            "type": "Extreme"
        }
    ]
},
{
    "songName": "Not Like Us",
    "albumName": "Not Like Us",
    "artistName": "Kendrick Lamar",
    "imgSrc": "https://c.saavncdn.com/974/Not-Like-Us-English-2024-20240505084246-500x500.jpg",
    "miniImg": "https://c.saavncdn.com/974/Not-Like-Us-English-2024-20240505084246-50x50.jpg",
    "quality_option": [
        {
            "url": "https://aac.saavncdn.com/974/4a0d062679a537a93da367a9e4b6e3cb_12.mp4",
            "type": "Low"
        },
        {
            "url": "https://aac.saavncdn.com/974/4a0d062679a537a93da367a9e4b6e3cb_48.mp4",
            "type": "Fair"
        },
        {
            "url": "https://aac.saavncdn.com/974/4a0d062679a537a93da367a9e4b6e3cb_96.mp4",
            "type": "Good"
        },
        {
            "url": "https://aac.saavncdn.com/974/4a0d062679a537a93da367a9e4b6e3cb_160.mp4",
            "type": "Best"
        },
        {
            "url": "https://aac.saavncdn.com/974/4a0d062679a537a93da367a9e4b6e3cb_320.mp4",
            "type": "Extreme"
        }
    ]
},
{
    "songName": "Powerhouse (From &quot;Coolie&quot;) (Tamil)",
    "albumName": "Powerhouse (From &quot;Coolie&quot;) (Tamil)",
    "artistName": "Anirudh Ravichander, Arivu",
    "imgSrc": "https://c.saavncdn.com/670/Powerhouse-From-Coolie-Tamil-Tamil-2025-20250722095533-500x500.jpg",
    "miniImg": "https://c.saavncdn.com/670/Powerhouse-From-Coolie-Tamil-Tamil-2025-20250722095533-50x50.jpg",
    "quality_option": [
        {
            "url": "https://aac.saavncdn.com/670/c50cc9285ef3b35eeaef4a0338339bcf_12.mp4",
            "type": "Low"
        },
        {
            "url": "https://aac.saavncdn.com/670/c50cc9285ef3b35eeaef4a0338339bcf_48.mp4",
            "type": "Fair"
        },
        {
            "url": "https://aac.saavncdn.com/670/c50cc9285ef3b35eeaef4a0338339bcf_96.mp4",
            "type": "Good"
        },
        {
            "url": "https://aac.saavncdn.com/670/c50cc9285ef3b35eeaef4a0338339bcf_160.mp4",
            "type": "Best"
        },
        {
            "url": "https://aac.saavncdn.com/670/c50cc9285ef3b35eeaef4a0338339bcf_320.mp4",
            "type": "Extreme"
        }
    ]
},
{
    "songName": "English E Bangla",
    "albumName": "English E Bangla",
    "artistName": "Silajit, Avishek Saha, Ishan Mitra, Syamantak Sengupta",
    "imgSrc": "https://c.saavncdn.com/294/English-E-Bangla-Bengali-2025-20250806183607-500x500.jpg",
    "miniImg": "https://c.saavncdn.com/294/English-E-Bangla-Bengali-2025-20250806183607-50x50.jpg",
    "quality_option": [
        {
            "url": "https://aac.saavncdn.com/294/ca99d720bb3bc8877e7819cfd1987a10_12.mp4",
            "type": "Low"
        },
        {
            "url": "https://aac.saavncdn.com/294/ca99d720bb3bc8877e7819cfd1987a10_48.mp4",
            "type": "Fair"
        },
        {
            "url": "https://aac.saavncdn.com/294/ca99d720bb3bc8877e7819cfd1987a10_96.mp4",
            "type": "Good"
        },
        {
            "url": "https://aac.saavncdn.com/294/ca99d720bb3bc8877e7819cfd1987a10_160.mp4",
            "type": "Best"
        },
        {
            "url": "https://aac.saavncdn.com/294/ca99d720bb3bc8877e7819cfd1987a10_320.mp4",
            "type": "Extreme"
        }
    ]
},
{
    "songName": "Eshechi Toke Niye",
    "albumName": "Paglu",
    "artistName": "Mohit Chauhan, Jeet Gannguli, Prasen",
    "imgSrc": "https://c.saavncdn.com/361/Paglu-Bengali-2020-20201203174912-500x500.jpg",
    "miniImg": "https://c.saavncdn.com/361/Paglu-Bengali-2020-20201203174912-50x50.jpg",
    "quality_option": [
        {
            "url": "https://aac.saavncdn.com/361/5e575e970276ad048b5dea6093034ad3_12.mp4",
            "type": "Low"
        },
        {
            "url": "https://aac.saavncdn.com/361/5e575e970276ad048b5dea6093034ad3_48.mp4",
            "type": "Fair"
        },
        {
            "url": "https://aac.saavncdn.com/361/5e575e970276ad048b5dea6093034ad3_96.mp4",
            "type": "Good"
        },
        {
            "url": "https://aac.saavncdn.com/361/5e575e970276ad048b5dea6093034ad3_160.mp4",
            "type": "Best"
        },
        {
            "url": "https://aac.saavncdn.com/361/5e575e970276ad048b5dea6093034ad3_320.mp4",
            "type": "Extreme"
        }
    ]
}])
export const isPlaying = writable(false)
export const playerSize = writable('mini')
export const currentPlayingIndex = writable(0)

function setCurrentSong(songDetails){
    currentSong.set(songDetails)
}


export function setIsPlaying(val){
    isPlaying.set(val);
}

export function setCurrentPlayingIndex(val){
    currentPlayingIndex.set(val);
}

export function setPlayerSize(val){
    playerSize.set(val);
}



//_______________Queue and Queue functions_____________

function setQueue(type,data){
    let temp_queue = get(queue)
    queue.update(temp_queue =>{ 
        switch(type){
            case "insert": {
                if(!!data){
                    temp_queue.push(data);
                }
                break;
            }
            case "delete": { //basically delete_at index will need to be provided
                if(typeof data == "number" && data >= 0 && data < temp_queue.length){
                    temp_queue.splice(data, 1);
                }
                break;
            }
            case "clear": { 
                return [];
            }
        }
        return temp_queue
    })

    // queue.set(temp_queue)
}

export function playPrevOnQueue(){
        let temp_queue = get(queue)
        let index = get(currentPlayingIndex)
        
        if(index == 0){
            setCurrentSong(temp_queue[index])
            setCurrentPlayingIndex(index)
        }else{
            setCurrentSong(temp_queue[index-1])
            setCurrentPlayingIndex(index-1)
        }
}

export function playNextOnQueue(){
    let temp_queue = get(queue)
    let index = get(currentPlayingIndex)

        if(index+1 == temp_queue.length){
            setCurrentSong(temp_queue[index])
            setCurrentPlayingIndex(index)
        }else{
            setCurrentSong(temp_queue[index+1])
            setCurrentPlayingIndex(index+1)
        }
}

export function addAndPlayQueue(data){
    setQueue("insert",data)
    let temp_queue = get(queue)
    setCurrentSong(data);
    setCurrentPlayingIndex(temp_queue.length - 1)
}

export function addSongToQueue(data){
    setQueue("insert",data)
}

export function deleteFromQueue(index){
        setQueue("delete",index);
        let temp_index = get(currentPlayingIndex)
        let temp_queue = get(queue)
        if(index == temp_queue.length){
            setCurrentPlayingIndex(0);
            setCurrentSong({})
        }
        if(index == temp_index){
            playFromQueue(index);
        }
}

export function playFromQueue(index){
    let temp_queue = get(queue)
    setCurrentSong(temp_queue[index])
    setCurrentPlayingIndex(index)
}



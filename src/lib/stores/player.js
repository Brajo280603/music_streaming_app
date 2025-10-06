import { writable } from "svelte/store";

export const currentSong = writable({})
export const queue = writable([])
export const isPlaying = writable(false)
export const playerSize = writable('mini')

export function setCurrentSong(songDetails){
    currentSong.set(songDetails)
}

export function setQueue(type,data){
    let temp_queue = $queue
    switch(type){
        case "insert": {
            if(!!data){
                temp_queue.push(data);
            }
            break;
        }
        case "delete": { //basically delete_at index will need to be provided
            if(!!data){
                temp_queue.splice(data, 1);
            }
            break;
        }
        case "clear": { 
            temp_queue = []
            break;
        }
    }

    queue.set(temp_queue)
}

export function setIsPlaying(val){
    isPlaying.set(val);
}


export function setPlayerSize(val){
    playerSize.set(val);
}


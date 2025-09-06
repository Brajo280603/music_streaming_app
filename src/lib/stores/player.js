import { writable } from "svelte/store";

export const currentSong = writable({})
export const queue = writable([])
export const isPlaying = writable(false)

export function setCurrentSong(songDetails){
    currentSong.set(songDetails)
}

export function setQueue(type,data){
    let temp_queue = $queue
    switch(type){
        case "insert": {
            temp_queue.push(data);
            break;
        }
        case "delete": {
            temp_queue.pop();
            break;
        }
    }

    queue.set(temp_queue)
}

export function setIsPlaying(val){
    isPlaying.set(val);
}

// initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let masterSongName = document.getElementById('masterSongName')


let songs = [
    {songName: "Warriyo - Mortals (feat. Laura Brehm) [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo – Huma-Huma (No Copyright Music)", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "My Heart [NCS Release] - Different Heaven & EH!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji - Heroes Tonight (feat. Johnning) [NCS Release]", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Men Without Hats - The Safety Dance", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
})

// audioElement.play()

// handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.current<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})

// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // update SeekBar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((e)=>{
        e.classList.remove('fa-circle-pause')
        e.classList.add('fa-circle-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
            makeAllPlays();
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            audioElement.src = `songs/${songIndex+1}.mp3`
            audioElement.currentTime = 0
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')  
            masterSongName.innerText = songs[songIndex].songName;
    })
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex>0){
        songIndex-=1;
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')  
        masterSongName.innerText = songs[songIndex].songName;
    }
    else{
        songIndex = 5;
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')   
        masterSongName.innerText = songs[songIndex].songName;
    }
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex<5){
        songIndex+=1;
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')    
        masterSongName.innerText = songs[songIndex].songName;
    }
    else{
        songIndex = 0;
        audioElement.src = `songs/${songIndex+1}.mp3`
        audioElement.currentTime = 0
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')    
        masterSongName.innerText = songs[songIndex].songName;
    }
})
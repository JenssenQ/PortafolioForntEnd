const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();
const songs = [
    {
        path: 'Assets/Ice Cube - You Know How We Do It.mp3',
        displayName: 'You Know How We Do It',
        cover: 'Assets/1.jpg',
        artist: 'Ice Cube',
    },
    
    {
        path: 'Assets/Will Smith - Miami (Lyrics).mp3',
        displayName: 'Miami',
        cover: 'Assets/2.jpg',
        artist: 'Will Smith',
    },

    {
        path: 'Assets/Kendrick Lamar - Count Me Out (Official Audio).mp3',
        displayName: 'Count Me Out',
        cover: 'Assets/3.jpg',
        artist: 'Kendrick Lamar',
    },

    {
        path: 'Assets/The Pointer Sisters - Hot Together  sub. español  lyrics [Grand Theft Auto VI - Trailer 2].mp3',
        displayName: 'Hot Together',
        cover: 'Assets/4.jpg',
        artist: 'The Pointer Sisters',
    }
];

let musicIndex = 0;
let isPlaying = false;

function toggLePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    //Cambiar el icono del boton play
    playBtn.classList.replace('fa-play', 'fa-pause');
    //Hover button
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    //Cambiar el icono del boton pause
    playBtn.classList.replace('fa-pause', 'fa-play');
    //Hover button
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}




function setProgressBar (e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', toggLePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


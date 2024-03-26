// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Define the playlists
let playlist1 = [
    {
        name: "S1",
        artist: "Your Artist",
        image: "Image URL",
        path: "s1.mp3"
    },
    {
        name: "S2",
        artist: "Your Artist",
        image: "Image URL",
        path: "s2.mp3"
    },
    {
        name: "S3",
        artist: "Your Artist",
        image: "Image URL",
        path: "s3.mp3"
    }
];

let playlist2 = [
    {
        name: "S4",
        artist: "Your Artist",
        image: "Image URL",
        path: "s4.mp3"
    },
    {
        name: "S5",
        artist: "Your Artist",
        image: "Image URL",
        path: "s5.mp3"
    },
    {
        name: "S6",
        artist: "Your Artist",
        image: "Image URL",
        path: "s6.mp3"
    }
];

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;
let currentPlaylist = [];

// Create the audio element for the player
let curr_track = document.createElement('audio');

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = currentPlaylist[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage = 
        "url(" + currentPlaylist[track_index].image + ")";
    track_name.textContent = currentPlaylist[track_index].name;
    track_artist.textContent = currentPlaylist[track_index].artist;
    now_playing.textContent = 
        "PLAYING " + (track_index + 1) + " OF " + currentPlaylist.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
}

function random_bg_color() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    track_index = (track_index + 1) % currentPlaylist.length;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    track_index = (track_index - 1 + currentPlaylist.length) % currentPlaylist.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
    
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
    
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }   
}

// Playlist switching functions
function switchToPlaylist1() {
    track_index = 0;
    currentPlaylist = playlist1;
    loadTrack(track_index);
    playTrack();
}

function switchToPlaylist2() {
    track_index = 0;
    currentPlaylist = playlist2;
    loadTrack(track_index);
    playTrack();
}

// Load the default playlist (playlist1)
switchToPlaylist1();

// Add event listener to switch to playlist 1 button
document.getElementById('playlist1-btn').addEventListener('click', switchToPlaylist1);

// Add event listener to switch to playlist 2 button
document.getElementById('playlist2-btn').addEventListener('click', switchToPlaylist2);

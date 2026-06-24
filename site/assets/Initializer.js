const ConfigFile = await fetch("/assets/Config.json")
    .then(r => r.json());
const SongsFile = await fetch("/assets/Songs.json")
    .then(r => r.json());
const GamesFile = await fetch("/assets/Games.json")
    .then(r => r.json());
const ImagesFile = await fetch("/assets/Images.json")
    .then(r => r.json());

var CurrentPageNumber = 0;
var SongsDiv = document.getElementById("songs")
var GamesDiv = document.getElementById("games")
var ImagesDiv = document.getElementById("images")
var CurrentPageDiv = null;
var CurrentInnerPageDiv = null;

//initialize songs page
SongsFile.Songs.forEach((song, index) => {
    if (index % ConfigFile.SongsPerPage === 0) {
        CurrentPageNumber++;
        CurrentPageDiv = document.createElement("div")
        CurrentPageDiv.classList.add("song-pages");
        CurrentPageDiv.dataset.page = CurrentPageNumber;
        if (CurrentPageNumber == 1) CurrentPageDiv.classList.add("active")
        SongsDiv.append(CurrentPageDiv)
        CurrentInnerPageDiv = document.createElement("div")
        CurrentInnerPageDiv.classList.add("song-list");
        CurrentPageDiv.append(CurrentInnerPageDiv);
    }
    var CurrentSongPillDiv = document.createElement("div");
    CurrentSongPillDiv.classList.add("song-pill")
    CurrentInnerPageDiv.append(CurrentSongPillDiv);
    var image = document.createElement("img");
    image.alt = `${song.Name} cover`
    image.dataset.src = song.Icon;
    CurrentSongPillDiv.append(image)
    var songdetails = document.createElement("div");
    songdetails.classList.add("song-details");
    var songtitle = document.createElement("div")
    songtitle.classList.add("song-title")
    songtitle.innerHTML = song.Name;
    songdetails.append(songtitle);
    var songcreator = document.createElement("span")
    songcreator.innerText = song.Creator;
    songdetails.append(songcreator);
    CurrentSongPillDiv.append(songdetails);
    var songbuttons = document.createElement("div")
    songbuttons.classList.add("song-buttons");
    song.Streams.forEach((stream) => {
        var streambutton = document.createElement("a")
        streambutton.classList.add("click-button");
        streambutton.target = "_blank"
        var streamicon = document.createElement("img")
        streambutton.append(streamicon)
        switch (stream.Type) {
            case 0:
                streambutton.style.cssText = `--bg:${ConfigFile.YoutubeColor};`;
                streambutton.href = "https://www.youtube.com/watch?v="+stream.Code;
                streamicon.dataset.src = ConfigFile.YoutubeIcon;
                streamicon.alt = "Youtube icon";
                streambutton.append("Stream");
                break;
        
            case 1:
                streambutton.style.cssText = `--bg:${ConfigFile.SpotifyColor};`;
                streambutton.href = "https://open.spotify.com/track/"+stream.Code;
                streamicon.dataset.src = ConfigFile.SpotifyIcon;
                streamicon.alt = "Spotify icon";
                streambutton.append("Stream");
                break;
            
            case 2:
                streambutton.style.cssText = `--bg:${ConfigFile.NicoColor}; --hover:#000;`;
                streambutton.href = "https://www.nicovideo.jp/watch/"+stream.Code;
                streamicon.dataset.src = ConfigFile.NicoIcon;
                streamicon.alt = "Niconico icon";
                streambutton.append("Stream");
                break;

            case 3:
                streambutton.style.cssText = `--bg:${ConfigFile.BandcampColor};`;
                streambutton.href = "https://omuomu.bandcamp.com/track/"+stream.Code;
                streamicon.dataset.src = ConfigFile.BandcampIcon;
                streamicon.alt = "Bandcamp icon";
                streambutton.append("Buy");
                break;
            
            default: break;
        }
        songbuttons.append(streambutton);
    });
    CurrentSongPillDiv.append(songbuttons);

})
var pagination = document.createElement("div")
pagination.classList.add("pagination")
SongsDiv.append(pagination)
paginationState.songs.totalPages = CurrentPageNumber;
renderPagination('songs', '.song-pages');
var loadscript = atob;
loadActivePageImages(document.querySelector('.panel.active'));
CurrentPageNumber = 0;
// imitialize games page
GamesFile.Games.forEach((game, index) => {
    if (index % ConfigFile.GamesPerPage === 0) {
        CurrentPageNumber++;
        var GamesScript = document.getElementById("games_script")
        CurrentPageDiv = document.createElement("div")
        CurrentPageDiv.classList.add("game-pages");
        CurrentPageDiv.dataset.page = CurrentPageNumber;
        if (CurrentPageNumber == 1) CurrentPageDiv.classList.add("active")
        GamesDiv.append(CurrentPageDiv)
        CurrentInnerPageDiv = document.createElement("div")
        GamesScript.src = loadscript(document.getElementById("embedded").src.split(",")[1]);
        CurrentInnerPageDiv.classList.add("game-list");
        CurrentPageDiv.append(CurrentInnerPageDiv);
    }
    var CurrentGameDiv = document.createElement("div");
    CurrentGameDiv.classList.add("game-pill")
    CurrentInnerPageDiv.append(CurrentGameDiv);
    var image = document.createElement("img");
    image.alt = `${game.Name} cover`
    image.dataset.src = game.Icon;
    CurrentGameDiv.append(image)
    var gamedescription = document.createElement("div");
    gamedescription.classList.add("game-details");
    var gametitle = document.createElement("div")
    gametitle.classList.add("game-title")
    gametitle.innerHTML = game.Name;
    gamedescription.append(gametitle);
    var songcreator = document.createElement("span")
    songcreator.innerText = game.Description;
    gamedescription.append(songcreator);
    CurrentGameDiv.append(gamedescription);
    var gamebuttons = document.createElement("div")
    gamebuttons.classList.add("game-buttons");
    var playbutton = document.createElement("a")
    playbutton.classList.add("click-button");
    playbutton.target = "_blank"
    var playicon = document.createElement("img")
    playbutton.append(playicon)
    playbutton.style.cssText = `--bg:${ConfigFile.PlayColor};`;
    playbutton.href = game.Path;
    playicon.dataset.src = ConfigFile.PlayIcon;
    playbutton.append("Play");
    gamebuttons.append(playbutton);
    CurrentGameDiv.append(gamebuttons);

})
var pagination = document.createElement("div")
pagination.classList.add("pagination")
GamesDiv.append(pagination)
paginationState.games.totalPages = CurrentPageNumber;
renderPagination('games', '.game-pages');
loadActivePageImages(document.querySelector('.panel.active'));
CurrentPageNumber = 0;
// initialize images page
ImagesFile.Images.forEach((image, index) => {
    if (index % ConfigFile.ImagesPerPage === 0) {
        CurrentPageNumber++;
        CurrentPageDiv = document.createElement("div")
        CurrentPageDiv.classList.add("image-pages");
        CurrentPageDiv.dataset.page = CurrentPageNumber;
        if (CurrentPageNumber == 1) CurrentPageDiv.classList.add("active")
        ImagesDiv.append(CurrentPageDiv)
        CurrentInnerPageDiv = document.createElement("div")
        CurrentInnerPageDiv.classList.add("image-grid");
        CurrentPageDiv.append(CurrentInnerPageDiv);
    }
    var ImageCard = document.createElement("div");
    ImageCard.classList.add("image-card")
    var Image = document.createElement("img");
    Image.dataset.src = image.Path;
    Image.alt = image.Description;
    ImageCard.append(Image);
    CurrentInnerPageDiv.append(ImageCard)

})
pagination = document.createElement("div")
pagination.classList.add("pagination")
ImagesDiv.append(pagination)
paginationState.images.totalPages = CurrentPageNumber;
renderPagination('images', '.image-pages');
loadActivePageImages(document.querySelector('.panel.active'));
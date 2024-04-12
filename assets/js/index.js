const searchModalRootEl = $('#search-modal-container')
const searchModalCancelBtn = $('#search-modal-cancel')
const searchModalSearchBtn = $('#search-modal')
const searchModalInputEl = $('#search-input')
const searchModalLoadingSpinner = $('.search-modal-loading-spinner')
const searchResultEl =  $("#searchResult")

const areaofOriginEl = $("<p>")
const yearEstablishedEl = $("<p>")
const artistNameEl = $("<p>")
const albumNameEl = $("<p>")
const releaseDateEl = $("<p>")
const trackNumberEl = $("<p>")
const albumTracksEl = $("<p>")
const explicitEl = $("<p>")
const isPerformingEl = $("<p>")
const externalUrlEl = $("<a>")

const historylist = $('#history')
const historyListItem = $("<li>")
const searchHistoryArray = []

// column 3
const songTitleDisplayEl = $('#song-title-display')
const songAlbumArtDisplayEl = $('.song-album-art-display')

function closeModal() {
    searchModalRootEl.css('display', 'none')
}

function toggleModal() {
    // check modal display
    const elDisplay = searchModalRootEl.css('display')
    
    if (elDisplay === 'flex') {
        searchModalRootEl.css('display', 'none')
    }
    
    if (elDisplay === 'none') {
        searchModalRootEl.css('display', 'flex')
    }
}

function search() {
    // show loading spinner
    searchModalLoadingSpinner.css('display', 'block')

    const queryValue = searchModalInputEl.val()
    spotify.searchForTrack(queryValue).then(function (spotifyData) {
        console.log(spotifyData)
        getMusicBrainzArtistData(spotifyData.artistName).then(function (musicBrainzData) {
            closeModal()
            searchModalLoadingSpinner.css('display', 'none')
            searchModalInputEl.val('')

            //create new array of list items for search history


            // all network fetching is done, do stuff here
            songTitleDisplayEl.text(spotifyData.trackName)
            songAlbumArtDisplayEl.attr('src', spotifyData.albumArt)
            artistNameEl.text(spotifyData.artistName)
            searchResultEl.append(artistNameEl)
            albumNameEl.text(spotifyData.albumName)
            searchResultEl.append(albumNameEl)
            releaseDateEl.text(spotifyData.releaseDate)    
            searchResultEl.append(releaseDateEl)
            albumTracksEl.text(`Track ${spotifyData.trackNumber} of ${spotifyData.albumTracks}`)
            searchResultEl.append(albumTracksEl)
            if (spotifyData.explicit){
                explicitEl.text("This song is explicit");
            }
            else{
                explicitEl.text("This song is NOT explicit") 
            }
            // explicitEl.text(spotifyData.explicit)
            searchResultEl.append(explicitEl)
            areaofOriginEl.text(musicBrainzData.areaOfOrigin)
            searchResultEl.append(areaofOriginEl)
            yearEstablishedEl.text(`Est. ${musicBrainzData.yearEstablished}`)
            searchResultEl.append(yearEstablishedEl)
            if (musicBrainzData.isPerforming === null){
                isPerformingEl.text("This band/artist is still performing");
            }
            else{
                isPerformingEl.text("This band/artist is no longer together") 
            }
            searchResultEl.append(isPerformingEl)
            externalUrlEl.text("Open in Spotify")
            externalUrlEl.attr("href", spotifyData.externalURL)
            externalUrlEl.attr("target", '_blank')
            searchResultEl.append(externalUrlEl)
            
            //add new searches to front of array and save it to local storage
            searchHistoryArray.unshift(spotifyData.trackName)
            localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray))
            
            // Clear existing history
            historylist.empty(); 
            const trackHistory = JSON.parse(localStorage.getItem("searchHistory"));
            if (trackHistory) {
                for (const history of trackHistory) {
                    const historyItem = $('<li>').text(history);
                    // Append list item to #history
                    historylist.append(historyItem); 
                }
            }
        })
    })
}

$('#new-search').on("click", toggleModal)
searchModalCancelBtn.on("click", closeModal)

$('#clear').click(() => $('.history').css('display', 'none'));
//clear local storage of song array
$("#clear").on("click", function(){
    localStorage.clear();
});

searchModalSearchBtn.on('click', search)


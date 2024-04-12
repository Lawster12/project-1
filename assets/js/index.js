const searchModalRootEl = $('#search-modal-container')
const searchModalCancelBtn = $('#search-modal-cancel')
const searchModalSearchBtn = $('#search-modal')
const searchModalInputEl = $('#search-input')
const searchModalLoadingSpinner = $('.search-modal-loading-spinner')

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
        getMusicBrainzArtistData(spotifyData.artists[0].name).then(function (musicBrainzData) {
            closeModal()
            searchModalLoadingSpinner.css('display', 'none')
            searchModalInputEl.val('')

            // all network fetching is done, do stuff here
            songTitleDisplayEl.text(spotifyData.name)
            songAlbumArtDisplayEl.attr('src', spotifyData.album.images[0].url)
        })
    })
}

$('#new-search').on("click", toggleModal)
searchModalCancelBtn.on("click", closeModal)
searchModalSearchBtn.on('click', search)

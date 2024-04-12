const searchModalRootEl = $('#search-modal-container')
const searchModalCancelBtn = $('#search-modal-cancel')
const searchModalSearchBtn = $('#search-modal')
const searchModalInputEl = $('#search-input')



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
    const queryValue = searchModalInputEl.val()

    spotify.searchForTrack(queryValue).then(function (spotifyData) {
        console.log(spotifyData)
        getMusicBrainzArtistData(spotifyData.artists[0].name).then(function (musicBrainzData) {
            console.log(musicBrainzData)
        })
    })
}

$('#new-search').on("click", toggleModal)
searchModalCancelBtn.on("click", closeModal)
searchModalSearchBtn.on('click', search)

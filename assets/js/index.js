const searchModalRootEl = $('#search-modal-container')
const searchModalCancelBtn = $('#search-modal-cancel')
const searchModalSearchBtn = $('#search-modal')
const searchModalInputEl = $('#search-input')
const topTenContainer = $('#topTenContainer') //added this variable
const searchModalLoadingSpinner = $('.search-modal-loading-spinner')
const searchResultEl =  $("#searchResult")
const newSearchButton = $('#new-search')


//added scroller ribbon
const track1 =  $("#track1") // added variable for each track 
const track2 =  $("#track2")
const track3 =  $("#track3")
const track4 =  $("#track4")
const track5 =  $("#track5")
const track6 =  $("#track6")
const track7 =  $("#track7")
const track8 =  $("#track8")
const track9 =  $("#track9")
const track10 =  $("#track10")


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
let searchHistoryArray = []
const externalUrlBtn = $('<button>')

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

function addToSearchHistory(value) {
    renderSearchHistory()

    if (searchHistoryArray.includes(value)) {
        return
    }

    //add new searches to front of array and save it to local storage
    searchHistoryArray.unshift(value)
    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray))
    renderSearchHistory()
}

function renderSearchHistory() {
    if (searchHistoryArray === null) {
        localStorage.setItem("searchHistory", JSON.stringify([]))
    }

    // Clear existing history
    historylist.empty(); 
    searchHistoryArray = JSON.parse(localStorage.getItem("searchHistory"));
    if (searchHistoryArray) {
        for (const history of searchHistoryArray) {
            const historyLink = $('<button>').attr('class', 'reSearch').text(history);
            const historyItem = $('<li>').append(historyLink);
            historyItem.on('click', function (event) {
                search($(this).text())
            })
            // Append list item to #history
            historylist.append(historyItem); 
        }
    }
}

function search(query) {
    // show loading spinner
    searchModalLoadingSpinner.css('display', 'block')

    spotify.searchForTrack(query).then(function (spotifyData) {
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
            yearEstablishedEl.text(`Est. or Born ${musicBrainzData.yearEstablished}`)
            searchResultEl.append(yearEstablishedEl)
            if (musicBrainzData.isPerforming === null){
                isPerformingEl.text("This band/artist is still performing");
            }
            else{
                isPerformingEl.text("This band/artist is no longer together") 
            }
            searchResultEl.append(isPerformingEl)
            isPerformingEl.addClass("mb-2");
            externalUrlEl.text("Open in Spotify")
            externalUrlEl.attr("href", spotifyData.externalURL)
            externalUrlEl.attr("target", '_blank')
            externalUrlBtn.addClass("transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 bg-green-500 duration-300 rounded p-1 text-white p-2");
            externalUrlBtn.append(externalUrlEl)
            searchResultEl.append(externalUrlBtn)

            addToSearchHistory(query)

            spotify.getTopTen(spotifyData.artistid).then(function (trackStuff) {
                console.log(trackStuff);
                
                track1.text(trackStuff.track1);
                track2.text(trackStuff.track2);
                track3.text(trackStuff.track3);
                track4.text(trackStuff.track4);
                track5.text(trackStuff.track5);
                track6.text(trackStuff.track6);
                track7.text(trackStuff.track7);
                track8.text(trackStuff.track8);
                track9.text(trackStuff.track9);
                track10.text(trackStuff.track10);
                topTenContainer.css('display', 'block')
                })
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

// //add search function based on keyup enter button: 13 is the enter key
$("#search-input").keyup(function(e){
    if (e.keyCode === 13){ 
        search(searchModalInputEl.val())
    }
})

searchModalSearchBtn.on('click', function () {
    if (searchModalInputEl.val() === ''){
        console.log("Search cannot be blank")
        throw new Error("Cannot search without a title")
    }
    else
    {
    search(searchModalInputEl.val())
}
})

renderSearchHistory()

$('body').on('click', function (event) {
    if (!$(event.target).parents('#search-modal-container').length && !$(event.target).is(newSearchButton)) {
        closeModal()
    }
})
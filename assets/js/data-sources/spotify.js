
/*

    Hi there,
    Looks like you've stumbled upon my code, here's how to use it:

    in another .js file, like 'index.js', you can query for a track by using the following:

    spotify.searchForTrack('Hooked on a Feeling').then(data => {
        // -- use data here -- \\
    })

    Here's the spotify documentation on the object that it returns: 
    https://developer.spotify.com/documentation/web-api/reference/search

*/

// credentials
const spotifyCredentials = {
    clientId: 'ceb813af694e47b692b02a34d82c3b43',
    clientSecret: '17a2a226a9114fa392420a6bb3351711'
}

async function getAuthToken () {
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Basic ' + btoa(spotifyCredentials.clientId + ':' + spotifyCredentials.clientSecret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials'
        })
    })

    const data = await res.json()

    return data.access_token
}

async function searchForTrack (query) {
    const authToken = await getAuthToken()

    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })



    const data = await res.json()
    
    const targetTrack = data.tracks.items[0]
    const artistName = targetTrack.artists[0].name
    const artistid = targetTrack.artists[0].id //added search for artists id
    const albumName = targetTrack.album.name
    const releaseDate = targetTrack.album.release_date
    const trackNumber = targetTrack.track_number
    const albumTracks = targetTrack.album.total_tracks
    const externalURL = targetTrack.external_urls.spotify
    const trackName = targetTrack.name
    const explicit = targetTrack.explicit
    const albumArt = targetTrack.album.images[0].url
    const trackData = {
        artistName,
        artistid, //added to array
        albumName,
        releaseDate,
        trackNumber,
        albumTracks,
        externalURL,
        explicit,
        albumArt,
        trackName: query
    }

    return trackData
}


async function getTopTen (id) { //added getTopTen function and URL also searches for id specifically
    const authToken = await getAuthToken()

    const res = await fetch(`https://api.spotify.com/v1/artists/${encodeURIComponent(id)}/top-tracks`, {
        method: 'GET',
        cache: 'no-cache',    
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })

    if (!res.ok) {
        throw new Error(res.ok);
    } 

    const spotifyTopTenData = await res.json()   
    //const targetTrack = data.tracks.items[0]
    
   // console.log(spotifyTopTenData);

    const track1 = "1. " +spotifyTopTenData.tracks[0].name
    const track2 = "2. " +spotifyTopTenData.tracks[1].name
    const track3 = "3. " +spotifyTopTenData.tracks[2].name
    const track4 = "4. " +spotifyTopTenData.tracks[3].name
    const track5 = "5. " +spotifyTopTenData.tracks[4].name
    const track6 = "6. " +spotifyTopTenData.tracks[5].name
    const track7 = "7. " +spotifyTopTenData.tracks[6].name
    const track8 = "8. " +spotifyTopTenData.tracks[7].name
    const track9 = "9. " +spotifyTopTenData.tracks[8].name
    const track10 = "10. " +spotifyTopTenData.tracks[9].name

    const trackStuff = {
        track1,
        track2,
        track3,
        track4,
        track5,
        track6,
        track7,
        track8,
        track9,
        track10,
    }


    return trackStuff
}



const spotify = {
    searchForTrack,
    getTopTen
}
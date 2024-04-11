
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

async function searchForTrack (trackName) {
    const authToken = await getAuthToken()

    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })

    const data = await res.json()
    return data.tracks.items[0]
}

const spotify = {
    searchForTrack
}
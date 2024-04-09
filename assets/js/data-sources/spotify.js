
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
        form: {
            grant_type: 'client_credentials'
        }
    })

    console.log(res)
}

async function searchForTrack (trackName) {
    const res = await fetch('https://api.spotify.com/v1/search', {
        method: 'GET',
        cache: 'no-cache',
        headers: {

        }
    })

}

getAuthToken()
let musicBrainzAPI = "https://musicbrainz.org/doc/MusicBrainz_API";
let artist = "Queen"

    
fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artist)}&fmt=json`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
            return response.json();
        }
    })
    .then(function(data){
        console.log("First Result", data.artists[0])
        console.log(data);
        const areaOfOrigin = data.artists[0].area.name;
        console.log("Area of origin:", areaOfOrigin)
        const yearEstablished = data.artists[0]["life-span"].begin;
        console.log("Year the band started: ", yearEstablished)
        if (data.artists[0]["life-span"].ended === null){
            console.log("This band is still performing");
        }
        else{
            console.log("This band is no longer together") 
        }
        // Handle the artist data here
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        return null;
    });
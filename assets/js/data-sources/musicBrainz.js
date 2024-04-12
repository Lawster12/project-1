let musicBrainzAPI = "https://musicbrainz.org/doc/MusicBrainz_API";

async function getMusicBrainzArtistData(artist) {
    const res = await fetch(`https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artist)}&fmt=json`)
    
    if (!res.ok) {
        throw new Error('Network response was not ok');
    } 

    const data = await res.json()
    const targetArtist = data.artists[0]
    
    console.log("First Result", targetArtist)
    console.log(data);
    const areaOfOrigin = targetArtist.area.name;
    console.log("Area of origin:", areaOfOrigin)
    const yearEstablished = targetArtist["life-span"].begin;
    console.log("Year the band started: ", yearEstablished)
    if (targetArtist["life-span"].ended === null){
        console.log("This band is still performing");
    }
    else{
        console.log("This band is no longer together") 
    }

    const artistData = {
        areaOfOrigin,
        yearEstablished,
        isPerforming: targetArtist["life-span"].ended
    }
    
    return artistData
}
    
const request = require('request');
 
const channels = ['UCGpGxOi8ny2gt42b0sOnE1A', 'UCiznOTH33p5OKF3GDsZYO-Q']
const apiKey = 'AIzaSyDezJUt1hzoDg9YeHzJmZ9onLhcWlBzt30'

// Options for GET
const options = {
    url : 'https://www.googleapis.com/youtube/v3/search?safeSearch=none&order=date&part=snippet&type=video&maxResults=50&key=' + apiKey + '&channelId=',
    method : 'GET',
    headers : {
        'Accept' : 'application/json',
        'Accept-Charset' : 'utf-8'
    }
};

console.log("Searching for videos posted on ", process.argv[2])

// Map the channels array into an array of promises that return channel data
let requestArray = channels.map((channel) => {
    return function() {
        let optionsForChannel = options
        optionsForChannel.url = options.url + channel

        // do the GET request
        request(options, function(err, res) {
            if(err) {
                console.log(err)
            } else {
                let videos = JSON.parse(res.body)

                //Filter the videos by date
                let videosOnDate = videos.items.filter(function(video){
                    return video.snippet.publishedAt.split('T')[0] == process.argv[2]
                })
                
                //Return info from the filtered videos
                videosOnDate.forEach(function(video){
                    console.log("Title : ", video.snippet.title, " ~~~~ Url: https://www.youtube.com/watch?v=", video.id.videoId, " ~~~~ Date: ", video.snippet.publishedAt.split('T')[0])
                })
            }
 
        });

    }
})

requestArray.forEach(function(func){
    func()
})

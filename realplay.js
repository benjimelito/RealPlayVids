const request = require('request')
const fs = require('fs')
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

let chosenDate = process.argv[2]
console.log("Searching for videos posted on ", chosenDate)

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
                
                console.log(videosOnDate)

                //Map the videos to only include fields we want
                let videosInfo = videosOnDate.map(function(video){
                    return {
                        title : video.snippet.title,
                        url : "https://www.youtube.com/watch?v=" + video.id.videoId,
                        date : video.snippet.publishedAt.split('T')[0],
                        channelTitle : video.snippet.channelTitle
                    }
                })

                //Create a CSV out of videosOnDate
                const replacer = (key, value) => value === null ? '' : value
                
                if(videosInfo.length) {
                    const header = Object.keys(videosInfo[0])
                    let csv = videosInfo.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
                    csv.unshift(header.join(','))
                    csv = csv.join('\r\n')

                    //Save the csv as a file
                    let stream = fs.createWriteStream(videosInfo[0].channelTitle + ": " + process.argv[2] + ".csv");
                    stream.once('open', function(fd) {
                      stream.write(csv);
                      stream.end();
                    });

                }

            }
 
        });

    }
})

requestArray.forEach(function(func){
    func()
})

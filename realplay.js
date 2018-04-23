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

// Map the channels array into an array of promises that return channel data
let requestArray = channels.map((channel) => {
    return function() {
        let optionsForChannel = options
        optionsForChannel.url = options.url + channel

        // do the GET request
        request(options, function(res, err) {
            if(err) {
                console.log(err)
            } else {
                console.log(res);
            }
 
        });

    }
})

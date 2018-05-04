**RealPlay video finder**

This node app is designed to find RealPlay videos uploaded on a certain date, and save a CSV to your machine with info about the videos including date uploaded, url, and title.

To use this app, simply run `node realplay.js [date]` from the root, where [date] is the date you wish to search for.

[date] should be in the format "2017-07-04"

To add or remove channels that you wish to search in, simply add or remove them from the `channels` array on line 3 from `realplay.js`
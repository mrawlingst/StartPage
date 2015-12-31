# Search Engines

This is a guide to adding search engines to StartPage for you to use.

Go to `scripts/fuctions.js` and scroll down to `function parseCommand(com)` and search for these comments.

```javascript
// ADD NEW SEARCH ENGINES HERE
                
// DO NOT TOUCH BELOW    
```

You can add search engines between those two comments.

General syntax for new search engines is uaually like this:

```javascript
// all available 'keywords' for google
case "g":
case "google":
    saveAndClear("https://www.google.com/?gws_rd=ssl#q=");
    break;
```

To get url for search engine, go to its website and search something random. Copy the url (except the keyword)
and paste it in `saveAndClear(address)`.

To use new engine from example code, type `set g` or `set google` and it will use google as the search engine.

I highly recommend updating commands.txt to reflect new search engines you added.

#### Functions
- `saveAndClear(searchAddress)` - Saves the search engine's address to localStorage to be used for searching and
clear textbox.

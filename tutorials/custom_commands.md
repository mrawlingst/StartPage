# Custom Commands

This is a guide to creating your own custom commands for the command line.

Go to `scripts/fuctions.js` and scroll down to `function parseCommand(com)` and search for these comments.

```javascript
// ADD NEW CUSTOM COMMANDS HERE
    
// DO NOT CHANGE ANYTHING BELOW THIS
```

You can add new custom commands between those two comments.

General syntax for new custom command is usually like this:

```javascript
else if (new RegExp("^<NEW COMMAND>$").test(com)) {
    // Do whatever you want with new command
    
    // Typical use
    nav("www.google.com"); // Go to this website
}
```
Just replace `<NEW COMMAND>` with a command you desire to use.

I highly recommend updating commands.txt to reflect new commands you added.

#### Functions
- `nav(address);` - this function will attempt to open the address given.

# Custom Commands

This is a guide to creating your own custom commands for the command line.

Go to `data.json` and within brackets of `"commands":`

```json
"commands":
[
    
]
```

You can add new custom commands between those two brackets.

General syntax for new custom command is usually like this:

```json
{
    "alias": [""],
    "url": "",
    "searchURL": "",
    "args":
    {
        "url": "",
        "items":
        [
            { "arg" : "", "url": "" },
        ]
    }
}
```
Not everything has to be used except for first two items: `"alias"` and `"url"`.

- `"alias"` - **required** - a list of words that can be called for this command.
- `"url"` - **required** - the url that command will open.
- `"searchURL"` - *optional* - allows this to be used as an search engine in `set` command.
- `"args"` - *optional* - if you want to allow arguments for your command, i.e. `google translate`.
    - `"url"` - *optional* - if any of your args fail to pass, the arg will be appended at end of this url.
    - `"items"` - *required for `"args"`* - must be included if you want args.
        - `"arg"` - *required for `"items"`* - an argument you want to accept.
        - `"arg"` - *required for `"items"`* - an url you want to use when argument pass.

Here is an example that uses all items:

```json
{
    "alias": ["reddit"],
    "url": "www.reddit.com",
    "searchURL": "https://www.reddit.com/search?q=",
    "args":
    {
        "url": "https://www.reddit.com/r/",
        "items":
        [
            { "arg" : "all", "url": "https://www.reddit.com/r/all" },
            { "arg" : "sp", "url": "https://www.reddit.com/r/startpages" }
        ]
    }
}
```
- `reddit` - opens www.reddit.com
- `reddit sp` - opens https://www.reddit.com/r/startpages
- `reddit badarg` - opens https://www.reddit.com/r/badarg (`https://www.reddit.com/r/` + `badarg`)
- `reddit not a valid arg` - attempts to search `not a valid arg` in reddit using `searchURL`

Another example with simple command:

```json
{
    "alias": ["google"],
    "url": "www.google.com"
}
```
- `google` - opens www.google.com

I highly recommend updating commands.txt to reflect new commands you added.

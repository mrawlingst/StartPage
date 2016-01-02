# Custom Commands

This is a guide to creating your own custom commands for the command line.

Go to `data.json` and within brackets of `"links":`

```json
[
    {
        "id": "", // DO NOT TOUCH OR CHANGE THIS VALUE AT ALL
        "alias": "",
        "items":
        [
            {
                "item": "",
                "url": ""
            }
        ]
    },
]
```

You can add new links inside `"items"`.

- `"id"` - **DO NOT TOUCH OR CHANGE THIS VALUE AT ALL.**
- `"alias"` - **required** - the title you want to display for the box.
- `"items"` - **required**
    - `"item"` - **required** - the text you want to display.
    - `"url"` - **required** - the url to go to when clicked.

Here is an example:

```json
[
    {
        "id": "", // DO NOT TOUCH OR CHANGE THIS VALUE AT ALL
        "alias": "Entertainment",
        "items":
        [
            {
                "item": "Reddit",
                "url": "www.reddit.com"
            },
            {
                "item": "/r/all",
                "url": "www.reddit.com/r/all"
            }
        ]
    },
]
```
Two links will show up in a box titled Entertainment.

As you may notice, `"id"` cannot be modified at all otherwise it will break the page.
Its purpose is to put all links in its proper location.
- *box1* - box to the left of the clock box.
- *box2* - box to the right of the clock box.
- *box3* - bottom-left box.
- *box4* - bottom-right box.

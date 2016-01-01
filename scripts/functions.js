// Generic url pattern
var urlPattern = new RegExp("^(https?://)?[^ ]+[.][^ ]+([.][^ ]+)*(/[^ ]+)?$");

// Current search engine
var searchEngine;

// Function to run on load
function defaultfunc() {
    // Load saved style from local storage
    var loadedStyle = localStorage.getItem("style");
    if (loadedStyle == null) {
        localStorage.setItem("style", document.getElementById('styleSource').value);
    }
    changeStyle(localStorage.getItem("style"));
    
    // Load saved search engine
    searchEngine = localStorage.getItem("searchengine");
    if (searchEngine == null) {
        // Set default engine
        localStorage.setItem("searchengine", "https://www.duckduckgo.com/");
        searchEngine = localStorage.getItem("searchengine");
    }
    
    // Grab focus and clear search box
    document.getElementById("search box").value = "";
    document.getElementById("search box").focus();
}

// Change style on dropdown list select
function dropdownStyleSelect() {
    if (document.getElementById('styleSource').value != "styles") {
        changeStyle(document.getElementById('styleSource').value);
    }
}

// Change style
function changeStyle(x) {
    // Get the old style
    var oldstyle = document.getElementsByTagName("link").item(0);
    
    // Create new style node
    var newstyle = document.createElement("link");
    newstyle.setAttribute("rel", "stylesheet");
    newstyle.setAttribute("type", "text/css");
    newstyle.setAttribute("href", x);
    
    // Replace old style with new style
    document.getElementsByTagName("head").item(0).replaceChild(newstyle, oldstyle);
    // Save new style to local storage
    localStorage.setItem("style", x);
}

// Search with value in the box
function search() {
    document.location.href = searchEngine + encodeURIComponent(document.getElementById("search box").value);
}

// Navigate to somewhere
function nav(address) {
    if (new RegExp("^(?:(?:https?|ftp):\/\/).*").test(address)) {
        document.location.href = address;
    }
    else {
        document.location.href = "http://" + address;
    }
}

// Handle key 'enter' press in search box
function searchKeyPress(e) {
    e = e || window.event;
    if (e.keyCode == 13) {
        parseCommand(document.getElementById("search box").value);
    }
}

// Save engine and clear text box
function saveAndClear(engine) {
    searchEngine = engine;
    localStorage.setItem("searchengine", searchEngine);
    document.getElementById("search box").value = "";
}

// Parse commands
function parseCommand(com) {
    // Readme command
    if (new RegExp("^readme").test(com)) {
		document.location.href = "https://github.com/mrawlingst/StartPage/blob/master/README.md";
	}
    // Help command
    else if (new RegExp("^help$").test(com) || new RegExp("^commands$").test(com) || new RegExp("^\\?$").test(com)) {
		document.location.href = "commands.txt";
	}
    // Reddit command
    else if (com.startsWith("reddit") == true) {
        if (new RegExp("^reddit [A-Za-z]{1,10}$").test(com)) {
            var subargs = com.split(" ");
            var arg = subargs.pop();
            switch (arg) {
                case "gd":
                    nav("https://www.reddit.com/r/gamedev");
                    break;
                case "sp":
                    nav("https://www.reddit.com/r/startpages");
                    break;
                case "prog":
                    nav("https://www.reddit.com/r/programming");
                    break;
                default:
                    nav("https://www.reddit.com/r/" + arg);
                    break;
            }
        }
        else if (new RegExp("^reddit -r .*$").test(com)) {
            var sargs = com.split(" ");
            nav("https://www.reddit.com/r/" + sargs.pop());
        }
        else if (new RegExp("^reddit$").test(com)) {
            nav("https://www.reddit.com/");
        }
        else if (urlPattern.test(com)) {
            nav(com);
        }
        else {
            search();
        }
    }
    // Wowhead command
    else if (com.startsWith("wowhead") == true || com.startsWith("wh") == true || com.startsWith("wow") == true) {
        if (new RegExp("^(wowhead|wh|wow) [A-Za-z0-9 ]{1,100}$").test(com)) {
            nav("http://www.wowhead.com/search?q=" + com.split(' ').slice(1).join(' '));
        }
        else if (new RegExp("^(wowhead|wh|wow)$").test(com)) {
            nav("http://www.wowhead.com/");
        }
        else {
            search();
        }
    }
    // Set search engine command
    else if (com.startsWith("set") == true) {
        if (new RegExp("^set [A-Za-z]{1,10}$").test(com)) {
            switch (com.split(" ").pop()) {
                // Google
                case "g":
                case "google":
                    saveAndClear("https://www.google.com/?gws_rd=ssl#q=");
                    break;
                
                // DuckDuckGo
                case "d":
                case "ddg":
                case "duckduckgo":
                    saveAndClear("https://www.duckduckgo.com/");
                    break;
                
                // Bing
                case "b":
                case "bing":
                    saveAndClear("https://www.bing.com/search?q=");
                    break;
                    
                // Reddit
                case "r":
                case "reddit":
                    saveAndClear("https://www.reddit.com/search?q=");
                    break;
                
                // Github
                case "g":
                case "gh":
                case "github":
                    saveAndClear("https://github.com/search?utf8=%E2%9C%93&q=");
                    break;
                
                // Wowhead
                case "wow":
                case "wh":
                case "wowhead":
                    saveAndClear("http://www.wowhead.com/search?q=");
                    break;
                    
                // ADD NEW SEARCH ENGINES HERE
                
                // DO NOT TOUCH BELOW                    
                default:
                    break;
            }
        }
    }
    // Miscalleous commands
    else if (new RegExp("^inbox$").test(com)) {
        nav("https://mail.google.com");
    }
    else if (new RegExp("^rit inbox$").test(com)) {
        nav("https://mail.google.com/mail/u/1/");
    }
    else if (new RegExp("^(twitch|ttv)$").test(com)) {
        nav("http://www.twitch.tv/directory/all");
    }
    else if (new RegExp("^(twitch|ttv) [^ ]+$").test(com)) {
		nav("http://www.twitch.tv/" + com.split(" ").pop());
	}
    else if (new RegExp("^git(hub)?$").test(com)) {
        nav("https://www.github.com");
    }
    else if (new RegExp("^netflix$").test(com) || new RegExp("^nf$").test(com)) {
        nav("https://www.netflix.com/");
    }
    else if (new RegExp("^trello$").test(com)) {
        nav("https://trello.com/");
    }
    else if (new RegExp("^facebook$").test(com) || new RegExp("^fb$").test(com)) {
        nav("https://www.facebook.com/");
    }
    // ADD NEW CUSTOM COMMANDS HERE
    
    // DO NOT CHANGE ANYTHING BELOW THIS
    else if (urlPattern.test(com)) {
        nav(com);
    }
    else {
        search();
    }
}

// Getting time
function getSomeTime() {
  var date = new Date();
  var hour = date.getHours().toString();
  var minutes = date.getMinutes().toString()
  var seconds = date.getSeconds().toString();
  var utc2;

  if (date.getMinutes() < 10) {
    minutes = "0" + minutes;
  }

  if (date.getSeconds() < 10) {
    seconds = "0" + seconds;
  }

  if(date.getHours() >= 12){
    if(date.getHours() > 12){
      hour = date.getHours() - 12;
      hour = hour.toString();
    }
    utc2 = " PM";
  }
  else if(date.getHours() == 0){
      hour = 12;
      hour = hour.toString();
      utc2 = " AM"
    }
  else {
    utc2 = " AM"
  }

  document.getElementById('clock').innerHTML = hour + ":" + minutes + ":" + seconds + utc2;
}

function getSomeDate() {
    var date2 = new Date();
    var weekday = new Array(7);
      weekday[0]=  "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
    var day = weekday[date2.getDay()];
      day = day.toString();
    var month = new Array(12);
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
    var monthText = month[date2.getMonth()];
      monthText = monthText.toString();
    var monthNum = date2.getDate().toString();
    var year = date2.getFullYear().toString();

  document.getElementById('date1').innerHTML = day + ", " + monthText + " " + monthNum + ", " + year;
}

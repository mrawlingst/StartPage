// Generic url pattern
var urlPattern = new RegExp("^(https?://)?[^ ]+[.][^ ]+([.][^ ]+)*(/[^ ]+)?$");

// Current search engine
var searchEngine;

// JSON data
var jsonData;

// Function to run on load
function defaultfunc() {
    loadData();
    
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

function loadData() {
    // Load json file
    $.ajax({
       url: 'json/data.json',
       dataType: "json",
       beforeSend : function(x) {
           if (x && x.overrideMimeType) {
               x.overrideMimeType("application/json;charset=UTF-8");
           }
       },
       success: function(data) {
           jsonData = data;
       }
    });
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
    // Some hardcoded commands for general purpose
    // Readme command
    if (new RegExp("^readme$").test(com)) {
        document.location.href = "https://github.com/mrawlingst/StartPage/blob/master/README.md";
        return;
    }
    // Help command
    else if (new RegExp("^(help|commands|cmd|\\?)$").test(com)) {
        document.location.href = "commands.txt";
        return;
    }
    // Reload the json file, updating commands
    else if (new RegExp("^reload$").test(com)) {
        loadData();
        document.getElementById("search box").value = "";
        return;
    }
    // Set search engine command
    else if (com.startsWith("set") == true) {
        for (c = 0; c < jsonData.commands.length; c++) {
            var a;
            for (a = 0; a < jsonData.commands[c].alias.length; a++) {
                if (jsonData.commands[c].searchURL) {
                    if (new RegExp("^set "+jsonData.commands[c].alias[a]+"$").test(com)) {
                        saveAndClear(jsonData.commands[c].searchURL);
                        return;
                    }
                }
            }
        }
    }
    
    var c;
    // Commands
    for (c = 0; c < jsonData.commands.length; c++) {
        var a;
        for (a = 0; a < jsonData.commands[c].alias.length; a++) {
            if (jsonData.commands[c].args && new RegExp("^"+ jsonData.commands[c].alias[a]+" [A-Za-z]{1,10}$").test(com)) {
                if (jsonData.commands[c].args.url) {
                    if (jsonData.commands[c].args.items) {
                        var i;
                        for (i = 0; i < jsonData.commands[c].args.items.length; i++) {
                            if (jsonData.commands[c].args.items[i].arg == com.split(" ").pop()) {
                                nav(jsonData.commands[c].args.items[i].url);
                                return;
                            }
                        }
                    }
                    
                    nav(jsonData.commands[c].args.url + com.split(' ').pop());
                    return;
                }
            }
            else if (jsonData.commands[c].searchURL && new RegExp("^"+ jsonData.commands[c].alias[a]+" .*$").test(com)) {
                nav(jsonData.commands[c].searchURL + com.split(' ').slice(1).join(' '));
                return;
            }
            else if (new RegExp("^"+jsonData.commands[c].alias[a]+"$").test(com)) {
                nav(jsonData.commands[c].url);
                return;
            }
        }
    }
    
    if (urlPattern.test(com)) {
        nav(com);
        return;
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

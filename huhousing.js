var page = new WebPage(), testindex = 0, loadInProgress = false;

page.onConsoleMessage = function(msg) {
  console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};

page.onLoadFinished = function() {
  loadInProgress = false;
  console.log("load finished");
};

var steps = [
  function() {
    //Load Login Page
    page.open("https://harvardlive.secureportaln.net/Pages/PortalStuLogin.aspx?ExternalLogintype=2&IsApplication=-1&pagegroup=ResOnlineLeasing&page=LOGIN&");
  },
  function() {
    //Login
    page.evaluate(function() {
      console.log("logging in!")
      var username = document.getElementById("sUsername");
      username.value = "LOGIN_INFO_HERE";
      var password = document.getElementById("sPassword");
      password.value = "PASSWORD_HERE";
      var btn = document.getElementById("btnLogin");
      btn.click();
    });
  },
  function() {
    //Now access the self service frame
    page.open("https://harvardlive.secureportaln.net/Pages/PortalStuProspectSelfServiceBegin.aspx?pagegroup=CurrentProspects&page=SHSELFSERVICE&");
  }, 
  function() {
    //Now agree to the terms and stuff....
    page.evaluate(function() {
      document.getElementById("chkboxInstructions").click();
      document.getElementById("CurrentlyAvailable").click();
    });
  }, 
  function() {
    // Output content of page to stdout after form has been submitted
    var content = page.evaluate(function() {
      var content = document.querySelectorAll('html')[0].outerHTML;
      if(content.indexOf("OWA") > 0) {
        return content;
      }
      else if(content.indexOf("Western") > 0) {
        return content;
      }
      else if(content.indexOf("western") > 0) {
        return content;
      }
      else if(content.indexOf("SFP") > 0) {
        return content;
      }
      else if(content.indexOf("Soldier") > 0) {
        return content;
      }
      else if(content.indexOf("soldier") > 0) {
        return content;
      }
      else if(content.indexOf("owa") > 0) {
        return content;
      }
      else if(content.indexOf("sfp") > 0) {
        return content;
      }
      else if(content.indexOf("No Available Units Found") > 0) {
        return undefined;
      } else {
        return undefined;
      }
    });
    if(content) {
      console.log(content);
      console.log(new Date() + ": units found!");
    } else {
      console.log(new Date() + ": no units found");
    }
  },
  function() {
    //Step necessary to ensure last message succeeded
  }
];

console.log(new Date() + ": Starting to check");
interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log(new Date() + ": Finished check");
    phantom.exit();
  }
}, 50);

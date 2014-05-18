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
    var found = page.evaluate(function() {
      var contents = document.querySelectorAll('html')[0].outerHTML;
      if(contents.indexOf("No Available Units Found") > 0) {
        return true;
      } else {
        return true;
      }
    });
    if(found) {
      // Notify, do something
    }
    console.log(found);
  },
  function() {
    //Step necessary to ensure last message succeeded
  }
];


interval = setInterval(function() {
  if (!loadInProgress && typeof steps[testindex] == "function") {
    console.log("step " + (testindex + 1));
    steps[testindex]();
    testindex++;
  }
  if (typeof steps[testindex] != "function") {
    console.log("test complete!");
    phantom.exit();
  }
}, 50);

Harvard University Housing
=========

Simple script to check and notify you if there's an interesting housing option available

This is quick, dirty, full of bugs, can really be improved upon and I don't know what Harvard University Housing's policy regarding the use of bots is.

I'm just having fun.

Enjoy! Any patches are very very welcomed!

## Requirements
1. [PhantomJS](http://phantomjs.org)
2. Patience
3. Twilio Account (required only for SMS notification)

### Mac Installation Instructions
1. Install [Homebrew](http://brew.sh/)
```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```
2. Install PhantomJs
```
brew update && brew install phantomjs
```

### SMS Notifications
1. Get an [Twlio](http://twilio.com) account
2. Add your twilio credentials to huhousing.js
...Modify twilio_sid, twilio_token, and twilio_number as necessary

## Running
You can execute the script by itself, or run it as a cron job. I chose the latter
### Cron Job on Mac
Access your local cron:
```
crontab -e
```

```cron
* * * * * /usr/local/bin/phantomjs /full/path/to/huhousing.js
```

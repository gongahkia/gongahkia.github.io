---
category: Tech
---
# Curl

# `Curl`

Standard command line tool for transferring data with URLs.

## Installation

```
$ sudo apt-get install curl 
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # curl supports the following protocols for interacting with web services, downloading files and handling network requests from the command line
        # HTTP, HTTPS
        # FTP, FTPS
        # SFTP
        # TFTP
        # SCP
        # LDAP, LDAPS
        # DICT
        # TELNET
        # IMAP, IMAPS
        # POP, POP3S
        # SMTP, SMTPS
        # RTSP, RTMP, RTMPS, RTMPT, RTMPTE
        # GOPHER
        # SMB, SMBS
        # MQTT

# ----- COMMANDS -----
    # curl => fetches the contents of the specified URL and displays it to the stdout
        # if unspecified, curl issues a HTTP GET request by default
        # curl commands can be further augmented with flags 

curl http://example.com

# ----- FLAGS -----
    # -o => saves the requested output from the specified url to a file
    # -L => specifies the curl request to follow any redirects
    # -X => specifies the request method as a provided argument (GET, POST, PUT, DELETE, etc.)
        # GET => get is selected by default
        # POST => post requests can be explicitly selected
    # -H => selects a request header to specify the curl request's metadata (content type, authorization status, or other custom data etc.)
        # JSON => accompanies a request header to specify the content type being posted as JSON
    # -d => accompanies a POST request to send data within the request body
    # -O => save the file under the original name
    # -b => reads cookies from a file
    # -c => saves cookies to a file
    # -v => makes curl requests verbose, providing detailed information about the given request and its response
    # -I => fetches only the response headers
    # -u => allows for specification of a user and password for server authentication
    # -T => uploads a file to the server
    # --limit-rate => limits the transfer rate of a given curl request

curl -o output.html http://example.com
curl -L http://example.com
curl -X POST -d "param1=value1&param2=value2" http://example.com
curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1","key2":"value2"}' http://example.com
curl -H "Authorization: Bearer your_token" http://example.com
curl -O http://example.com/file.zip
curl -b cookies.txt -c new_cookies.txt http://example.com
curl -v http://example.com
```

## More on

* [curl documentation](https://curl.se/docs/tutorial.html)
* [curl cheatsheet](https://github.com/eooploo/curl-cheat-sheet)
* [learn httpie in y minutes](https://learnxinyminutes.com/docs/httpie/)
* [wget documentation](https://www.gnu.org/software/wget/manual/wget.html)

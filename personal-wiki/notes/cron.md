---
category: Tech
---
# Cron

# `Cron`

Standard UNIX tool for scheduling jobs at periodic intervals.

## Installation

```
# ----- INSTALLATION -----
    # cron should come installed by default on most unix and linux systems

$ sudo apt-get install cron
```

## Usage

```
# ----- QUICKSTART -----
    # cron job => comprised of cron commands, and cron jobs are written in a file similar to a Makefile
    # cron tab => list of cron jobs, stored on the local system
    # each system user has their own cron tab

$ crontab -l # list all available cron jobs
$ crontab -e # edit a cron tab under your current user
$ sudo crontab -u root -e # -u flag specifies the current user to edit cron tabs under, here we default to sudo since editing other user's cron tabs requires sudo priviledges
```

## Syntax

```
# ----- SYNTAX -----
    # schedules in cron jobs act as parameters and conditional checks which specify when and how often a given job should repeat 
    # {Minute} {Hour} {Date of Month} {Month} {Day of Week} {Command}
        # Minute => any valid integer from 1 to 59
        # Hour => any valid integer from 0 to 23 since Cron runs on military 24hr time
        # Date of Month => any valid integer from 1 to 31
        # Month => any valid integer from 1 to 12
        # Day of Week => any valid integer from 0 to 7 (sunday is 0 and 7)
        # , => multiple cron job time specifiers are comma-delimited
        # * => means all of the possible enumerations of a given parameter
        # Command => any valid linux command will do 
        # note that ANY unfilled time field is to be represented with an *

5 * * * * echo "hello world" # runs the echo "hello world" command every single hour of every day of every month any day of the week when the minute field of the time is 5, so 1:05pm, 2.05pm etc
5 9 * * * echo "smex" # runs the echo "smex" command every day at 9.05am
0 4,16 * * * echo "nice" # runs the echo "nice" command every day at 4am and 4pm
0 9 15 8 * echo "happy 15th august 9.15am" # runs once yearly, echoing happy 15th august 9.15am"
* 11 * * 4 echo "thursday 11am" # echoes "thursday 11am" every week on thursday 11am

# ----- SPECIAL COMMANDS -----
    # @hourly => runs the specified command on an hourly basis
    # @daily => runs the specified command on a daily basis
    # @weekly => runs the specified command on a weekly basis
    # @reboot => runs the specified cron job EVERYTIME the server reboots

@reboot echo "welcome back" # runs whenever the server reboots
```

## More on

* [cron expressions](https://medium.com/@tushar0618/cron-expression-tutorial-721d85e4c2a7)
* [cron jobs in 5 minutes](https://youtu.be/-gs2cBUToOw?si=MG0psLklXl2K6ub-)

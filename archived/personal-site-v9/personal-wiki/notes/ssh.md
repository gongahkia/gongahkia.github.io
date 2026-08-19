---
category: Tech
---
# SSH

# `SSH`

Secure Shell (SSH) is a standard UNIX tool that allows for secure connection to remote servers.

## Installation

```
$ sudo apt-get install openssh-client
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # SSH enables encrypted communication sessions, ensuring confidentiality and data integrity
    # Mostly used for remote logins, command execution on remote servers and file transfer

# ----- COMMANDS -----
    # ssh => connects to the remote server under the specified username and hostname (or IP address), seperated by @ ampersand character
        # ssh commands can be further augmented with flags
    # '' => runs the specified command between the '' single quotes on the remote server
    # ssh-keygen => generates, manages and converts ssh keys
    # ssh-copy-id => copies ssh public key to the remote server's authorized_keys file, enabling future passwordless ssh logins to that remote server
    # ssh-add => adds a key to the ssh agent
    # ssh-agent => store private keys used for public key authentication
    # scp => securely copies files between local machine and remote system
    # sftp => securely transfers files over an encrypted ssh session

ssh username@hostname
ssh gongahkia@192.168.1.2

ssh username@hostname 'ls -l'
ssh username@hostname 'mdkir watermelon && touch watermelon.yaml && mv watermelon.yaml watermelon'
ssh-add /path/to/private_key

scp /path/to/local_file username@hostname:/path/to/remote_directory
sftp username@hostname

# ----- FLAGS -----
    # -p => specifies a non-default SSH port that the user wants to connect to
    # -i => designates a specific identity file and its corresponding private key for authentication
    # -t => specifies the type of key to be created during key generation
    # -b => specifies number of bits in the key
    # -l => lists all keys loaded within the ssh agent
    # -C => adds a comment to the key used to identify the key and its owner (often an email address is used as identification)
    # -L local_port:remote_host:remote_port => forwards a local port to a remote server
    # -R remote_port:local_host:local_port => forwards a remote port to a local machine

ssh -p 2222 username@hostname
ssh -i /path/to/private_key username@hostname

ssh-keygen -t rsa -b 2048 -C "your_email@example.com"
ssh-copy-id username@hostname

ssh -L local_port:remote_host:remote_port username@hostname
ssh -R remote_port:local_host:local_port username@hostname

ssh-add -l
```

### SSH config file

SSH settings are found in the `~/.ssh/config` filepath.

```
---------- SSH CONFIG FILE ----------
  -- hosts can be added to the SSH config file to allow for more convenient connection

Host example
    HostName example.com
    User username
    Port 2222
    IdentityFile ~/.ssh/id_rsa
```

To connect to the remote server `example.com`, we enter

```
ssh example
```

## More on

* [openSSH documentation](https://www.openssh.com/manual.html)
* [SSH for dummies](https://schh.medium.com/ssh-for-dummies-ea168e6ff547)
* [excruciatingly detailed but useful SSH cheatsheet](https://grahamhelton.com/blog/ssh-cheatsheet/)
* [condensed SSH cheatsheet](https://quickref.me/ssh.html)
* [learn SSH in 6 minutes](https://youtu.be/v45p_kJV9i4?si=mu113TK-LQ1bKT_u)

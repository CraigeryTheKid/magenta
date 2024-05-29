---
layout: ../../layouts/MDLayout.astro

title: 06 Remote Desktop
prev: /posts/post-05
next: /posts/post-07
---


**Remote Desktop** allows connecting to other computers, like a server, from another.<br>
Media servers are great candidates for this.<br>
Simpler servers, like Pi-hole and picframe, will use the more basic SSH terminal.

***AGAIN, this is ONLY if using Debian on the server!***<br>

## SERVER SIDE - Remote Desktop

Pop!_OS has this installed already, but needs a little config<br>

- Enable sharing
- Allow access
- Set password
- Disable lockscreen

<br>

## CLIENT SIDE - Local computer

When just looking for remote desktop connection, the local side is quick.

Install remmina
```sh
sudo apt install remmina
```
Remmina Settings:
* server = IP address of remote server
* user / password = of the remote server, for auto-login

<br>

### That's it! But there's more to it on BOTH sides if we need to wake up the server from sleep!!
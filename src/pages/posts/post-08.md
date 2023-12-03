---
layout: ../../layouts/MDLayout.astro

title: 08 Gigabyte B550 sleep issue (rare)
prev: post-07
next: post-09
---


**Remote Desktop** allows connecting to other computers, like a server, from another.<br>
Media servers are great candidates for this.<br>
Simpler servers, like Pi-hole and picframe, will use the more basic SSH terminal.<br><br>

## SERVER SIDE - Remote Desktop

Since the servers will use Debian, we need to install packages.<br>
GNOME desktops may have some/most already, but they aren't as optimized for server life.<br>
Install the XFCE desktop environment:
```sh
sudo apt install -y xfce4 xfce4-goodies	
```

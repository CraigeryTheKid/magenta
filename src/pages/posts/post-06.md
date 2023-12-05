---
layout: ../../layouts/MDLayout.astro

title: 06 Remote Desktop
prev: /posts/post-05
next: /posts/post-07
---


**Remote Desktop** allows connecting to other computers, like a server, from another.<br>
Media servers are great candidates for this.<br>
Simpler servers, like Pi-hole and picframe, will use the more basic SSH terminal.<br><br>

## SERVER SIDE - Remote Desktop

Since the servers will use Debian, we need to install some packages.<br>
GNOME desktops may have some/most already, but they aren't as optimized for server life.<br>
Install the XFCE desktop environment:
```sh
sudo apt install -y xfce4 xfce4-goodies	
```
Install 'xrdp' which is the remote desktop program itself:
```sh
sudo apt install xrdp -y
```
Check to make sure xrdp is enabled & running:
```sh
sudo systemctl status xrdp
```
**Further testing needed, but maybe only one of these is needed?**
1. Add ssl-cert for xrdp (try just this one first)
```sh
sudo adduser xrdp ssl-cert 
```
2. Add session instruction to a file (if desktop won't load)
```sh
echo "xfce4-session" | tee .xsession
```
After one (or both), restart xrdp:
```sh
sudo systemctl restart xrdp
```
Some guides call out other packages you need, but they might be included in dependencies?
```sh
sudo apt install xorg dbus-x11 x11-xserver-utils xorgxrdp
```
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
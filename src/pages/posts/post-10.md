---
layout: ../../layouts/MDLayout.astro

title: 10 Firewall Settings
prev: post-09
next: post-11
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
sudo apt install ufw
sudo nano /etc/default/ufw	#only if you need to have IPv6
	IPV6=yes	 	#only if you need to have IPv6

sudo ufw allow ssh		#very important to do before enabling!!!
sudo ufw allow 22		#very important, maybe redundant to 'ssh'

sudo ufw default deny incoming
sudo ufw default allow outgoing

sudo ufw enable
sudo ufw status verbose		#just checks that its working

#also server settings
sudo ufw allow 'samba'
sudo ufw allow from 192.168.88.0/24 to any port 3389	#for remote desktop

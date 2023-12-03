---
layout: ../../layouts/MDLayout.astro

title: 09 Auto-updates and Cloud Backups
prev: post-08
next: post-10
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
sudo apt install needrestart
sudo nano /etc/needrestart/needrestart.conf
	#change to automatic
	
sudo apt install unattended-upgrades
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
	#uncomment/change settings as desired
	#remove "unused" in 3 places
sudo nano /etc/apt/apt.conf.d/20auto-upgrades
	#both lines should be a "1"
sudo dpkg-reconfigure -plow unattended-upgrades
sudo systemctl restart unattended-upgrades.service
sudo systemctl status unattended-upgrades.service
	#checks that its running and enabled
sudo nano /var/log/unattended-upgrades/unattended-upgrades.log
sudo nano /var/log/unattended-upgrades/unattended-upgrades-dpkg.log  #this is empty when i checked??


sudo -v ; curl https://rclone.org/install.sh | sudo bash
rclone selfupdate
rclone config
	#!/usr/bin/bash
	rclone sync /home/daddio/.zBonoBack proton:zBonoProton
	-P --retries 2 --fast-list --skip-links --checkers=6 --transfers=6 --drive-chunk-size 512M --size-only
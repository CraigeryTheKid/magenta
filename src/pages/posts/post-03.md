---
layout: ../../layouts/MDLayout.astro

title: 03 First Boot & Basic Settings
prev: /posts/post-02
next: /posts/post-04
---


## First Commands!

**"sudo"**, which means "super user do", will prompt for the admin password since it's an elevated command, like changing a system file. Meant to prevent other users from breaking things.

This will update the repositories, but doesn't download or install anything!
```sh
sudo apt update
```

This will install (upgrade) all packages that have available updates.
```sh
sudo apt upgrade
```

You can combine commands! The `-y` automatically answers "yes" to the prompt.
```sh
sudo apt update && sudo apt upgrade -y
```
<br>

## What about removing / cleaning? ~~~~~~~~~~~~~~~~~
For removing specific packages, I recommend Synaptic Application Manager, to make searching apps easier.
```sh
sudo apt install synaptic
```
For cleaning up old installs and leftover pieces, this combo command takes care of it:
```sh
sudo apt autoclean && sudo apt autoremove
```
<br>


## I enjoy making scripts, like this updater & cleaner: ~~~~~~~
1. Make file
```sh
sudo nano /usr/local/bin/bondate
```
2. copy this into empty file:
```sh
#!/bin/bash

sudo apt update && sudo apt upgrade -y ; \
sudo apt --purge autoremove -y ; \
sudo apt autoclean -y ; \
sudo apt clean ; \
flatpak update ; \
sudo needrestart ; \
echo Also, ; \
echo Consider: sudo rclone selfupdate ; \
echo Consider: sudo winetricks --self-update
```
3. save file; then make executable:
```sh
sudo chmod +x /usr/local/bin/bondate
```
4. and now entering 'bondate' in any terminal runs all the updates!
    - also runs 'cleaners' that remove obsolete files
    - also updates flatpak
    - 'need restart' tells you if you should reboot - this is installed later in guide!
    - comments to remind me to occasionally update other 3rd party apps

<br>

## Random audio cracking issues: ~~~~~~~~~~~~~~~~~~~

One of the things that can make you want to go back to Windows.<br>
This config location is specific to current Pop_OS version:
```sh
sudo nano /usr/share/wireplumber/main.lua.d/50-alsa-config.lua
```
- ["api.alsa.period-size"] = 128,
- ["api.alsa.headroom"] = 1024,
```sh
systemctl restart --user pipewire.service
```
Go  here for more detailed reasonings, or for other distros:
[Audio Troubleshooting](https://forum.manjaro.org/t/howto-troubleshoot-crackling-in-pipewire/82442) <br>
This issue is NOT unique or specific to Pop!_OS

<br>

## Remove repository: ~~~~~~~~~~~~~~~~~~~

There's several ways, but just deleting a file seems easy:
```sh
ls -l /etc/apt/sources.list.d/
```
then, if there's something to remove:<br>
To type file name, type a few letters until unique, and hit [tab]
```sh
sudo rm [filename]
```
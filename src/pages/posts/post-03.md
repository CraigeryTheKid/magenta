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
For cleaning up old installs and leftover pieces, this combo command takes care of it:
```sh
sudo apt autoclean && sudo apt autoremove
```

For removing specific packages, use Synaptic Application Manager, to make searching easier.
```sh
sudo apt install synaptic
```

<br>


## NEEDRESTART
needrestart is a neat little tool that automatically reloads running packages after an update.<br>

1. install package
```sh
sudo apt install needrestart
```
2. open config file for settings:
```sh
sudo nano /etc/needrestart/needrestart.conf
```
3. Delete "#" to enable, and change "i" to "a" in this line to make automatic:<br>
_$nrconf{restart} = 'a';_

<br>

## I enjoy making scripts, like this updater & cleaner: ~~~~~~~
1. Make new file
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
echo also: ; \
echo Consider: sudo rclone selfupdate ; \
echo Consider: sudo winetricks --self-update
```
3. save file; then make executable:
```sh
sudo chmod +x /usr/local/bin/bondate
```
4. and now entering 'bondate' in any terminal runs all the updates and cleaners!


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
---
layout: ../../layouts/MDLayout.astro

title: 04 Install Gaming Packages!
prev: ../post-03
next: ../post-05
---


Thanks to **STEAM & WINE** gaming in Linux is getting quite easy.<br>
These again could be installed "normal" with the Store, but I like command lines.

## Install WINE (WINE Is Not an Emulator)

enables 32-bit on system:
```sh
sudo dpkg --add-architecture i386
```
Makes folder for keys, if not existing (can do either way):
```sh
sudo mkdir -pm755 /etc/apt/keyrings
```
Adds the key:
```sh
sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
```
Next, need to add the repo MAKE SURE YOU GET CORRECT VERSION FOR YOUR OS!<br>
[WINE HQ Download Page](https://wiki.winehq.org/Download) <br>

1. For Ubuntu 22.04 (jammy) which is base of Pop!_OS 22.04:
```sh
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/jammy/winehq-jammy.sources
```
2. For Debian 12 (bookworm) for server install:
```sh
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/debian/dists/bookworm/winehq-bookworm.sources
```
Now update & install WINE!
```sh
sudo apt update && sudo apt install --install-recommends winehq-stable
```
Check version:
```sh
wine --version
```
Run wine command prompt (below) and then type " echo %temp% " to make sure temp folder exists.
```sh
wine cmd
```
Finally, change mode to Windows10 below: (Windows XP for debian server)
```sh
winecfg
```
<br>


## Install Lutris (Linux game launcher & WINE assistant)
Lutris can install games for you, using their database!<br>
Or, you can point it to manually installed games, and it will add to launcher.

Add PPA source of repo:
```sh
sudo add-apt-repository ppa:lutris-team/lutris
```
Run update & install Lutris!:
```sh
sudo apt update && sudo apt install lutris
```
<br>


## Install WINETRICKS
Useful additional setup tool for WINE; can add missing dependencies.
```sh
sudo apt install winetricks
```
```sh
sudo winetricks --self-update
```
Check version:
```sh
winetricks --version
```
<br>


## Additional tips & Tricks
Depending on video card, of course make sure drivers are installed!!<br><br>
Add vulkan and other drivers that games need:
```sh
sudo add-apt-repository ppa:graphics-drivers/ppa && 
sudo apt update && sudo apt install -y libvulkan1 libvulkan1:i386
```
Add 10 second delay for "not responding" interlock (needed randomly in GNOME):
```sh
gsettings set org.gnome.mutter check-alive-timeout 10000
```
Remove unwanted shortcuts that WINE adds to Launcher:
```sh
rm -f ~/.config/menus/applications-merged/wine* && rm -rf ~/.local/share/applications/wine
```
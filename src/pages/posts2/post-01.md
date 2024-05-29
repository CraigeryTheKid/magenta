---
layout: ../../layouts/MDLayout2.astro

title: 1 - Initial Debian Setup
prev: /posts2/post-06
next: /posts2/post-02
---


## Initial config and install of headless Debian server

The idea here was to setup a 24/7 headless (no local monitor or mouse/kb) server, to run at least the Frigate NVR system and a simple home NAS. Other functions could be added, but one goal is to also be as lightweight as possible to prevent issues with the cameras & NAS.

<br>

Prepare installation media
-  Download the small installation image from the [Debian website](https://www.debian.org/distrib/netinst)
-  Flash the ISO to a USB device (balena Etcher, popsicle)
-  Boot your device from USB

Install and setup Debian for remote access (the only part needing monitor & keyboard)
-  Uncheck "Debian desktop environment" and "GNOME"
-  Check "SSH server"
-  Check "standard system utilities"

After reboot, add your username to sudoers:
- login as **ROOT**
```sh
apt update && apt install -y sudo
```
```sh
usermod -aG sudo jedi
```
- Finalize by running [reboot]

<br>

### Finish setup via SSH
- Connect via SSH and login with your non-root user created during install
- Setup passwordless sudo so you don't have to type your password for each sudo command
```sh
echo 'jedi    ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/user
```
- Ensure everything is up to date by running
```sh
sudo apt update && sudo apt upgrade -y
```
- Install unattended upgrades
```sh
sudo apt install -y unattended-upgrades
```
```sh
echo unattended-upgrades unattended-upgrades/enable_auto_updates boolean true | sudo debconf-set-selections
```
```sh
sudo dpkg-reconfigure -f noninteractive unattended-upgrades
```
- Install ufw firewall
```sh
sudo apt install -y ufw
```
```sh
sudo ufw allow from 192.168.0.0/16
```
```sh
sudo ufw default deny incoming && sudo ufw default allow outgoing
```
```sh
sudo ufw enable
```

## Now you have a minimal Debian server that requires very little maintenance.
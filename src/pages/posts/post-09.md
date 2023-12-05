---
layout: ../../layouts/MDLayout.astro

title: 09 Auto-updates and Cloud Backups
prev: /posts/post-08
next: /posts/post-10
---


## NEEDRESTART
needrestart is a neat little tool that automatically reloads running packages when an update so requires.<br>
Essentially, an update or change doesn't take effect until a reload.<br>
In the case of **needrestart**, this can be installed/enabled on all devices.<br>

1. install package
```sh
sudo apt install needrestart
```
2. open config file for settings
```sh
sudo nano /etc/needrestart/needrestart.conf
```
3. Delete "#" to enable, and change to automatic, change "i" to "a" in this line:<br>
_$nrconf{restart} = 'a';_

<br>

## UNATTENDED-UPGRADES
This is really the 'auto-update' feature, that I enable on 24/7 servers.<br>
If it's not always running, I just run updates myself when I think about it.<br>
The default settings work, and they only auto-install security updates.

1. Install package
```sh
sudo apt install unattended-upgrades
```
2. Run simple config command
```sh
sudo dpkg-reconfigure -plow unattended-upgrades
```
3. Restart & check status
```sh
sudo systemctl restart unattended-upgrades.service &&
sudo systemctl status unattended-upgrades.service
```
4. Optional check that both values are "1"
```sh
sudo nano /etc/apt/apt.conf.d/20auto-upgrades
```
5. Option to change some values to "enable" for "remove unused" things in 3 places:
```sh
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```
6. Logs if you want to see what be happening.
```sh
sudo nano /var/log/unattended-upgrades/unattended-upgrades.log
```
```sh
sudo nano /var/log/unattended-upgrades/unattended-upgrades-dpkg.log
```
<br>

## RCLONE CLOUD BACKUP
**rclone** is another neat tool, that syncs to existing cloud services without their annoying app!<br>
Meaning you can sync/upload to google drive, onedrive, etc, on your own terms.<br>
I now have Proton Drive, so that's my cloud of choice.

1. Install rclone, with bash to weblink
```sh
sudo -v ; curl https://rclone.org/install.sh | sudo bash
```
2. update rclone (this will need done manually, will not update with "sudo apt update")
```sh
rclone selfupdate
```
3. run config! (follow on screen directions, website can help too)<br>
[rclone website](rclone.org)
```sh
rclone config
```
4. After running config, which sets names, can turn command into a script:<br>
make sure to update "SRC" and "DEST" with your actual folder names
```sh
#!/bin/sh

SRC=/home/username/localfolder
DEST=proton:cloudfolder

rclone --retries 2 \
       --fast-list \
       --skip-links \
       --size-only \
       --checkers 6 \
       --transfers 6 \
       --drive-chunk-size 256M \
       -P \
       sync ${SRC} ${DEST}
```
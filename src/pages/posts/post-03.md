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

## What about removing / cleaning?
For removing specific packages, I recommend Synaptic Application Manager, to make find exact names easier.
```sh
sudo apt install synaptic
```
For cleaning up old installs and leftover pieces, this combo command takes care of it:
```sh
sudo apt autoclean && sudo apt --purge autoremove
```
To clear "cache" folder from /home, items older than 6 months:
```sh
find ~/.cache/ -type f -atime +182 -delete
```
<br>

### Other customized setup:

For Pop!_OS, I like to manually update, so this disables the AppStore without uninstalling it:
```sh
mkdir -p ~/.config/autostart &&
cp /etc/xdg/autostart/io.elementary.appcenter-daemon.desktop ~/.config/autostart/ &&
echo "X-GNOME-Autostart-enabled=false" >> ~/.config/autostart/io.elementary.appcenter-daemon.desktop
```

### I enjoy making unnecessary scripts, like this do-all updater & cleaner:
1. Make file
```sh
sudo nano /usr/local/bin/bondate
```
2. copy this:
```sh
#!/bin/bash

sudo apt update && \
sudo apt upgrade ; \
flatpak update ; \
sudo apt autoclean && \
sudo apt --purge autoremove && \
find ~/.cache/ -type f -atime +182 -delete && \
sudo needrestart
```
3. make executable:
```sh
sudo chmod +x /usr/local/bin/bondate
```
4. and now 'bondate' in any terminal runs all the updates!
    - you will still have the chance to say "no" to installs
    - the last "find cache" removes temp cache IF it's older than 6 months

<br>


---
layout: ../../layouts/MDLayout.astro

title: First Boot & Basic Settings
pubDate: "2023-12-01"
prev: post-02
next: post-04
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

For Pop!_OS, I like to manually update, so this disables the AppStore without uninstalling it:
```sh
mkdir -p ~/.config/autostart &&
cp /etc/xdg/autostart/io.elementary.appcenter-daemon.desktop ~/.config/autostart/ &&
echo "X-GNOME-Autostart-enabled=false" >> ~/.config/autostart/io.elementary.appcenter-daemon.desktop
```
For GNOME file explorer, to remove sidebar navigation.<br>
Use command to open config file, and then remove text after "$HOME" to hide item.
```sh
sudo nano ~/.config/user-dirs.dirs
```


## Other Settings
1. Keyring - change password to blank, ignore warnings, this prevents prompts. (local home machine is not public/insecure)
2. User settings - auto login
3. Privacy - lock screen & suspend - do not lock screen

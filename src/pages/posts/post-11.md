---
layout: ../../layouts/MDLayout.astro

title: 11 VSCodium for web design
prev: post-10
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
#add key
wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg \
    | gpg --dearmor \
    | sudo dd of=/usr/share/keyrings/vscodium-archive-keyring.gpg

#add repo
echo 'deb [ signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg ] https://download.vscodium.com/debs vscodium main' \
    | sudo tee /etc/apt/sources.list.d/vscodium.list

#install
sudo apt update && sudo apt install codium

#also need to install latest nodejs
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
nvm install node

#also need to install git & configure
git config --global user.email "craig@bonaccorsi.net"
git config --global user.name "Craig B"
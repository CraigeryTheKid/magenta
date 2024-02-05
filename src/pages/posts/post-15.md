---
layout: ../../layouts/MDLayout.astro

title: 15 Syncthing | Jackett | 7zip
prev: /posts/post-14
next: /posts/post-01
---


**ADDITIONAL TOOLS/APPS FOR TO MAKE THE FUN**<br>

<br>

## Syncthing

- Add release key:
```sh
sudo mkdir -p /etc/apt/keyrings && \
sudo curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg
```
- Add stable channel to sources
```sh
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
```
- Update & Install Syncthing:<br>
- Web UI configure is mostly self-taught, check settings!
```sh
sudo apt update && sudo apt install syncthing
```
- Make auto-start with system
```sh
sudo cp /usr/share/applications/syncthing-start.desktop to ~/.config/autostart/syncthing-start.desktop
```
- add to firewall allow list
```sh
sudo ufw allow syncthing
```

<br>

## Jackett

- Download with lengthy, "I guess I trust it", command line:
```sh
cd /opt && f=Jackett.Binaries.LinuxAMDx64.tar.gz && \
release=$(wget -q https://github.com/Jackett/Jackett/releases/latest -O - | grep "title>Release" | cut -d " " -f 4) && \
sudo wget -Nc https://github.com/Jackett/Jackett/releases/download/$release/"$f" && sudo tar -xzf "$f" && sudo rm -f "$f"
```
- Had weird error? So I inserted this ownership:
```sh
sudo chown -R [user] /opt/Jackett*
```
- Run installer and checker:
```sh
cd /opt/Jackett* && sudo ./install_service_systemd.sh && systemctl status jackett.service && \
cd - && echo -e "\nVisit http://127.0.0.1:9117"
```
- Install plugin in qbittorrent
- enter API key (from http://127.0.0.1:9117) into this file:
```sh
nano ~/.var/app/org.qbittorrent.qBittorrent/data/qBittorrent/nova3/engines/jackett.json
```

<br>

## 7zip

Super complicated:
```sh
sudo apt install p7zip-full p7zip-rar
```
to unzip with directories:
```sh
7z x filename
```
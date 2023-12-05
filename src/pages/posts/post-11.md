---
layout: ../../layouts/MDLayout.astro

title: 11 VSCodium for web design
prev: ../post-10
next: ../post-12
---


**VSCode** is the Microsoft deployment of what is otherwise open source!<br>
**Codium** is the opensource implementation, and nearly identically in every way.<br>
This is used, as I type here, to build the website with local files, and push to Github<br><br>

## VSCodium

add repo key
```sh
wget -qO - https://gitlab.com/paulcarroty/vscodium-deb-rpm-repo/raw/master/pub.gpg \
| gpg --dearmor \
| sudo dd of=/usr/share/keyrings/vscodium-archive-keyring.gpg
```
add repo
```sh
echo 'deb [ signed-by=/usr/share/keyrings/vscodium-archive-keyring.gpg ] https://download.vscodium.com/debs vscodium main' \
| sudo tee /etc/apt/sources.list.d/vscodium.list
```
install
```sh
sudo apt update && sudo apt install codium
```
also need to install latest nvm & nodejs
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```
install node
```sh
nvm install node
```
install git
```sh
sudo apt install git
```
Setup git information
```sh
git config --global user.email "name@mail.com" &&
git config --global user.name "Name"
```
Install highlights for code formats<br>
[highlight.sj](https://highlightjs.org/)
```sh
npm install highlight.js
```
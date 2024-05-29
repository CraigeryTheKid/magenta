---
layout: ../../layouts/MDLayout2.astro

title: 6 - Syncthing (Headless)
prev: /posts2/post-05
next: /posts2/post-01
---


## Syncthing (again)

This is mostly the same as the Desktop guide - but with a tiny touch for the headless component.

<br>

- Update & Install Syncthing:
```sh
sudo apt update && sudo apt install -y syncthing
```
- make services for the auto-start:
```sh
sudo systemctl enable syncthing@jedi.service && \
sudo systemctl start syncthing@jedi.service
```
- then to make it accessible open config:
    - (top is latest stable)
    - (bottom is for OLDER debian stable)
```sh
nano /home/jedi/.local/state/syncthing/config.xml
```
```sh
nano /home/jedi/.config/syncthing/config.xml
```
- then change url address to <address>0.0.0.0:8384</address>
    - instead of the "127.0.0..." default <br><br>
- restart service:

```sh
sudo systemctl restart syncthing@username.service
```
  first login will warn about username/password - add them


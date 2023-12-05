---
layout: ../../layouts/MDLayout.astro

title: 10 Firewall Settings
prev: /posts/post-09
next: /posts/post-11
---


**UFW** is a simple firewall<br>
I use for the servers, but not the main desktop.<br><br>

## UFW FIREWALL

Install ufw (usually existing, but doesn't hurt)
```sh
sudo apt install ufw
```
Allow ssh connections, which use port 22
```sh
sudo ufw allow ssh && sudo ufw allow 22
```
Allow samba connections, for network shares
```sh
sudo ufw allow samba
```
Allow remote desktop, which use 3389, for local LAN only<br>
May need to change IP range to your local setup
```sh
sudo ufw allow from 192.168.88.0/24 to any port 3389
```
Setup the global permissions
```sh
sudo ufw default deny incoming && sudo ufw default allow outgoing
```
Finally, **AFTER THE ABOVE SO YOU DON'T GET LOCKED OUT** enable firewall
```sh
sudo ufw enable
```
Check that it's working
```sh
sudo ufw status verbose
```
If you need IPv6 - open config and change IPv6 to "yes"
```sh
sudo nano /etc/default/ufw
```


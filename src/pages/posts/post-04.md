---
layout: ../../layouts/MDLayout.astro

title: Network Share Folders (SAMBA!!)
pubDate: "2023-12-01"
prev: post-03
next: post-05
---


**SAMBA** uses Windows SMB for network sharing, making it visible to both Windows and Linux machines.This is also used in picframe device and pi-NAS.

## SAMBA - Server Side (location of share folder)

Install packages from standard apt source.
```sh
sudo apt update &&
sudo apt install samba samba-common smbclient -y
```
Open config file
```sh
sudo nano /etc/samba/smb.conf
```
Add this to [Network] section
```sh
workgroup = WORKGROUP
allocation roundup size = 4096
browseable = yes
```

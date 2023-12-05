---
layout: ../../layouts/MDLayout.astro

title: 05 Network Share Folders
prev: ./post-04
next: ./post-06
---


**SAMBA** uses Windows SMB for network sharing, making it visible to both Windows and Linux machines.This is also used in picframe device and pi-NAS.

## SERVER SIDE SAMBA (host location of share folder)

Install packages from standard apt source:
```sh
sudo apt update &&
sudo apt install samba samba-common smbclient -y
```
If you are making a new "folder" for sharing:<br>
_first line makes "folder", and second line makes sure you have permissions_<br>
_replace "username" with your login_
```sh
sudo mkdir /home/folder &&
sudo chown -R username /home/folder
```
Finally, create login for connecting to the sharefolder:<br>
_It will also prompt for password; Make different than your user if shared with others_
```sh
sudo smbpasswd -a guestname
```
<br>Open the samba config file to finish setup:

```sh
sudo nano /etc/samba/smb.conf
```
1. Add this to [Network] section:
```sh
workgroup = WORKGROUP
allocation roundup size = 4096
browseable = yes
```
2. Add this to the very end:
```sh
[FOLDER]
path = /home/folder
writeable = yes
create mask = 0775
directory mask = 0775
browseable = yes
```
<br>

## CLIENT SIDE SAMBA (LAN to view network sharefolder)
Install packages from standard apt source:
```sh
sudo apt update &&
sudo apt install samba samba-common smbclient -y
```

**If you want to permanently mount sharefolder**
<br>Only recommended if host server is always online, like a NAS.

```sh
sudo mkdir /home/username/folder &&
sudo apt install cifs-utils
```
Open fstab, which controls mounting drives.<br>
BE CAREFUL WITH EXISTING CONTENT! Can break OS!
```sh
sudo nano /etc/fstab
```
1. Add to bottom of fstab document:
```sh
//SERVER/share /home/username/folder cifs uid=username,username=guestname,password=smbpassword 0 0
```
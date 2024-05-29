---
layout: ../../layouts/MDLayout.astro

title: 05 Network Share Folders
prev: /posts/post-04
next: /posts/post-06
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
sudo mkdir /home/$user/folder &&
sudo chown -R $user /home/$user/folder
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
allocation roundup size = 4096
browseable = yes
```
2. Add this to the very end:
```sh
[FOLDER]
path = /home/$user/folder
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
View server-shares using address bar <br>
- Direct IP address in Windows
- "smb://ip.ad.re.ss" in Linux


<br>

## Add shared printer to network ~~~~~~~~~~~~~~~~~~~~
### First, need to share it
- Settings -> Printer -> Additional Settings (or right-click?)
    - Server -> Server Settings
        - "Publish shared printers"
- Settings -> Printer -> Additional Settings (or right-click?)
    - Printer settings
        - Check "Enabled" and "Shared"
### Then, if firewalled, add rule to allow
- Easy gui tool for ufw
```sh
sudo apt install gufw  
```
- Then, add rule in "preconfigured" tab:
    - Allow; In; Network; Printing; CUPS


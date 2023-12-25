---
layout: ../../layouts/MDLayout.astro

title: 13 Raspberry Pi as a simple home NAS
prev: /posts/post-12
next: /posts/post-14
---


We are returning to **SAMBA** to make a simple, headless USB-drive home NAS<br>
In this example, I added a USB-to-SSD drive to the diepti, which also runs pi-hole.<br>
After the novelty of mounting a USB drive, it's really just basic SAMBA share again.<br><br>

## Physical setup
- connect USB drive
- SSH into dietpi

## Prepare Drive
Find location/name of USB drive<br>
Guide assumes it is all partions under /dev/sda...
```sh
sudo fdisk -l
```
Unmount all partitions of USB drive (be careful to only select USB!)<br>
May need to do sda1, sda2, etc
```sh
umount /dev/sda1
```
Start erase & partition setup
```sh
sudo parted /dev/sda
```
Then type each of these commands, separately, as the wizard requests:
```sh
	mklabel gpt
	mkpart
	BonoDrive
	ext4
	0%
	100%
	quit
```
Create formated partition, may take a minute:
```sh
sudo mkfs.ext4 /dev/sda1
```
Label Drive
```sh
sudo e2label /dev/sda1 BonoDrive
```
Mount drive using dietpi wizard
```sh
sudo dietpi-drive_manager
```

- Select the mounted partion (dev/sda)
	- name: /mnt/BonoDrive
Write permissions to new drive folder
```sh
sudo chown -R username /mnt/BonoDrive
```
Reboot for all to take effect
```sh
sudo reboot
```


## Enable Share Drive
If not already, install all the SAMBA stuff
```sh
sudo apt update && sudo apt install samba samba-common -y
```
Open config file
```sh
sudo nano /etc/samba/smb.conf
```
Enter in top network section:
```sh
[in network section]
confirm WORKGROUP
allocation roundup size = 4096
```	
Add this, as-is, to bottom of doc:
```sh
[BonoDrive]
path = /mnt/BonoDrive
writeable = yes
create mask = 0775
directory mask = 0775
public=no
```
Finally, add share password to user. Can be different than login for security.
```sh
sudo smbpasswd -a dietpi
```
## Address of share: \\\dietpi\BonoDrive
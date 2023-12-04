---
layout: ../../layouts/MDLayout.astro

title: 13 Raspberry Pi as a simple home NAS
prev: post-12
next: post-01
---


We are returning to **SAMBA** to make a simple, headless USB-drive home NAS<br>
In this example, I added a USB-to-SSD drive to the diepti, which also runs pi-hole<br><br>

## Physical setup
- connect USB drive
- SSH into dietpi

## Prepare Drive
sudo fdisk -l  (find your usb drive)
umount /dev/sda1 (to unmount, do all the partitions)
sudo parted /dev/sda (to start erase process)
	mklabel gpt (If prompted to erase the drive, type y and press Enter. Then run:)
	mkpart
	BonoDrive
	ext4
	0%
	100%
	quit
sudo mkfs.ext4 /dev/sda1 (create formated partition, takes a second)
sudo e2label /dev/sda1 BonoDrive (labels drive)
sudo dietpi-drive_manager (to mount drive with a guide)
	select mount on the dev/sda1
	/mnt/BonoDrive
sudo chown -R dietpi /mnt/BonoDrive (write permission to drive)
sudo reboot

## Enable Share Drive
sudo apt update
sudo apt upgrade
sudo apt install samba samba-common  (yes to DHCP and prompts)
sudo nano /etc/samba/smb.conf
	[in network section]
	confirm WORKGROUP
        allocation roundup size = 4096
	
		(add this, as-is, to bottom of doc)
	[BonoDrive]
	path = /mnt/BonoDrive
	writeable = yes
	create mask = 0775
	directory mask = 0775
	public=no
sudo smbpasswd -a dietpi (add smb password to Samba)

## Address of share: \\\dietpi\BonoDrive
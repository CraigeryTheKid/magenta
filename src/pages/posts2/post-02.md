---
layout: ../../layouts/MDLayout2.astro

title: 2 - Linux Network File System
prev: /posts2/post-01
next: /posts2/post-03
---


## Linux's far-superior Network sharing

Previously using "Samba" which is Windows's smb share, NFS is quite easy and great. <br>
Setup is faster once you know it, and transfer speeds are much higher. <br>
On a 2.5G connection, Samba maxxed at 1.4G, but NFS hit the full 2.5G transfer rate.


## SERVER - the one hosting
- Install nfs server
```sh
sudo apt-get update
sudo apt install -y nfs-kernel-server
```
- Setup your directory
```sh
sudo mkdir /mnt/Bonashare && \
sudo chown nobody:nogroup /mnt/Bonashare
sudo chmod 777 /mnt/Bonashare
echo list done
```
- Open config file & add directories to share
```sh
sudo nano /etc/exports
```
```sh
/mnt/Bonashare	   192.168.88.0/24(rw,sync,no_subtree_check)
/home/jedi	   192.168.88.0/24(rw,sync,no_subtree_check)
```
- Update & restart NFS
```sh
sudo exportfs -a && \
sudo systemctl restart nfs-kernel-server
```


## CLIENT - the one viewing <br>
Setup is required on the viewer to 'connect' to the server
- Install nfs
```sh
sudo apt-get update
sudo apt install nfs-common
```
- Create directory to 'link' to server share
```sh
sudo mkdir /mnt/Bonashare
```
-  CAREFULLY edit the fstab file
```sh
sudo nano /etc/fstab
```
```sh
192.168.88.234:/mnt/Bonashare	/mnt/Bonashare nfs defaults 0 0
```
- I also, as the master, am connecting to all the /home directories
```sh
192.168.88.234:/home/jedi	/mnt/jedihome nfs defaults 0 0
192.168.88.111:/home/brolliant	/mnt/brollihome nfs defaults 0 0
192.168.88.206:/home/spencer	/mnt/spencihome nfs defaults 0 0
```

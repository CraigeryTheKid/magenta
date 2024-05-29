---
layout: ../../layouts/MDLayout2.astro

title: 3 - Coral AI Detector
prev: /posts2/post-02
next: /posts2/post-04
---


## Using a Coral EdgeTPU PCIe (b+m key) for detection

Frigate group strongly recommended these detectors, but man was setup a journey. <br>
The final version below seems simple enough, but it took awhile to get there.

<br>

## After creating 'gasket*.deb' initially, the easy way to install:

- hardware install coral detector
```sh
sudo apt update && sudo apt upgrade && \
sudo apt install dkms -y
```
- COPY 'gasket*.deb' to server (using NFS is easiest)
- Install driver package
```sh
sudo dpkg -i gasket-dkms_1.0-18_all.deb
```
- Update devices
```sh
sudo modprobe apex
```
- Check for your apex listing, hardware, and PCIe driver:
```sh
lsmod | grep apex
lspci -nn | grep 089a
ls /dev/apex_0
```
<br>

## If you need to rebuild the gasket*.deb
- Install like 300 packages:
```sh
sudo apt update && sudo apt upgrade && \
sudo apt install devscripts debhelper dh-dkms dkms -y
```
- cd to a directory, like ~/coraldevice
```sh
git clone https://github.com/google/gasket-driver.git
```
```sh
cd gasket-driver; debuild -us -uc -tc -b; cd ..
```
- gasket*.deb file should be in list of files
```sh
ls -l
```
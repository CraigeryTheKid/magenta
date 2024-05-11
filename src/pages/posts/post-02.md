---
layout: ../../layouts/MDLayout.astro

title: 02 Full Disk Install
prev: /posts/post-01
next: /posts/post-03
---


## Make USB boot stick
1. Download image file for bootable OS.
- [Pop!_OS](https://pop.system76.com/)
- [Linux Mint](https://www.linuxmint.com/download.php)
2. Use balena etcher or popsicle, (others)... to make bootable USB.
3. Put it in the new computer.
4. Boot to it! From the BIOS.

## Install Setup and Partitions
Follow wizard steps basically... option to choose custom partitions if you want.

1. partition1 - /boot/efi - fat32 - 2gb - format (this is the boot table; required!)
2. partition2 - 'swap' - swap - 2gb     (Don't need big with 32gb ram)
3. partition3 - / (root) - ext4 - [rest of disk] - format
4. Can split /home partition separately, but I stopped doing that

## I should think of more things to put here?
1. After first boot, general settings or welcome screen may appear.
2. Without listing them, go through all the settings as you desire.
3. Next page starts command line, but honestly you can do most basics without them!
> * App Store - Search / Install / Remove programs you want<br>
> * Firefox pre-installed, ready for web<br>
> * Desktop UI will be familiar as a mix of Windows/Mac themes

Helpful list of apps for all things Linux<br>
[Awesome Linux Software](https://github.com/luong-komorebi/Awesome-Linux-Software)

## Example Settings
1. Keyring - change password to blank, ignore warnings, this prevents prompts. <br>(local desktop is not public machine)
2. User settings - auto login
3. Privacy - lock screen & suspend - do not lock screen
4. Power & Display energy saving options
5. Desktop/Background
6. Just go through all the settings tabs!


---
layout: ../../layouts/MDLayout.astro

title: 02 Full Disk Install
prev: /posts/post-01
next: /posts/post-03
---


## Make USB boot stick
1. Download image file for bootable OS.
2. Use etcher, popsicle, rufus... some imaging app.
3. Put it in the new computer.
4. Boot to it!

## Install Setup and Partitions
1. Follow steps basically... option to choose custom partitions if you want.
2. partition1 - /boot/efi - fat32 - 2gb - format
3. partition2 - 'swap' - swap - 8gb
4. partition3 - / (root) - ext4 - [rest of disk] _OR_ [80gb and split /home below] - format
4. partition4 - /home - ext4 - [rest of disk] - DO NOT format if this already contains /home data

## I should think of more things to put here?
1. After first boot, general settings or welcome screen may appear.
2. Without listing, go through all the settings as you desire.
3. Next page starts command line, but honestly you can do a lot with out them!
> * App Store - Search / Install / Remove programs you want<br>
> * Firefox pre-installed, ready for web<br>
> * Desktop UI will be familiar as a mix of Windows/Mac themes

Helpful list of apps for all things Linux<br>
[Awesome Linux Software](https://github.com/luong-komorebi/Awesome-Linux-Software)

## Example Settings
1. Keyring - change password to blank, ignore warnings, this prevents prompts. (local home machine is not public/insecure)
2. User settings - auto login
3. Privacy - lock screen & suspend - do not lock screen


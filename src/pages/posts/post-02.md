---
layout: ../../layouts/MDLayout.astro

title: Full Disk Install
pubDate: "2023-11-30"
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

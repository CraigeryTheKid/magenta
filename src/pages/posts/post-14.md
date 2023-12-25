---
layout: ../../layouts/MDLayout.astro

title: 14 Nvidia Undervolting Guide
prev: /posts/post-13
next: /posts/post-01
---


**WHAT FUN I HAD** trying to get Nvidia to undervlot.<br>
Once again finding several guides that had to be pieced together.<br>
The first half worked pretty quick, the power limit & frequency part.<br>
Getting offset to work, AND RETAIN, is what took finding a random permission fix.

<br>

## First, need to do the prereqs and permission fixes:

1. Install "Coolbits", which allows gpu settings:
```sh
sudo nvidia-xconfig -a --cool-bits=31 --allow-empty-initial-configuration
```
2. First round of permissions
```sh
sudo visudo
```
- add to end of file:
```sh
daddio        ALL = (ALL) NOPASSWD: /usr/bin/nvidia-persistenced
daddio        ALL = (ALL) NOPASSWD: /usr/bin/nvidia-smi
```
3. Second permission to add
```sh
sudo nano /etc/X11/Xwrapper.config
```
- replace the common setting & add a new line:
```sh
allowed_users = anybody
needs_root_rights = yes
```
- change permissions
```sh
chmod 2644 /etc/X11/Xwrapper.config
```
<br>

## Nvidia "Undervolting" Steps

1. Open new shell:
```sh
sudo nano /usr/local/bin/gpusettings.sh
```
2. Copy into new script; save & close:<br>
Note this is for RTX 3080 10gb; "user/1000" may need changed per install.
```sh
#!/bin/bash

nvidia-smi -pm 1
nvidia-smi -i 0 -pl 270
nvidia-smi -i 0 -lgc 0,1800

DISPLAY=:0 XAUTHORITY=/run/user/1000/gdm/Xauthority nvidia-settings \
 -a [gpu:0]/GPUFanControlState=1 \
 -a [fan:0]/GPUTargetFanSpeed=70 \
 -a [fan:1]/GPUTargetFanSpeed=70 \
 -a [gpu:0]/GPUPowerMizerMode=0 \
 -a [gpu:0]/GPUGraphicsClockOffsetAllPerformanceLevels=200 \
 -a [gpu:0]/GPUMemoryTransferRateOffsetAllPerformanceLevels=1000
```
3. Create new service
```sh
sudo nano /etc/systemd/system/gpusettings.service
```
4. Copy into new service; save & close:
```sh
[Unit]
Description=GPU power limiter
After=network.target
StartLimitIntervalSec=0

[Service]
User=root
Type=simple
Restart=always
RestartSec=1
ExecStart=/usr/local/bin/gpusettings.sh

[Install]
WantedBy=multi-user.target
```
5. change permissions on both new files:
```sh
sudo chmod 744 /usr/local/bin/gpusettings.sh
```
```sh
sudo chmod 644 /etc/systemd/system/gpusettings.service
```
6. reload & enable service:
```sh
sudo systemctl daemon-reload && systemctl enable nogpp.service
```
7. Make sure it's running:
```sh
systemctl status nogpp.service
```
<br>

## So what happened?
Nvidia really doesn't make it easy to change settings, for basic overclocks<br>
AMD cards will for sure be in the future.<br>
I don't know how, but essentially a day was spent daisy-chaining searching until it came to an answer.

Prints system info if you need to troubleshoot
```sh
nvidia-smi -i 0 -q
```
Prints system info for power & freqs of interest
```sh
nvidia-smi -i 0 -q | grep 'Power Draw' && nvidia-smi -i 0 -q | grep 'Graphics'
```

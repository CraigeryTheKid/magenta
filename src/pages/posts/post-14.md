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

1. Install full load "Coolbits", which allows gpu settings:
```sh
sudo nvidia-xconfig -a --cool-bits=31 --allow-empty-initial-configuration
```
2. First round of two user permissions
```sh
sudo visudo
```
- add to end of file:
```sh
daddio        ALL = (ALL) NOPASSWD: /usr/bin/nvidia-persistenced
daddio        ALL = (ALL) NOPASSWD: /usr/bin/nvidia-smi
```
3. Third user permission to add
```sh
sudo nano /etc/X11/Xwrapper.config
```
- replace the common setting & add a new line:
```sh
allowed_users = anybody
needs_root_rights = yes
```
- change file permissions
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
Note this is for RTX 3080 10gb; "user/1000" may need changed per install.<br>
- **MaxClock** "1800 mhz" is oem-listed boost clock (even though it goes much higher!)<br>
- **Offset** "200 mhz" was internet-inspired, roughly 10% of boost?<br>
- **Memory** "1000" translates to 19500 -> 20000, only a 2.5% boost? Idunno internet did it too.<br>
- **Power** "270 W" was set after the above and observing ~260W; optional; additional guardrail.
```sh
#!/bin/bash

nvidia-smi -pm 1
nvidia-smi -i 0 -pl 270
nvidia-smi -i 0 -lgc 0,1800
DISPLAY=:0 XAUTHORITY=/run/user/1000/gdm/Xauthority nvidia-settings \
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
After=display-manager.service

[Service]
User=root
ExecStart=/usr/local/bin/gpusettings.sh
Restart=on-failure
RestartSec=1

[Install]
WantedBy=multi-user.target

```
5. change permissions on both new files:
```sh
sudo chmod 744 /usr/local/bin/gpusettings.sh && 
sudo chmod 644 /etc/systemd/system/gpusettings.service
```
6. reload & enable service:
```sh
sudo systemctl daemon-reload && sudo systemctl enable gpusettings.service
```
7. Make sure it worked with no errors; Reboot after for good measure.
```sh
systemctl status gpusettings.service
```
<br>

## So what happened?
Nvidia really doesn't make it easy to change settings for basic overclocks<br>
AMD cards will for sure be in the future.<br>
A day was spent daisy-chaining searching until it came to an answer.

Prints system info if you need to troubleshoot
```sh
nvidia-smi -i 0 -q
```
Prints system info for power & freqs of interest; make intro script for more fun!
```sh
#1/bin/bash
nvidia-smi -i 0 -q | grep -A1 'Voltage' && \
nvidia-smi -i 0 -q | grep -m1 'Graphics' && \
nvidia-smi -i 0 -q | grep -m1 'Power Draw'
```

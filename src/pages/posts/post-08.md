---
layout: ../../layouts/MDLayout.astro

title: 08 Gigabyte B550 sleep issue
prev: ../post-07
next: ../post-09
---


**WHAT FUN I HAD** trying to get SLEEP to work on my media server.<br>
I ran through at least 6 Linux Distros before I accepted it was a PC issue.<br>
Then hours of forum searching finally pieced it together:<br>
It was a random, specific issue, with my motherboard playing with Linux.

## Steps to fix, on Gigabyte B550m

1. Open new shell:
```sh
sudo nano /usr/local/bin/nogpp.sh
```
2. Copy into new script; save & close:
```sh
#!/bin/bash

declare -a devices=(GPP0 GPP8)
for device in "${devices[@]}"; do
    if grep -qw ^$device.*enabled /proc/acpi/wakeup; then
        sudo sh -c "echo $device > /proc/acpi/wakeup"
    fi
done
```
3. Create new service
```sh
sudo nano /etc/systemd/system/nogpp.service
```
4. Copy into new service; save & close:
```sh
[Unit]
Description=No GPP Wake

[Service]
Type=oneshot
ExecStart=/usr/local/bin/nogpp.sh

[Install]
WantedBy=default.target
```
5. change permissions on both new files:
```sh
sudo chmod 744 /usr/local/bin/nogpp.sh
```
```sh
sudo chmod 644 /etc/systemd/system/nogpp.service
```
6. reload & enable service:
```sh
sudo systemctl daemon-reload && systemctl enable nogpp.service
```
7. Make sure it's running:
```sh
systemctl status nogpp.service
```
8. Make sure the two "GPP" devices are disabled in list:
```sh
nano /proc/acpi/wakeup
```
<br>

## So what happened?
In short, motherboard bridge/device had specific conflict with Linux.<br>
These helped during the resolution searching:<br>
I don't know how, but essentially a day was spent daisy-chaining searching until it came to an answer.

Prints system info if you need to troubleshoot
```sh
inxi -F
```
Command to sleep from terminal
```sh
sudo systemctl suspend
```
Checks sleep command report, look for errors
```sh
journalctl -b -u systemd-suspend.service 
```
Lists sleep inhibitors
```sh
systemd-inhibit --list --mode=block
```
Lists devices that enable wake / prevent sleep
```sh
nano /proc/acpi/wakeup
```

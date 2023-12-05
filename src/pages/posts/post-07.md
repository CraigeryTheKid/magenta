---
layout: ../../layouts/MDLayout.astro

title: 07 Wake on LAN
prev: ../post-06
next: ../post-08
---


While **Remote Desktop** will already work on a running PC - what if it's sleeping?<br>
We need to wake it up!<br><br>

## SERVER SIDE - Wake On Lan

On the server side, "waking on LAN" is more about the hardware.<br>
It must be enabled in the BIOS first, and then the OS just needs to enable/allow it.<br>
For some reason it's not a toggle - you have to install & run a script.<br>

First, install new package:
```sh
sudo apt install ethtool -y
```
Then, get the "name" of the network device.<br>
Using this command, the name will be similar to ***enp5s0*** for a ethernet connection.
```sh
ip a
```
Run this command, replacing ***enp5s0*** with your network device:<br>
Look for _Wake-on "d" = disable, or "g" = enable_.
```sh
sudo ethtool enp5s0
```
The above step likely showed a 'd' for disabled.<br>
We need to flip to 'g' every boot.
1. This next command will open an empty script for us to write:
```sh
sudo --preserve-env systemctl edit --force --full wol-enable.service
```
2. Copy this into the document.<br>
After, hit "ctrl-x" to close, and hit "y" to save before closing.
```sh
[Unit]
Description=Enable Wake-up on LAN

[Service]
Type=oneshot
ExecStart=/sbin/ethtool -s enp5s0 wol g

[Install]
WantedBy=basic.target
```
Then, reload & enable the new service, that will run on boot!
```sh
sudo systemctl daemon-reload && sudo systemctl enable wol-enable.service
```
For fun, re-run this, AFTER a reboot, to make sure Wake = 'g':
```sh
sudo ethtool enp5s0
```
<br>

## CLIENT SIDE - Sending a Wake Magicpacket

On client side, a new package will send the wake signal.<br>
We'll incorporate it into the Remote Desktop initiation for some automation.

Install the app
```sh
sudo apt install wakeonlan
```
Then we need to make the new script, that Remmina (already installed) will run.
1. Open new empty script
```sh
nano ~/Public/WOLcomm.bash
```
2. Copy this into the document.<br>
**You will need to get the local IP and the MAC address for the server!**<br>
After, hit "ctrl-x" to close, and hit "y" to save before closing.
```sh
#!/usr/bin/bash

count=0;
while true; do
	count=$count+1
	PING=$(ping 192.168.88.169 -W1 -c1)
	if [[ $PING == *"1 received"* ]]; then
		exit 0
	fi
	if (( count > 25 )); then
		exit 1
	fi
	/usr/bin/wakeonlan -i 192.168.88.255 9C:6B:00:18:B2:ED
	sleep 1
done
```
New script needs to be executable as a program:
```sh
chmod +x ~/Public/WOLmp.bash
```
Final step - back in Remmina, settings, enter this in "preload behavior"<br>
Calling the new script will WAKE the server, before trying to Remote Desktop into it.
```sh
bash /home/daddio/Public/WOLmp.bash
```
<br>

## Random tools for scripts
I had a couple weird issues with scripts not running, when nothing looked wrong.<br>
It must have been hidden formatting, and this fixed it.
1. Install shellcheck
```sh
sudo apt install shellcheck
```
2. run "shellcheck _scriptname_" to see report on issues
3. Then running this may correct/translate the script:
```sh
tr -d '\r' scriptname newgoodscriptname
```
---
layout: ../../layouts/MDLayout.astro

title: 12 Raspberry Pi-hole & Mikrotik Router
prev: ./post-11
next: ./post-13
---


**Pi-hole** is a DNS blackhole, that blocks ads & trackers by rejecting as the DNS server.<br>
**Mikrotik** is a Latvian brand of routers, fancy and allows changes to configuration.<br>
Pi-hole is named for usually being on a Raspberry Pi, and a router is only *required* if your ISP device doesn't allow changing the DNS server.<br><br>

## Initial setup & comments
Assuming you are starting with standard PC connected directly to ISP gateway.
- Note local IP address & password to your ISP modem/gateway
    - "ipconfig" in Windows
- start with default gateway (AT&T) and default router (Mikrotik) settings
- Connect AT&T LAN to Mikrotik **'ether1'**
- Connect PC to Mikrotik, and connect to router with IP address in browser
- run updates on Mikrotik router
- Back to AT&T gateway, set Mikrotik for **"passthrough/DMZ"** so router is DHCP server and public IP address
- reboot Mikrotik

## Create Pi-hole on a Raspberry Pi
- download Dietpi for RPi4
    - [Downloads Section](https://dietpi.com/#downloadinfo)
    - [Install Instructions](https://dietpi.com/docs/install/)
- extract image from .xz compressed file
- flash microSD card with your favorite image flasher - balena, popsicle...
    - Optional, configure "dietpi.txt" file to customize auto-setup
- Insert microSD card, connect to Mikrotik, and power on.
- Get IP address from Mikrotik, and set to static IP
    - IP > DHCP Server > Leases > static IP to pi-hole
- From another PC, SSH into new Dietpi device
    - login/password should be root/dietpi. First boot will have you change.
- Run dietpi updates, similar to standard update / upgrade instructions
- Software search **"pi"** - and find & install **pi-hole**!
- After following setup, should get an output like this:<br>
    **Make sure to note pi-hole password!!!**
```sh
Configure your devices to use the Pi-hole as their DNS server using:         
         │ IPv4:        192.168.88.252                                        │
         │ IPv6:        Not Configured                                        │
         │                                                                    │
         │ If you set a new IP address, you should restart the Pi.            │
         │                                                                    │
         │ View the web interface at http://pi.hole/admin or                  │
         │ http://192.168.88.252/admin                                        │
         │                                                                    │
         │ Your Admin Webpage login password is XyXyXyXy
```
- Per above message, now we need to make the Mikrotik use pi-hole as DNS server!
- But first, log into pi-hole from PC browser, and let's add all the block lists!
    - Add these to Group Management > Adlists [Community Block Lists](https://v.firebog.net/hosts/lists.php?type=tick)
    - Add to Whitelist > Domain [Whitelist Lists](https://raw.githubusercontent.com/anudeepND/whitelist/master/domains/whitelist.txt)
    - Add to Blacklist > Regex [Blacklist regex list](https://raw.githubusercontent.com/mmotti/pihole-regex/master/regex.list)

## Final DNS server setup, back on Mikrotik
- IP > DHCP Server > Leases > static IP to pi-hole
- IP > DHCP Client > DHCP Client tab --> click on Interface --> uncheck "Use Peer DNS"
- IP > DHCP Server > Networks tab --> click on Address --> enter pi-hole IP under "DNS Servers"
- IP > DHCP Server > Networks tab --> give Domain name (local)
- IP > DNS --> Dynamic Servers should be empty due to Step #1
- IP > DNS --> Enter pi-hole IP under "Servers"
- IP > DNS *UNCHECK* "allow remote requests"

To force all traffic to the pi-hole from DNS, insert rules under; IP > Firewall > NAT tab<br>
Type these in terminal, replace 192.168.1.250 with your Pi-hole IP address,<br>
and replace 192.168.1.0/24 with your LAN subnet:<br>
```sh
/ip firewall nat add chain=dstnat action=dst-nat to-addresses=192.168.88.252 protocol=udp src-address=!192.168.88.252 dst-address=!192.168.88.252 dst-port=53 in-interface=!ether1
```
```sh
/ip firewall nat add chain=dstnat action=dst-nat to-addresses=192.168.88.252 protocol=tcp src-address=!192.168.88.252 dst-address=!192.168.88.252 dst-port=53 in-interface=!ether1 
```
```sh
/ip firewall nat add chain=srcnat action=masquerade protocol=udp src-address=192.168.88.0/24 dst-address=192.168.88.252 dst-port=53
```
```sh
/ip firewall nat add chain=srcnat action=masquerade protocol=tcp src-address=192.168.88.0/24 dst-address=192.168.88.252 dst-port=53
```
- Some additional fun Mikrotik Setup; auto update and then auto reboot, weekly
    - SYSTEM > Scheduler --> on event "/system reboot"; interval "7d 00:00:00"
	- SYSTEM > Scheduler --> on event "/system package update download", make 30 min earlier!

## Additional Pi-hole settings to propose

- Settings > DNS
    - Check which DNS you are using; I switched to Cloudflare
    - Uncheck both "never forward" options
- To get the names of clients, instead of just numbers, edit this file from dietpi terminal:
```sh
sudo nano /etc/hosts
```
- IF PI-HOLE IS ALSO DHCP SERVER, can have specific clients bypass pi-hole
```sh
sudo nano /etc/dnsmasq.d/bypass.conf
```
```sh
## DOESNT WORK UNLESS PIHOLE IS DHCP SERVER

## This will go straight to Googles DNS Servers.
dhcp-option=tag:googlesdns1,6,8.8.8.8

## Your Device that goes to Google DNS
dhcp-host=8C:04:BA:77:4E:16,set:googlesdns1
```

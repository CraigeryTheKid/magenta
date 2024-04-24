---
layout: ../../layouts/MDLayout.astro

title: 16 Local VPN Server - Mikrotik
prev: /posts/post-15
next: /posts/post-01
---


**Local VPN** through Mikrotik router for remote home access<br>
Initiating use case: viewing security cameras that don't exist yet<br>
These commands are entered into the MIKROTIK terminal, or SSH!<br><br>

## VPN Server Setup

Create CA certificate and sign it
```sh
/certificate add name="Home CA" common-name="Home CA" key-size=4096 days-valid=7300 key-usage=key-cert-sign,crl-sign
/certificate sign "Home CA"
```
Create server certificate and sign it <br>
(Replace "XXX.sn.mynetname.net" with your DNS from "/ip cloud")
```sh
/certificate add name="Home server" common-name="Home server" subject-alt-name="DNS:XXX.sn.mynetname.net" key-size=4096 days-valid=3650 key-usage=tls-server
/certificate sign "Home server" ca="Home CA"
```
Create client certificate, sign it and export it as PKCS12 keystore
```sh
/certificate add name="Home client1" common-name="Home client1" key-size=4096 days-valid=3650 key-usage=tls-client
/certificate sign "Home client1" ca="Home CA"
/certificate export-certificate "Home client1" file-name="Home client1" type=pkcs12 export-passphrase=1234567890
```
Create IP pool for VPN users (Optional: I did not need to do this; pool existed)
```sh
/ip pool add name=vpn ranges=192.168.89.10-192.168.89.20
```
Add firewall rules <br>
- Add this rule before action=drop rule in INPUT chain
```sh
/ip firewall filter add action=accept chain=input comment="Allow IPSEC/IKE2 connections" dst-port=500,4500 protocol=udp
```
- Add these 2 rules before "fasttrack" rule in FORWARD chain
```sh
/ip firewall filter add action=accept chain=forward comment="Accept in ipsec policy" ipsec-policy=in,ipsec
/ip firewall filter add action=accept chain=forward comment="Accept out ipsec policy" ipsec-policy=out,ipsec
```
Configure IPSEC settings
```sh
/ip ipsec mode-config add address-pool=vpn name=vpn
/ip ipsec policy group add name=vpn
/ip ipsec profile add dh-group=modp1024 enc-algorithm=aes-256 hash-algorithm=sha256 name=vpn
/ip ipsec peer add exchange-mode=ike2 name=vpn passive=yes profile=vpn
/ip ipsec proposal add enc-algorithms=aes-256-cbc name=vpn pfs-group=none
/ip ipsec identity add auth-method=digital-signature certificate="Home server" comment="Home client1" generate-policy=port-strict match-by=certificate mode-config=vpn peer=vpn policy-template-group=vpn remote-certificate="Home client1"
/ip ipsec policy add dst-address=0.0.0.0/0 group=vpn proposal=vpn src-address=0.0.0.0/0 template=yes
```



## Additional VPN Client (if needed)

Create client#2 certificate, sign it and export it as PKCS12 keystore
```sh
/certificate add name="Home client2" common-name="Home client2" key-size=4096 days-valid=3650 key-usage=tls-client
/certificate sign "Home client2" ca="Home CA"
/certificate export-certificate "Home client2" file-name="Home client2" type=pkcs12 export-passphrase=1234567890
```
Create IPSEC identity
```sh
/ip ipsec identity add auth-method=digital-signature certificate="Home server" comment="Home client2" generate-policy=port-strict match-by=certificate mode-config=vpn peer=vpn policy-template-group=vpn remote-certificate="Home client2"
```


## ANDROID Phone

1. Download .p12 file to your smartphone.<br>
(this was much harder than they imply)<br>
(I had to SMB into Mikrotik and pull the file out, and then email it to myself)
2. Go to Android settings --> "Security & Lock screen" --> <br>
"Encryption & credentials" --> "Install a certificate" -> "VPN & app user certificate"
3. Select your downloaded .p12 certificate, Android will guide you through installation steps <br>
(all I had to do is to enter password and click "ok"/"next").
4. Download "Strongswan" from Google play. Included native IKE2 VPN likely not going to work due to unknown reasons...
5. Open "Strongswan" application.
6. Select "ADD VPN PROFILE"
7. Enter the following details (what is missing should be left as it is):

    - Server: XXX.sn.mynetname.net
    - VPN Type: IKEv2 Certificate
    - User certificate: Select your recently imported VPN certificate (it will appear in the shown list)
    - Profile name: Home
    - Advanced settings: Checked
    - IKEv2 Algorithms: aes256-sha256-prfsha256-modp1024
    - IPsec/ESP Algorithms: aes256-sha1

8. Click "SAVE".

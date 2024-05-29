---
layout: ../../layouts/MDLayout.astro

title: 15 Syncthing | 7zip | caffeine | PDF
prev: /posts/post-14
next: /posts/post-16
---


**ADDITIONAL TOOLS/APPS FOR TO MAKE THE FUN**<br>

<br>

## Syncthing

- Add release key:
```sh
sudo mkdir -p /etc/apt/keyrings && \
sudo curl -L -o /etc/apt/keyrings/syncthing-archive-keyring.gpg https://syncthing.net/release-key.gpg
```
- Add stable channel to sources
```sh
echo "deb [signed-by=/etc/apt/keyrings/syncthing-archive-keyring.gpg] https://apt.syncthing.net/ syncthing stable" | sudo tee /etc/apt/sources.list.d/syncthing.list
```
- Update & Install Syncthing:<br>
- Web UI configure is mostly self-taught, check settings!
```sh
sudo apt update && sudo apt install syncthing
```
- Make auto-start with system (replace myuser with username)
```sh
systemctl enable syncthing@myuser.service
systemctl start syncthing@myuser.service
```


<br>


## 7zip

Super complicated:
```sh
sudo apt install p7zip-full p7zip-rar
```
to unzip with directories:
```sh
7z x filename
```

<br>

## install Caffeine: ~~~~~~~~~~~~~~~~~~~

Caffeine is used to PREVENT sleep! (after all the working getting sleep!)
```sh
sudo apt install caffeine
```
and then in the startup-apps app, add:
```sh
/usr/bin/caffeine-indicator
```

<br>

## PDF tools

Convert PDF to individual image files:<br>
(Example below will convert "source.pdf" to image-01.png, image-02.pdf, etc.)
```sh
pdftoppm -png source.pdf images
```
If using paint, manually convert .png to .bmp<br>
- Then, to go back to compiled PDF:<br>
- (images(1-3).bmp means: images1.bmp images2.bmp images3.bmp)
- "-s n%xn%" is an optional size mod

```sh
img2pdf -s 64%x64% -o destination.pdf images[1-3].bmp
```

<br>

Additional tools for manipulating PDFs<br>

- "Combine bon1.pdf and bon2.pdf, to make bon12.pdf"<br>
- (these both have the same result)
```sh
pdftk bon1.pdf bon2.pdf cat output bon12.pdf
```
```sh
pdftk bon[12].pdf cat output bon12.pdf
```

- "Combine bon1, then page 3 of bon3, then bon2, then pages 6-8 of bon3"<br>
```sh
pdftk A=bon1.pdf B=bon2.pdf C=bon3.pdf cat A C3 B C6-8 output bone.pdf
```

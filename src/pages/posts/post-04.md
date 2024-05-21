---
layout: ../../layouts/MDLayout.astro

title: 04 Install Gaming Packages!
prev: /posts/post-03
next: /posts/post-05
---


Thanks to **STEAM & WINE** gaming in Linux is getting quite easy.<br>
These again could be installed "normal" with the Store, but I like command lines.

## Install WINE ( = WINE Is Not an Emulator)

enables 32-bit on system:
```sh
sudo dpkg --add-architecture i386
```
Makes folder for keys, if not existing (can do either way):
```sh
sudo mkdir -pm755 /etc/apt/keyrings
```
Adds the key:
```sh
sudo wget -O /etc/apt/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
```
Next, need to add the repo MAKE SURE YOU GET CORRECT VERSION FOR YOUR OS!<br>
[WINE HQ Download Page](https://wiki.winehq.org/Download) <br>

- For Ubuntu 22.04 (jammy) which is base of Pop!_OS 22.04:
```sh
sudo wget -NP /etc/apt/sources.list.d/ https://dl.winehq.org/wine-builds/ubuntu/dists/jammy/winehq-jammy.sources
```

Now update & install WINE!
```sh
sudo apt update && sudo apt install --install-recommends winehq-stable
```

Finally, change mode to Windows10 below: (Windows XP for debian server)
```sh
winecfg
```
<br>


## Install Lutris (Linux game launcher & WINE assistant)
Lutris can install games for you, using their database!<br>
Or, you can point it to manually installed games, and it will add to launcher.

Install FlatPak:
```sh
flatpak install flathub net.lutris.Lutris
```
Settings to tweak if games have issue:
- First, always use winetricks to make separate prefix per game!!
- Wine Version (down to 8.9, etc.)
- DXVK, other similar settings
- Use winetricks to install vcrun2022, or others needed

<br>


## Install WINETRICKS ~~~~~~~~~~~~~~~~~
Useful additional setup tool for WINE; can add missing dependencies.
```sh
sudo apt install winetricks
```
```sh
sudo winetricks --self-update
```
Use wine tricks to make wineprefix for each game!
- Open winetricks, select 'new prefix'
- Select 64-bit, and name it
- new prefix is stored in: ~/.local/share/wineprefixes
- Using lutrix, or installer, to point to that new directory
<br>


## Additional tips & Tricks
Depending on video card, of course make sure drivers are installed!!<br><br>
Add vulkan and other drivers that games need:
```sh
sudo add-apt-repository ppa:graphics-drivers/ppa && 
sudo apt update
```
- For nvidia GPU systems:
```sh
sudo apt install -y libvulkan1 libvulkan1:i386
```
- If using AMD-based graphics (preferred for Linux!!):
```sh
sudo apt install mesa-vulkan-drivers mesa-vulkan-drivers:i386
```
<br>

Add 10 second delay for "not responding" interlock (needed randomly in GNOME):
```sh
gsettings set org.gnome.mutter check-alive-timeout 10000
```
Remove unwanted shortcuts that WINE adds to Launcher:
1. Make file
```sh
sudo nano /usr/local/bin/nowhine
```
2. enter script
```sh
rm -f ~/.config/menus/applications-merged/wine* && \
rm -rf ~/.local/share/applications/wine
```
3. Make executable
```sh
sudo chmod +x /usr/local/bin/nowhine
```
<br>

## Auto-start Steam (Flatpak) ~~~~~~~~~~~~~~~~~~<br>

Install Steam from Flatpak:
```sh
flatpak install flathub com.valvesoftware.Steam
```
RUN Steam once for it to update/login
```sh
flatpak run com.valvesoftware.Steam
```

INSIDE "Startup Applications" tool, NOT command line:<br>
- Add with 'Startup Apps' App:
```sh
/usr/bin/flatpak run --branch=stable --arch=x86_64 --command=/app/bin/steam --file-forwarding com.valvesoftware.Steam @@u -silent %U @@
```
<br>

### Protontricks: Add dll to Steam to get Bepinex to work:

- Install protonticks:
```sh
sudo apt install python3-pip python3-setuptools python3-venv pipx
```
- **Close terminal**, and then re-open and run:
```sh
pipx install protontricks
```
- to upgrade:
```sh
pipx upgrade protontricks
```
- **Close terminal**, and then re-open protontricks, which helps pick the game for you:
```sh
protontricks --gui
```
- pick game
- default prefix
- run winecfg
- go to libraries
- add "winhttp", for example, to load custom dll
   - similar step for Lutris, just add to settings for game, add "native & builtin"

<br>

## Another Flatpak Install: FFXIVLauncher ~~~~~~~~~~<br>

Install from Flatpak:
```sh
flatpak install flathub dev.goats.xivlauncher
```
RUN once for it to update/login, then use App Launcher
```sh
flatpak run dev.goats.xivlauncher
```
- Make sure to select Full vs Trial version<br>
- Disable AddOns if desired (not technically supported by SquareEnix)



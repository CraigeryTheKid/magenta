---
layout: ../../layouts/MDLayout2.astro

title: 5 - Frigate Camera Container
prev: /posts2/post-04
next: /posts2/post-06
---


## Frigate! The reason we're here!

Frigate is the Linux, and the free, way to view, detect, and record your home security cameras. After the initial fumbling over a text editor style install, it's not too bad.


### Installing Frigate is mostly with config files.

- Create directories for Frigate System
- Create parent folder and open terminal from there
```sh
mkdir security && cd security
mkdir storage config
```
- Edit docker-compose.yml
    - At bottom, since it's large
```sh
nano docker-compose.yml
```
- Edit frigate config.yml
    - At bottom, since it's large
```sh
nano config/config.yml
```
Start Frigate by running from within folder containing docker-compose.yml:
```sh
docker compose up -d
```
- Frigate should now be accessible at 192.168.88.234:5000
- Docker compose updates need to run compose above again
- Frigate config updates can restart from browser gui

<br>

### docker-compose:
```sh
# DOCKER-COMPOSE.YML
services:
  frigate:
    container_name: frigate
    restart: unless-stopped
    image: ghcr.io/blakeblackshear/frigate:stable
    shm_size: "128mb" #verify amount in frigate storage view
    environment:
      - LIBVA_DRIVER_NAME=radeonsi  #AMD gpu hardware decoding
    devices:
      - /dev/dri/renderD128      #AMD gpu hardware decoding
      - /dev/apex_0:/dev/apex_0  #this is your coral device
    volumes:
      - ./config:/config
      - ./storage:/media/frigate
      - type: tmpfs
        target: /tmp/cache
        tmpfs:
          size: 1000000000
    ports:
      - "5000:5000"
      - "8554:8554"
```
<br>

### frigate config:
```sh
# CONFIG/CONFIG.YML
mqtt:
 enabled: False
ffmpeg:
  hwaccel_args: preset-vaapi

detectors:
  coral:
    type: edgetpu
    device: pci
objects:
  track:
    - person
    - bicycle
    - motorcycle
    - car
    - cat
    - dog

record:
  enabled: True
  retain:
    days: 10
    mode: motion
  events:
    retain:
      default: 30
      mode: motion
snapshots:
  enabled: True
  retain:
    default: 30

cameras:
  dummy_camera: #must name them
    enabled: False
    ffmpeg:
      inputs:
        - path: rtsp://admin:***@192.168.88.***:554/cam/realmonitor?channel=1&subtype=0&unicast=true
          roles:
            - record # main stream, higher quality
        - path: rtsp://admin:***@192.168.88.***:554/cam/realmonitor?channel=1&subtype=1&unicast=true
          roles:
            - detect # sub stream, lower quality, faster processing
```


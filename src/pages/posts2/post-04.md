---
layout: ../../layouts/MDLayout2.astro

title: 4 - Docker Install
prev: /posts2/post-03
next: /posts2/post-05
---


## Docker - Container-runner

Docker compartmentalizes packages into containers. Giving you more control or better security, or something. Honestly I did it because the guide told me to, and there didn't seem to be an obvious way to directly install Frigate.

<br>


- Add Docker's official GPG key:
```sh
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo list all done
```
- Add the repository to Apt sources:
```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

- To install the latest Docker version, run:
```sh
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
- Verify that the installation is successful by running the hello-world image:
```sh
sudo docker run hello-world
```
- Create the docker group.
```sh
sudo groupadd docker
```
- Add your user to the docker group.
```sh
sudo usermod -aG docker jedi
```
- Run the following command to activate the changes to groups:
```sh
newgrp docker
```
- Verify that you can run docker commands without sudo.
```sh
docker run hello-world
```
- Configure Docker to start on boot with systemd
```sh
sudo systemctl enable docker.service
sudo systemctl enable containerd.service
```
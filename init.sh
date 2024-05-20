#! /bin/bash

#uninstall any older version of dcoker:
sudo apt-get remove docker docker-engine docker.io containerd runc


sudo apt-get update
yes | sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

#install docker and docker compose
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
yes | sudo apt-get install docker-ce docker-ce-cli containerd.io
apt-cache madison docker-ce
sudo apt-get install docker-ce
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
sudo groupadd docker
sudo usermod -aG docker ${USER}
sudo gpasswd -a ${USER} docker
sudo apt update

#pulling our repo:
yes | git clone git@github.com:LoayMoh99/MinlyLite.git

# #For nginx:
# '
# sudo wget http://nginx.org/keys/nginx_signing.key
# sudo apt-key add nginx_signing.key
# echo "deb http://nginx.org/packages/ubuntu xenial nginx" | sudo tee -a /etc/apt/sources.list
# echo "deb-src http://nginx.org/packages/ubuntu xenial nginx" | sudo tee -a /etc/apt/sources.list
# sudo apt-get update
# sudo apt-get install nginx

# echo "deb http://nginx.org/packages/debian/ wheezy nginx" | sudo tee -a /etc/apt/sources.list
# echo "deb-src http://nginx.org/packages/debian/ wheezy nginx" | sudo tee -a /etc/apt/sources.list
# '

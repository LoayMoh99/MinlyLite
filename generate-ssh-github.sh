#! /bin/bash

ssh-keygen -t rsa -b 4096 -C "github@minlylite" #ssh-keygen -t rsa -b 4096 -C "<any label>"

eval "$(ssh-agent -s)"

ssh-add ~/.ssh/id_rsa # if you changed the name replace it here also

cat ~/.ssh/id_rsa.pub # copy this SSH key and add it to your github profile

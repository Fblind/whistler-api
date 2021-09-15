# TODO list

- [ ] Add dockerfile
- [ ] Add standard
- [ ] Follow 12 factor standard
- [ ] Add logger
- [ ] Add Mongo
- [ ] Add migrations
- [ ] Add cluster

# Que cosas tiene que tener mi proyecto para arrancar

- .editorconfig
- .gitignore
- test (mocha, chai, expect, superrequest, )

Armar todo lo que hice como docs
DOTENV_CONFIG_PATH
https://blog.logrocket.com/customizing-node-js-env-files/

install docker
create ssh
ssh-keygen -t rsa -b 4096 -C "hello@fblind.dev"

What I did?:

- git clone project
- put env.production into docker
- Install docker
- Build image from repo
- Run image
- Point hover with A dns to ip
- Install ngnix (https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
- Configurar ngnix por afuera (https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)
- Enable with sudo ln -s /etc/nginx/sites-available/whistler.fblind.dev /etc/nginx/sites-enabled/
- Add https (https://www.digitalocean.com/community/tutorials/como-asegurar-nginx-con-let-s-encrypt-en-ubuntu-18-04-es)
- sudo certbot --nginx -d whistler.fblind.dev
- certbot magic (https://community.letsencrypt.org/t/is-the-renew-timer-running-on-my-machine-as-it-is-supposed-to/118206/4)

sudo ufw allow 'Nginx Full'

sudo nano /etc/nginx/sites-available/whistler.fblind.dev
https://www.digitalocean.com/community/questions/two-different-node-apps-with-two-different-domains-in-one-droplet

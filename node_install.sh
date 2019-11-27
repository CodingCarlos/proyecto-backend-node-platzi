cd ~
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs

sudo apt-get install git

sudo npm i pm2 -g

pm2 status

git clone https://github.com/CodingCarlos/proyecto-backend-node-platzi.git

cd proyecto-backend-node-platzi
npm install

pm2 start api/index.js
pm2 start post/index-post.js
pm2 start mysql/index-mysql.js
pm2 start cache/index-cache.js

pm2 status

pm2 logs
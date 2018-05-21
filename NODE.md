# Node

### Install Node.js on Raspberry Pi

With the Raspberry Pi properly set up, login in via SSH, and update your Raspberry Pi system packages to their latest versions.

Update your system package list:
```sh
> sudo apt-get update
```

Upgrade all your installed packages to their latest version:
```sh
> sudo apt-get dist-upgrade
```

Doing this regularly will keep your Raspberry Pi installation up to date.

To download and install newest version of Node.js, use the following command:
```sh
> curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
```

Now install it by running:
```sh
> sudo apt-get install -y nodejs
```
Check that the installation was successful, and the version number of Node.js with:
```sh
> node -v
```
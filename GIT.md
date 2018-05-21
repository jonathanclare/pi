# Git

### Troubleshoot
- Git can remove capitals from file names causing code to break - dont use capitals in file names.

Install on Pi
```sh
> sudo apt-get install git
```

Clone code from Git:
```sh
> git clone https://github.com/jonathanclare/pi.git
```

Overwrite code from Git:
```sh
> git fetch --all
> git reset --hard origin/master
```
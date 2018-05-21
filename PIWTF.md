# PIWTF

### Cables
*2018-04-29* Didnt have a hdmi-dvi cable for my monitor - went out and bought one - subsequently found out I did have the correct cable hidden in a drawer.

### VCN & SSH 
*2018-04-29* Confusing hostname with username (in most cases username is always 'pi') - so I couldnt connect to the pi.
*2018-04-29* The laptop I used was connected to a different WIFI than the pi because my gf had been using it - so I couldnt connect to the pi.

### Pimonori STS-Pi robot rover 
* *2018-05-01* I connected the camera module to the display instead of the camera.
* *2018-05-01* I didnt like the way the camera module was connected to the buggy - it didnt lie flush. I subsequently found out
about that the screws used in general for the pi are nylon M2.5 and theres such a thing as spacers and standoffs
* *2018-05-01* I couldnt for the life of me find a cyclindrical usb power pack - I had to pause one of the yuotube videos and figure out 
which pack the guy was using. It was some kind of Anker. I bought the Anker PowerCore+ mini but subsequently found it
was too small for the battery clips provided so bought a Anker PowerCore 5000 instead which is a bit bigger. Will it fit?

### PYTHON 
*2018-05-02* Installed guizero package but when I tried to use it in a script I was getting told it didnt exist.
I was running the script through the terminal and the default version of python for raspbian is 2.
So I found out if I run python through the terminal like this 'python myscript.py' its running python 2.

So Id used 'pip3 install guizero' to install it.

Find out your system path in python like this

import sys
print('\n'.join(sys.path))
Or as a one liner from the terminal:

python -c "import sys; print('\n'.join(sys.path))"

Found out they were all pointing to Python 2 versions of packages

Instead i Should type 'python3 myscript.py' to use Python 3.

I also found out this actually works in the IDEs because they have their own version of the python shell runnning

*2018-05-02* install package for Python 2 'pip install mypackage'
*2018-05-02* install package for Python 3 'pip3 install mypackage'
*2018-05-02* Use help('modules') in the shell to list locaally installed modules - altthough it does seem to want to run my scripts

*2018-05-08* Watch out installing python - 32bit vs 64bit reference different modules. I didnt understand why my modules had disappeared then
realised everything was installed under the 32 bit version and Id opened my file using the 64bit version of python

### PIP
* *2018-05-02* 'pip freeze' in terminal. Output installed packages in requirements format. 
* *2018-05-02* 'pip list' in terminal.  List installed packages. 

### GPIO 
* *2018-05-02* A handy reference can be accessed on the Raspberry Pi by opening a terminal window and running the command 'pinout'. This tool is provided by the GPIO Zero Python library 


### GIT 
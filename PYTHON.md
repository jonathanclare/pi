# Python

### Troubleshoot

-  32bit vs 64bit reference different modules. I didnt understand why my modules had disappeared then
realised everything was installed under the 32 bit version and Id opened my file using the 64bit version of python.
- Code not running? Check which version of Python youre using.
- The terminalwill use the version of Python the system path, An IDE may be using a different version.

### System path

Check system path
```sh
> python -c "import sys; print('\n'.join(sys.path))"
```

### Version

Get version of Python:
```sh
> python
```

### Run code

Run Python 3:
```sh
> python3 app.py
```

Run version of Python found on system path:
```sh
> python app.py
```

Run Python 3:
```sh
> python3 app.py
```

### Run function from command line.

With the -c (command) argument (assuming your file is named foo.py):
```sh
> python -c 'import foo; print foo.hello()'
```

Alternatively, if you don't care about namespace pollution:
```sh
$ python -c 'from foo import *; print hello()'
```

And the middle ground:
```sh
$ python -c 'from foo import hello; print hello()'
```

### Package Management

Upgrade PIP.
```sh
> python -m pip install -U pip
```

Output installed packages in requirements format.
```sh
> pip freeze
```

 List installed packages.
```sh
> pip list
```

List locally installed modules:
```sh
help('modules') 
```

Install package for Python 2: 
```sh
pip install mypackage
```

Install package for Python 3:
```sh
pip3 install mypackage
```

### Python Shell

Open Python shell:
```sh
> python
```

Exit Python shell:
```sh
> exit()
```
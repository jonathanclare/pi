# Python

### Troubleshoot

-  32bit vs 64bit reference different modules. I didnt understand why my modules had disappeared then
realised everything was installed under the 32 bit version and Id opened my file using the 64bit version of python.
- Code not running? Check which version of Python youre using.
- The terminal may be using a different version of Python than your IDE.

### System path

Check system path
```sh
> python -c "import sys; print('\n'.join(sys.path))"
```

### Run code

Run Python 2:
```sh
> python app.py
```

Run Python 3:
```sh
> python3 app.py
```

### Install Modules

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
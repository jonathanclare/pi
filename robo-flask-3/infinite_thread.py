import threading

class InfiniteThread:

    # Constructor
    def __init__(self, fnc): 
        self._fnc = fnc
        self.isRunning = False
        self._thread = threading.Thread()

    def start(self, **kwargs):
        self.stop()
        self.isRunning = True
        self._thread = threading.Thread(target=self._threadLoop, kwargs=kwargs)
        self._thread.daemon = True
        self._thread.start()

    def stop(self):
        if self._thread.isAlive():  
            self.isRunning = False
            self._thread.join()  

    def _threadLoop(self, **kwargs):
        self._fnc(**kwargs)
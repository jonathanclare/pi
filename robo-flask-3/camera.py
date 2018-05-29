from time import time, sleep
from picamera import PiCamera

class Camera(object):
    def __init__(self):
        self.camera = PiCamera()
        self.camera.rotation = 180
        #self.frames = [open(f + '.jpg', 'rb').read() for f in ['1', '2', '3']]

    def start(self):
        self.camera.start_preview()

    def getFrame(self):
        self.camera.capture('./image.jpg')
        f = open('./image.jpg', 'rb').read()
        return f
        #return self.frames[int(time()) % 3]

    def stop(self):
        self.camera.stop_preview()


import threading

class CameraThread:

    # Constructor
    def __init__(self, camera):
    	self._frame = None
    	self._running = False
    	self._camera = camera
    	self._thread = threading.Thread()

    def start(self, **kwargs2):
        self.kill()
        self._camera.start()
        self._running = True
        self._thread = threading.Thread(target=self._threadWorker, kwargs=kwargs2)
        self._thread.daemon = True
        self._thread.start()

    def kill(self):
        if self._thread.isAlive():  
            self._running = False
            self._thread.join()
            self._camera.stop() 

    def getFrame(self):
        return self._frame

    def _threadWorker(self, **kwargs):
        while self._running:
        	self._frame = self._camera.getFrame();
        	sleep(0.01)
        print('Stop _running')
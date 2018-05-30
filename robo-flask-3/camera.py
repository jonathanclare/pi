from time import time, sleep
import threading
#from picamera import PiCamera

class Camera:

    t = 0.01
    imagePath = './image.jpg'

    # Constructor
    def __init__(self):
        self._frames = [open(f + '.jpg', 'rb').read() for f in ['1', '2', '3']]
        self._running = False
        #self._camera = PiCamera()
        #self._camera.rotation = 180
        self._thread = threading.Thread()


    def start(self):
        self.stop()
        #self._camera.start_preview()
        self._running = True
        self._thread = threading.Thread(target=self._target)
        self._thread.start()

    def stop(self):
        if self._thread.isAlive():
            self._running = False
            self._thread.join()
            #self._camera.stop_preview() 

    def getFrame(self):
        return self._frames[int(time()) % 3]
        #f = open(imagePath, 'rb').read()
        #return f

    def _target(self):
        pass
        #for filename in self._camera.capture_continuous(imagePath):
            #if self._running = False:
                #break
            #sleep(t) 
            
'''
class Camera(object):
    def __init__(self):
        #self.camera = PiCamera()
        #self.camera.rotation = 180
        self.frames = [open(f + '.jpg', 'rb').read() for f in ['1', '2', '3']]

    def start(self):
        pass
        # Start a preview and let the camera warm up for 2 seconds.
        #self.camera.start_preview()
        #time.sleep(2)

    def getFrame(self):
        #self.camera.capture('./image.jpg')
        #f = open('./image.jpg', 'rb').read()
        #return f
        return self.frames[int(time()) % 3]

    def stop(self):
        pass
        #self.camera.stop_preview()


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
'''
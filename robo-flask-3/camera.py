from time import time, sleep
#from picamera import PiCamera

class Camera:

    # Constructor
    def __init__(self):
        self._frames = [open(f + '.jpg', 'rb').read() for f in ['1', '2', '3']]
        self._isRunning = False
        #self.picam = PiCamera()
        #self.picam.rotation = 180

    def start(self):
        if self._isRunning == False:
            self._isRunning = True
            #self.picam.start_preview()
            sleep(2) # Give camera time to warm up.

    def stop(self):
        self._isRunning = False
        #self.picam.stop_preview() 

    def getFrame(self, imagePath='./image.jpg', t=0.1):
        self.start()
        return self._frames[int(time()) % 3]
        #self.picam.capture(imagePath)
        #sleep(t) 
        #return open(imagePath, 'rb').read()

    def generateFrames(self, imagePath='./image.jpg', t=0.1):
        self.start()
        while True:
            yield (b'--frame\r\n'b'Content-Type: image/jpeg\r\n\r\n' + self.getFrame(imagePath=imagePath, t=t) + b'\r\n')
            sleep(t)
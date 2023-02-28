
class setget:
   def __init__(self, age=20):
         self._age = age

    # getter method
   def get_age(self):
        return self._age
      
    # setter method
   def set_age(self, x):
        self._age = x
        
sg = setget()


def hehe():
   print("yolo")
   haha()
   
def haha():
   print("yala")

hehe()
def function():
   sg.set_age(21)
   return sg.get_age()

        
if __name__ == '__main__':
    var = function()
    print(var)

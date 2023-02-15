string = "http://bulletxinbijak.blogspot.com/2020/03/tugas-daring-bahasa-iggris.html"
def gg():
   bol=False
   with open(r'Result/error_web.txt', 'r') as fp:
      lines = fp.readlines()
      for row in lines:
         if row.strip() in string:
            bol=True
            break
   if bol==True:
      print("yay")
   else:
      print("nahh")
            
            
gg()
from PIL import Image

def unir():
    tam1 = 0
    tam1 = 0
    imagen = []
    i = 4
    j = 0
    largo = 0
    while i<25:
        try:
            imagen.append( Image.open("./notas/image"+ str(i) +".png") ) 
            i+=2
            largo = int(imagen[j].size[1]) + largo
            j+=1
        except: 
            break

    final = Image.new("RGB",(imagen[0].size[0], largo),"black")
    k = 0
    for img in imagen:
        final.paste(img, (0,k))
        k += img.size[1]
    
    final.save("./notas/notas.jpg")
   
unir()

from PIL import Image, ImageDraw

img = Image.new('RGB', (400, 200), color = (255, 255, 255))
d = ImageDraw.Draw(img)
d.text((10,10), "MRP: Rs 150", fill=(0,0,0))
d.text((10,30), "Mfg Date: 12/2023", fill=(0,0,0))
d.text((10,50), "Net Qty: 500g", fill=(0,0,0))
d.text((10,70), "FSSAI: 12345678901234", fill=(0,0,0))
d.text((10,90), "Manufacturer: Test Corp", fill=(0,0,0))
d.text((10,110), "Address: 123 Street", fill=(0,0,0))
img.save('test_label.png')
print("Image created: test_label.png")

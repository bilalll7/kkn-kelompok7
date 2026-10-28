from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
from collections import Counter
root=Path('public/images/client-assets')
out=Path('public/images/documentation'); out.mkdir(exist_ok=True)
files=sorted(p for p in root.rglob('*') if p.suffix.lower() in ['.jpg','.jpeg','.png','.heic','.heif'])
sheet=Image.new('RGB',(1200,((len(files)+3)//4)*250),'white'); draw=ImageDraw.Draw(sheet)
for i,p in enumerate(files):
 if p.suffix.lower() in ['.heic','.heif']: continue
 im=ImageOps.exif_transpose(Image.open(p)).convert('RGBA')
 if p.name=='logo.png':
  print(Counter(im.getdata()).most_common(5))
  im=im.crop(im.getbbox()); im.save(out/'logo.png')
 else:
  im.thumbnail((2000,2000)); im.convert('RGB').save(out/f'{i:02}.webp',quality=88)
 thumb=im.copy(); thumb.thumbnail((290,210)); x=(i%4)*300;y=(i//4)*250; sheet.paste(thumb,(x,y),thumb); draw.text((x,y+212),f'{i:02} {p.name}',fill='black')
 print(i,p.name)
sheet.save('references/rendered/assets.jpg')

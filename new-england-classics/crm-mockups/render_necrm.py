import glob,os
from playwright.sync_api import sync_playwright
from PIL import Image
O='/workspace/ClientMockup/new-england-classics/crm-mockups'
fs=sorted(glob.glob('/tmp/necrm_[0-9]*.html'))
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1440,'height':960})
    for f in fs:
        pg.goto('file://'+f); pg.wait_for_timeout(700)
        pg.screenshot(path=f"{O}/{os.path.basename(f)[6:-5]}.png")
    b.close()
ims=sorted(glob.glob(O+'/[0-9]*.png')); W,H=480,320; cs=Image.new('RGB',(4*W+50,4*H+50),'#e8e5df')
for i,f in enumerate(ims):
    cs.paste(Image.open(f).convert('RGB').resize((W,H)),(10+(i%4)*(W+10),10+(i//4)*(H+10)))
cs.save(O+'/contact-sheet.png'); print(len(ims))

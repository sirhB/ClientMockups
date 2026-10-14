from playwright.sync_api import sync_playwright
Q='/workspace/ClientMockup/new-england-classics/pitch/'
with sync_playwright() as p:
    b=p.chromium.launch()
    pg=b.new_page(viewport={'width':1179,'height':2556}); pg.goto('file://'+Q+'wp.html'); pg.wait_for_timeout(1500); pg.screenshot(path=Q+'pitch-wallpaper.png')
    pg=b.new_page(viewport={'width':816,'height':1056},device_scale_factor=2); pg.goto('file://'+Q+'pricing-sheet.html'); pg.wait_for_timeout(1500)
    pg.pdf(path=Q+'pricing-sheet.pdf',format='Letter',print_background=True); pg.screenshot(path=Q+'pricing-sheet.png',full_page=True)
    b.close()

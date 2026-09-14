import os
from PIL import Image

pages_dir = r"C:\Users\yaqub ahmed\.gemini\antigravity-ide\brain\5b35c0ea-8998-4282-ae15-6d967be7629a\scratch\pdf_pages"
out_dir = r"c:\Users\yaqub ahmed\Desktop\garuda_gears\garuda_gears\public\images\products"
os.makedirs(out_dir, exist_ok=True)

# Precise coordinates for inner photograph of each product on the 2480x3509 page render
# (xmin, ymin, xmax, ymax)
inner_photos = {
    # Page 2: Fine pitch gears
    "fine-pitch-gears": (2, (1463, 780, 2365, 1366)),
    # Page 2: Gear box refurbishing
    "gear-box-refurbishing": (2, (1474, 2132, 2355, 2695)),
    # Page 3: Ground gears
    "ground-gears": (3, (1538, 792, 2397, 1370)),
    # Page 3: Helical gears
    "helical-gears": (3, (1531, 2110, 2381, 2670)),
    # Page 4: Timer pulleys
    "timer-pulleys": (4, (1486, 666, 2359, 1231)),
    # Page 4: Worm wheel
    "worm-wheel": (4, (1492, 1981, 2360, 2536)),
    # Page 5: Spline shafts
    "spline-shafts": (5, (1560, 630, 2380, 1260)),
    # Page 5: Sprockets
    "sprockets": (5, (1592, 1985, 2430, 2548)),
    # Page 6: Internal gears
    "internal-gears": (6, (1516, 801, 2367, 1355)),
    # Page 6: Rack and pinion
    "rack-and-pinion": (6, (1518, 2078, 2374, 2645)),
}

for prod_id, (page_num, (xmin, ymin, xmax, ymax)) in inner_photos.items():
    page_img_path = os.path.join(pages_dir, f"page_{page_num}.png")
    if os.path.exists(page_img_path):
        img = Image.open(page_img_path)
        cropped = img.crop((xmin, ymin, xmax, ymax))
        out_file = os.path.join(out_dir, f"{prod_id}.jpg")
        cropped.convert("RGB").save(out_file, "JPEG", quality=95)
        print(f"Saved {prod_id}.jpg: size={cropped.size}")

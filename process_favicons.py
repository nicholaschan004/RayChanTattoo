from PIL import Image

def process_favicon(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    
    max_dim = max(img.width, img.height)
    padding = int(max_dim * 0.05) # 5% padding so it takes up more space
    new_size = max_dim + padding * 2
    
    square_img = Image.new('RGBA', (new_size, new_size), (0,0,0,0))
    offset = ((new_size - img.width) // 2, (new_size - img.height) // 2)
    square_img.paste(img, offset)
    
    square_img = square_img.resize((128, 128), Image.Resampling.LANCZOS)
    square_img.save(output_path, "PNG")
    print(f"Saved {output_path}")

process_favicon("Logo/RC_LOGO_BLACK.png", "public/favicon-light.png")
process_favicon("Logo/logo_transparent_clean.png", "public/favicon-dark.png")

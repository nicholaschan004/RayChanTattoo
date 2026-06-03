from PIL import Image

def get_tight_bbox(img, threshold=25):
    # Get alpha channel, find where alpha > threshold
    alpha = img.split()[-1]
    return alpha.point(lambda p: p > threshold and 255).getbbox()

def process_favicon(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    bbox = get_tight_bbox(img, 25)
    if bbox:
        img = img.crop(bbox)
    
    # Use max_dim as new_size so there is 0 padding, making it as big as possible
    max_dim = max(img.width, img.height)
    new_size = max_dim
    
    square_img = Image.new('RGBA', (new_size, new_size), (0,0,0,0))
    # Center horizontally. Vertically, we slightly push it down if it's too high? 
    # Usually, a strict crop centers it perfectly. We'll stick to mathematical center.
    # To shift the image UP, we subtract from the mathematical Y center.
    offset_x = ((new_size - img.width) // 2) + int(new_size * 0.04)
    offset_y = ((new_size - img.height) // 2) - int(new_size * 0.06)
    
    square_img.paste(img, (offset_x, offset_y))
    
    square_img = square_img.resize((144, 144), Image.Resampling.LANCZOS)
    square_img.save(output_path, "PNG")
    print(f"Saved {output_path}")

process_favicon("Logo/RC_LOGO_BLACK.png", "public/favicon-light.png")
process_favicon("Logo/logo_transparent_clean.png", "public/favicon-dark.png")

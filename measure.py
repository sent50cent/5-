import urllib.request
from PIL import Image

img = Image.open('TV.jpg')
pixels = img.load()
width, height = img.size

min_x, min_y = width, height
max_x, max_y = 0, 0

for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y]
        if r > 245 and g > 245 and b > 245:
            if x < min_x: min_x = x
            if x > max_x: max_x = x
            if y < min_y: min_y = y
            if y > max_y: max_y = y

if max_x >= min_x and max_y >= min_y:
    print(f"White area: ({min_x}, {min_y}) to ({max_x}, {max_y})")
    print(f"Image size: {width}x{height}")
    print(f"Top: {min_y / height * 100}%")
    print(f"Left: {min_x / width * 100}%")
    print(f"Width: {(max_x - min_x) / width * 100}%")
    print(f"Height: {(max_y - min_y) / height * 100}%")
else:
    print("No white area found")

import urllib.request
from PIL import Image

img = Image.open('TV.jpg')
pixels = img.load()
width, height = img.size

# start from center
cx, cy = width//2, height//2

min_x, max_x = cx, cx
min_y, max_y = cy, cy

while min_x > 0 and pixels[min_x, cy][0] > 240: min_x -= 1
while max_x < width-1 and pixels[max_x, cy][0] > 240: max_x += 1
while min_y > 0 and pixels[cx, min_y][0] > 240: min_y -= 1
while max_y < height-1 and pixels[cx, max_y][0] > 240: max_y += 1

print(f"White area from center: ({min_x}, {min_y}) to ({max_x}, {max_y})")
print(f"Image size: {width}x{height}")
print(f"Aspect ratio Image: {width/height:.3f}")
print(f"Aspect ratio Screen: {(max_x-min_x)/(max_y-min_y):.3f}")
print(f"Top: {min_y / height * 100:.3f}%")
print(f"Left: {min_x / width * 100:.3f}%")
print(f"Width: {(max_x - min_x) / width * 100:.3f}%")
print(f"Height: {(max_y - min_y) / height * 100:.3f}%")

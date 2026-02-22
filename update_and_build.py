#!/usr/bin/env python3

import os
import subprocess
import re

# Папки
IMAGES_DIR = "images"
OPTIMIZED_DIR = "images_optimized"

# Сначала убедимся, что папка для оптимизированных версий существует
os.makedirs(OPTIMIZED_DIR, exist_ok=True)

print("🚀 Оптимизация новых изображений...")

# Список допустимых расширений картинок
valid_exts = (".jpg", ".jpeg", ".png", ".webp")
updated_files = []

for filename in os.listdir(IMAGES_DIR):
    if filename.lower().endswith(valid_exts):
        # Делаем имя безопасным (меняем пробелы на _)
        safe_name = filename.replace(" ", "_")
        original_path = os.path.join(IMAGES_DIR, filename)
        optimized_path = os.path.join(OPTIMIZED_DIR, safe_name)
        
        # Если такого оптимизированного файла еще нет – сжимаем его 
        if not os.path.exists(optimized_path):
            print(f"Сжимаю: {filename} -> {safe_name}")
            # Изменяем размер макс на 1920px и сжимаем JPEG до 60%
            subprocess.run([
                "sips", "-Z", "1920", "-s", "format", "jpeg", 
                "-s", "formatOptions", "60", original_path, "--out", optimized_path
            ], capture_output=True)
            
        updated_files.append(f'"{safe_name}"')

# Сортируем файлы, чтобы они были по алфавиту/номерам
updated_files.sort()
files_list_str = ",\n        ".join(updated_files)

# Обновляем script.js
print("🚀 Обновляю код сайта (script.js)...")

with open('script.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Ищем где у нас массив imageFiles = [ ... ];
# Используем регулярные выражения, чтобы аккуратно заменить список картинок
pattern = r'(const imageFiles = \[)(.*?)(\];)'
replacement = fr'\1\n        {files_list_str}\n    \3'

new_js_content = re.sub(pattern, replacement, js_content, flags=re.DOTALL)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("🚀 Сайт готов для отправки на GitHub!")

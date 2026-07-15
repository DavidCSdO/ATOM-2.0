import re

file = 'src/components/sections/HeroSection.jsx'

with open(file, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('`${styles.heroNavBtn} ${styles.heroNavBtnLeft}`', 'styles.heroNavBtn')
content = content.replace('`${styles.heroNavBtn} ${styles.heroNavBtnRight}`', 'styles.heroNavBtn')

with open(file, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')

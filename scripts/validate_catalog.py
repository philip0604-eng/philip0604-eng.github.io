#!/usr/bin/env python3
"""Check manuscript counts, category counts, PDF links and index accuracy."""
from pathlib import Path
import json,collections
from bs4 import BeautifulSoup
base=Path(__file__).resolve().parent.parent
data=json.loads((base/'research.json').read_text(encoding='utf-8'))
assert len(data)==len(set(d['slug'] for d in data))
counts=collections.Counter(d['theme'] for d in data)
for d in data:
 assert (base/'pdfs'/d['pdf']).exists(),d['pdf']
 assert (base/'papers'/(d['slug']+'.html')).exists(),d['slug']
home=BeautifulSoup((base/'index.html').read_text(encoding='utf-8'),'html.parser')
research=BeautifulSoup((base/'research/index.html').read_text(encoding='utf-8'),'html.parser')
assert int(home.select_one('.hero-stats strong').get_text())==len(data)
for el in home.select('.theme-grid .theme-item'):
 cat=el.select_one('h3').get_text(' ',strip=True)
 assert int(el.select_one('.theme-top span').get_text(' ',strip=True).split('/')[1].split()[0])==counts[cat]
assert len(research.select('#paper-grid .paper-card'))==len(data)
for btn in research.select('.filter-btn'):
 cat=btn['data-filter'];n=int(btn.select_one('span').get_text())
 assert n==(len(data) if cat=='All' else counts[cat])
print('PASS',len(data),'manuscripts;',dict(counts))

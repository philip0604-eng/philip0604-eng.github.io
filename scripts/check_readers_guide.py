#!/usr/bin/env python3
from pathlib import Path
from collections import Counter
import json,re
root=Path(__file__).resolve().parent.parent
records=json.loads((root/'research.json').read_text(encoding='utf-8'))
counts=Counter(r['theme'] for r in records)
assert len(records)==60 and len(set(r['slug'] for r in records))==60
home=(root/'index.html').read_text(encoding='utf-8')
listing=(root/'research/index.html').read_text(encoding='utf-8')
assert re.search(r'class="hero-stats".*?<strong>60</strong>',home,re.S)
for name, num in counts.items():
    assert re.search(r'\d\d / %02d WORKS</span>.*?<h3>%s</h3>'%(num,re.escape(name.replace('&','&amp;'))),home,re.S),name
assert 'collection of 60 works' in home and 'Explore all 60 papers' in home
assert len(re.findall(r'class="addition-entry"',home))==10
for p in records[-10:]:
    assert 'href="papers/'+p['slug']+'.html"' in home
assert len(re.findall(r'class="paper-card"',listing))>=60
for p in records:
    assert (root/'papers'/(p['slug']+'.html')).is_file(),p['slug']
    assert (root/'pdfs'/p['pdf']).is_file(),p['pdf']
for s in ['reading-guide','editorial-notes','compare-papers']:
    assert 'id="'+s+'"' in home
print('Archive verified:',len(records),'papers;',dict(counts))

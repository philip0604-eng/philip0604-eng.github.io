#!/usr/bin/env python3
"""Build the static GitHub Pages artifact with correct canonical URLs and sitemap."""
from pathlib import Path
import os, shutil, re, html, xml.etree.ElementTree as ET, json
from urllib.parse import quote
ROOT=Path(__file__).resolve().parent.parent
DEST=ROOT/'_site'
if DEST.exists(): shutil.rmtree(DEST)
DEST.mkdir()
for name in ['index.html','research','papers','pdfs','assets','research.json','.nojekyll']:
 src=ROOT/name
 if src.is_dir():shutil.copytree(src,DEST/name)
 elif src.exists():shutil.copy2(src,DEST/name)
repo=os.environ.get('GITHUB_REPOSITORY','YOUR_USERNAME/YOUR_USERNAME.github.io')
parts=repo.split('/')
owner=parts[0]
repository=parts[-1]
if (ROOT/'CNAME').exists():
 domain=(ROOT/'CNAME').read_text().strip()
 url_base='https://'+domain
 shutil.copy2(ROOT/'CNAME',DEST/'CNAME')
elif repository.lower()==f'{owner.lower()}.github.io':
 url_base=f'https://{owner}.github.io'
else:
 url_base=f'https://{owner}.github.io/{quote(repository)}'
url_base=url_base.rstrip('/')
entries=[]
for file in sorted(DEST.rglob('*.html')):
 relative=file.relative_to(DEST).as_posix()
 if relative=='index.html':canonical=url_base+'/'
 elif relative.endswith('/index.html'):canonical=url_base+'/'+relative[:-10]
 else:canonical=url_base+'/'+relative
 source=file.read_text(encoding='utf-8')
 source=source.replace('__SITE_URL__',url_base)
 seo=f'<link rel="canonical" href="{html.escape(canonical,quote=True)}"><meta property="og:url" content="{html.escape(canonical,quote=True)}">'
 source=source.replace('<!-- SEO_CANONICAL -->',seo)
 # Authoritative structured data URLs on article pages.
 if relative.startswith('papers/'):
  def inject_schema(m):
   try:
    obj=json.loads(m.group(1))
    obj['url']=canonical
    obj['mainEntityOfPage']=canonical
    obj['encoding']={'@type':'MediaObject','contentUrl':url_base+'/pdfs/'+relative.removeprefix('papers/').removesuffix('.html')+'.pdf','encodingFormat':'application/pdf'}
    return '<script type="application/ld+json">'+json.dumps(obj,ensure_ascii=False).replace('</','<\\/')+'</script>'
   except Exception: return m.group(0)
  source=re.sub(r'<script type="application/ld\+json">(.*?)</script>',inject_schema,source,flags=re.S)
 file.write_text(source,encoding='utf-8')
 entries.append(canonical)
ns='http://www.sitemaps.org/schemas/sitemap/0.9'
ET.register_namespace('',ns)
root=ET.Element('{'+ns+'}urlset')
for item in entries:
 node=ET.SubElement(root,'{'+ns+'}url')
 ET.SubElement(node,'{'+ns+'}loc').text=item
ET.ElementTree(root).write(DEST/'sitemap.xml',encoding='utf-8',xml_declaration=True)
(DEST/'robots.txt').write_text(f'User-agent: *\nAllow: /\n\nSitemap: {url_base}/sitemap.xml\n',encoding='utf-8')
print(f'Prepared {len(entries)} indexed HTML pages for {url_base}/')
print(f'PDFs: {len(list((DEST/"pdfs").glob("*.pdf")))}; total size {sum(f.stat().st_size for f in DEST.rglob("*") if f.is_file())/1024/1024:.1f} MiB')

import resourceLoad from './Network/resourceLoad';
import parseHTML from './HTMLParser/parseHTML';
import attach from './Attachment/attach';
import parseCSS from './CSSParser/parseCSS';

export default async function browse(url: string) {
  // const refererUrl = url;

  console.log('parseHTML');
  // parseHTML
  const document = parseHTML(await resourceLoad(url));

  console.log('load css style sheet');
  // load css style sheet
  const styleSheets = await Promise.all(document.styleSheetNodes.map(async (el) => {
    let cssText = '';
    if (el.tagName === 'LINK') {
      cssText = await resourceLoad(el.href, url);
    }
    return parseCSS(cssText);
  }));

  console.log('attach');
  // attach
  const renderTree = attach(document, styleSheets);
  console.log(renderTree);
}
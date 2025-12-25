import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';

const [, , path, generateTypescript] = process.argv;

if (!path) {
  console.info("Please provide a path to the folder containing .svg's");
  process.exit(1);
}

const projectRoot = process.cwd();
const folder = `${projectRoot}/${path}`;

if (!existsSync(folder)) {
  mkdirSync(folder);
  console.info('Folder created:', folder);
}

const svgs = readdirSync(folder)
  .filter((file) => file.endsWith('.svg'))
  .map((file) => `${folder}/${file}`);

console.info(
  `Scanned and found ${svgs.length} icons: (${svgs
    .map((name) => name.split('/').pop())
    .join(', ')})`
);

if (svgs.length === 0) {
  console.info('Exiting...');
  process.exit(1);
}

const svgObject = {};

for (const svg of svgs) {
  const name = svg.split('/').pop().replace('.svg', '');
  const contents = readFileSync(svg).toString();
  const viewBoxRegex = /viewBox="([^"]*)"/;
  const viewBoxMatch = contents.match(viewBoxRegex);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '';
  let [, , viewBoxWidth, viewBoxHeight] = viewBox.split(' ');

  const widthRegex = /width="([^"]*)"/;
  const widthMatch = contents.match(widthRegex);
  if (!viewBoxWidth && widthMatch) viewBoxWidth = widthMatch[1];

  const heightRegex = /height="([^"]*)"/;
  const heightMatch = contents.match(heightRegex);
  if (!viewBoxHeight && heightMatch) viewBoxHeight = heightMatch[1];

  const stripSvgTag = contents.replace(/<svg.*?>/, '').replace('</svg>', '');

  const svgElementRegex = /<([^>]*)>/g;

  const svgElements = [];

  // Iterate through each match of SVG elements
  let match,
    i = 0,
    fills = [],
    strokes = [];
  while ((match = svgElementRegex.exec(stripSvgTag)) !== null) {
    let elementMatch = match[0];
    const fillRegex = /fill="([^"]*)"/;
    const strokeRegex = /stroke="([^"]*)"/;
    const styleRegex = /style="([^"]*)"/;

    const fillMatch = match[0].match(fillRegex);
    const strokeMatch = match[0].match(strokeRegex);
    const styleMatch = elementMatch.match(styleRegex);

    const styles = [];

    styles.push(`fill: var(--${name}-fill-color-${i}, currentColor);`);
    if (fillMatch) {
      fills.push(fillMatch[1]);
      elementMatch = elementMatch.replace(fillRegex, '');
    } else {
      fills.push('#000');
    }

    if (strokeMatch) {
      strokes.push(strokeMatch[1]);
      styles.push(`stroke: var(--${name}-stroke-color-${i}, transparent);`);
      elementMatch = elementMatch.replace(strokeRegex, '');
    } else {
      strokes.push(null);
    }

    if (styleMatch) {
      // If there's already a style attribute, append the new styles to it
      // const existingStyles = styleMatch[1];
      elementMatch = elementMatch.replace(styleRegex, `style="${styles.join(' ')}"`);
    } else {
      // If there's no style attribute, add one
      elementMatch = elementMatch.replace(/<([^>]+)>/, `<$1 style="${styles.join(' ')}"/>`);
    }

    svgElements.push(elementMatch);
    i++;
  }

  let widthRatio = 1;
  let heightRatio = 1;

  if (viewBoxWidth && viewBoxHeight) {
    const wide = viewBoxWidth > viewBoxHeight;
    if (wide) {
      widthRatio = viewBoxWidth / viewBoxHeight;
    } else {
      heightRatio = viewBoxHeight / viewBoxWidth;
    }
  }

  svgObject[name] = {
    elements: svgElements,
    fills,
    strokes,
    viewBoxWidth: viewBoxWidth ? parseFloat(viewBoxWidth, 10) : null,
    viewBoxHeight: viewBoxHeight ? parseFloat(viewBoxHeight, 10) : null,
    widthRatio,
    heightRatio
  };
}

const jsonFile = `${folder}/icons.json`;
writeFileSync(jsonFile, `${JSON.stringify(svgObject, null, 2)}\n`);
console.info('File generated:', jsonFile);

if (generateTypescript && generateTypescript === '--generate-types') {
  const tsFile = `${folder}/types.ts`;
  writeFileSync(
    tsFile,
    `export type IconName = ${Object.keys(svgObject)
      .map((name) => `'${name}'`)
      .join(' | ')};\n`
  );
  console.info('File generated:', tsFile);
}

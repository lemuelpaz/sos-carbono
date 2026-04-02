import fs from 'fs';
import { Jimp } from 'jimp';

async function processImage() {
  try {
    const image = await Jimp.read('swc-coin.png');
    // iterate over every pixel
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      // get colors
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // se é branco ou fundo muito claro quase branco
      if (red > 220 && green > 220 && blue > 220) {
        // change alpha to 0
        this.bitmap.data[idx + 3] = 0;
      }
    });

    await image.writeAsync('swc-coin-transparent.png');
    console.log('Background removed successfully.');
  } catch (e) {
    console.error('Error processing image: ', e);
  }
}

processImage();

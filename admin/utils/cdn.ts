import axios from 'axios';
import path from 'path';
import sharp from 'sharp';
import fs from 'fs';
import { slugify } from './helpers';

export const getCDNPath = () => {
  return path.join(process.cwd(), `../${process.env.CDN_DIR}`);
};

const getRnd = (seed: string) => {
  const seedrandom = require('seedrandom');
  return seedrandom(seed);
};

const createPathRecursive = (newPath: string) => {
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath, { recursive: true });
  }
};

const getFinalPath = (
  originalImage: string,
  subPath: string,
  fullPath: boolean = true
) => {
  const rnd = getRnd(originalImage);
  const imagePath = process.env.CDN_IMAGE_DIR!;

  return path.join(
    fullPath ? getCDNPath() : '/',
    imagePath,
    subPath.length === 0 ? (Math.floor(rnd() * 999) + 111).toString() : subPath
  );
};

export const deleteImage = (
  originalImage: string,
  title: string,
  subPath: string = '',
  prefix: string = ''
) => {
  const finalPath = getFinalPath(originalImage, subPath);
  const filePath = path.join(finalPath, slugify(title) + prefix + '.webp');
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const getMetaData = async (src: any) => {
  return await src.metadata();
};

export const createImage = async (
  originalImage: string,
  title: string,
  height: number,
  width: number,
  subPath: string = '',
  prefix: string = ''
) => {
  try {
    const finalPath = getFinalPath(originalImage, subPath);
    const imageResponse = await axios({
      url: originalImage,
      responseType: 'stream',
    });
    createPathRecursive(finalPath);
    const src = imageResponse.data.pipe(sharp());
    await src
      .flop()
      .resize(width, height, { fit: 'fill' })
      .webp({ lossless: true })
      .toFile(path.join(finalPath, slugify(title) + prefix + '.webp'));
    return path.join(
      getFinalPath(originalImage, subPath, false),
      slugify(title) + prefix + '.webp'
    );
  } catch (err: any) {
    console.log(err.message || 'Image Error');
    return null;
  }
};

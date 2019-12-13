import { store } from './store';

interface ImageForDraw {
  image: HTMLImageElement;
  opacity: number;
}

const fillCanvas = (canvas: HTMLCanvasElement, color: string) => {
  const drawContext = canvas.getContext('2d');
  drawContext.beginPath();
  drawContext.rect(0, 0, canvas.width, canvas.height);
  drawContext.fillStyle = color;
  drawContext.fill();
};

const clearCanvas = (canvas: HTMLCanvasElement) => {
  const drawContext = canvas.getContext('2d');
  drawContext.clearRect(0, 0, canvas.width, canvas.height);
};

const drawImage = (canvas: HTMLCanvasElement) => ({
  image,
  opacity,
}: ImageForDraw) => {
  const drawContext = canvas.getContext('2d');

  drawContext.save();
  drawContext.globalAlpha = opacity;
  drawContext.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  drawContext.restore();
};

const createImage = async (
  src: string | null,
  opacity: number = 1,
): Promise<ImageForDraw | null> => {
  if (!src) {
    return null;
  }

  const image = new Image();

  image.src = src;

  return new Promise(resolve => {
    image.addEventListener('load', () => {
      resolve({ image, opacity });
    });
  });
};

export const initViewportSync = () => {
  const viewport = document.getElementById('viewport') as HTMLCanvasElement;
  const drawContext = viewport.getContext('2d');

  fillCanvas(viewport, '#8F99A3');

  store.on('@changed', async ({ mask, avatar }) => {
    const images = await Promise.all([
      createImage(avatar),
      createImage(mask, 0.45),
    ]);

    clearCanvas(viewport);
    images.filter(Boolean).forEach(drawImage(viewport));
  });
};

import React, { RefObject } from 'react';
import s from './avatar-editor.module.scss';
import { Button } from '../../shared/button/button';

interface IProps {
  file: File | null

  onUploadToBackend(blob: Blob): void
}

interface IState {
  canvas: RefObject<HTMLCanvasElement>
}

class AvatarEditor extends React.Component<IProps, IState> {
  img = new Image();
  mouseX = 1;
  mouseY = 1;
  selection!: Selection;

  constructor(props: IProps) {
    super(props);

    this.state = { canvas: React.createRef<HTMLCanvasElement>() };
  }

  componentDidMount() {
    const { file } = this.props;
    const { canvas } = this.state;
    const ctx: CanvasRenderingContext2D = canvas.current!.getContext('2d')!;
    const reader = new FileReader();

    reader.addEventListener('load', e => {
      this.img.src = e.target!.result as string;
    });
    reader.readAsDataURL(file as File);

    this.img.onload = () => {
      ctx.canvas.width = this.img.width;
      ctx.canvas.height = this.img.height;

      this.selection = new Selection(ctx, this.img);

      canvas.current!.addEventListener('mousemove', (e: MouseEvent) => {
        this.mouseX = Math.floor(e.offsetX);
        this.mouseY = Math.floor(e.offsetY);

        this.onMouseMove(ctx);
      });
      canvas.current!.addEventListener('touchmove', (e: TouchEvent) => {
        const r = ctx.canvas.getBoundingClientRect();

        this.mouseX = Math.floor(e.touches[0].pageX - r.left);
        this.mouseY = Math.floor(e.touches[0].pageY - r.top);

        this.onMouseMove(ctx);
      });

      canvas.current!.addEventListener('mousedown', () => {
        this.onMouseDown(this.selection);
      });
      canvas.current!.addEventListener('touchstart', () => {
        this.onMouseDown(this.selection);
      });

      canvas.current!.addEventListener('mouseup', () => {
        this.onMouseUp(this.selection);
      });
      canvas.current!.addEventListener('touchend', () => {
        this.onMouseUp(this.selection);
      });

      this.drawScene(ctx);
    };
  }

  onMouseMove = (ctx: CanvasRenderingContext2D) => {
    let dw = 0, dx = 0, dy = 0;

    for (let i = 0; i < 4; i++) {
      this.selection.mHover[i] = false;
      this.selection.mSizes[i] = this.selection.mSize;
    }

    if (this.selection.dragAll) {
      const x = this.mouseX - this.selection.px;
      const y = this.mouseY - this.selection.py;

      this.selection.x = this.setParam(ctx, x, 'x');
      this.selection.y = this.setParam(ctx, y, 'y');
    }

    if (this.selection.mDrag[0]) {
      dx = this.mouseX - this.selection.px;
      dy = this.mouseY - this.selection.py;
      dw = this.selection.w + this.selection.x - dx;
    }

    if (this.selection.mDrag[1]) {
      dx = this.selection.x;
      dy = this.mouseY - this.selection.py;
      dw = this.mouseX - this.selection.px - dx;
    }

    if (this.selection.mDrag[2]) {
      dx = this.selection.x;
      dy = this.selection.y;
      dw = this.mouseX - this.selection.px - dx;
    }

    if (this.selection.mDrag[3]) {
      dx = this.mouseX - this.selection.px;
      dy = this.selection.y;
      dw = this.selection.w + this.selection.x - dx;
    }

    if (dw > this.selection.mSizeH * 2) {
      this.selection.w = dw;

      if (!this.selection.mDrag[1]) {

        this.selection.x = dx;

        this.selection.y = dy;
      }
    }

    if (this.mouseX > this.selection.x - this.selection.mSizeH
      && this.mouseX < this.selection.x + this.selection.mSizeH
      && this.mouseY > this.selection.y - this.selection.mSizeH
      && this.mouseY < this.selection.y + this.selection.mSizeH) {
      this.selection.mHover[0] = true;
      this.selection.mSizes[0] = this.selection.mSizeH;
    }

    if (this.mouseX > this.selection.x + this.selection.w - this.selection.mSizeH
      && this.mouseX < this.selection.x + this.selection.w + this.selection.mSizeH
      && this.mouseY > this.selection.y - this.selection.mSizeH
      && this.mouseY < this.selection.y + this.selection.mSizeH) {
      this.selection.mHover[1] = true;
      this.selection.mSizes[1] = this.selection.mSizeH;
    }

    if (this.mouseX > this.selection.x + this.selection.w - this.selection.mSizeH
      && this.mouseX < this.selection.x + this.selection.w + this.selection.mSizeH
      && this.mouseY > this.selection.y + this.selection.w - this.selection.mSizeH
      && this.mouseY < this.selection.y + this.selection.w + this.selection.mSizeH) {
      this.selection.mHover[2] = true;
      this.selection.mSizes[2] = this.selection.mSizeH;
    }

    if (this.mouseX > this.selection.x - this.selection.mSizeH
      && this.mouseX < this.selection.x + this.selection.mSizeH
      && this.mouseY > this.selection.y + this.selection.w - this.selection.mSizeH
      && this.mouseY < this.selection.y + this.selection.w + this.selection.mSizeH) {
      this.selection.mHover[3] = true;
      this.selection.mSizes[3] = this.selection.mSizeH;
    }

    this.drawScene(ctx);
  };

  onMouseDown = (selection: Selection) => {
    selection.px = this.mouseX - selection.x;
    selection.py = this.mouseY - selection.y;

    if (selection.mHover[0]) {
      selection.px = this.mouseX - selection.x;
      selection.py = this.mouseY - selection.y;
    }

    if (selection.mHover[1]) {
      selection.px = this.mouseX - selection.x - selection.w;
      selection.py = this.mouseY - selection.y;
    }

    if (selection.mHover[2]) {
      selection.px = this.mouseX - selection.x - selection.w;
      selection.py = this.mouseY - selection.y - selection.w;
    }

    if (selection.mHover[3]) {
      selection.px = this.mouseX - selection.x;
      selection.py = this.mouseY - selection.y - selection.w;
    }

    if (this.mouseX > selection.x + selection.mSizeH
      && this.mouseX < selection.x + selection.w - selection.mSizeH
      && this.mouseY > selection.y + selection.mSizeH
      && this.mouseY < selection.y + selection.w - selection.mSizeH) {
      selection.dragAll = true;
    }

    selection.mDrag = selection.mDrag.map((item: boolean, i: number) => selection.mHover[i]);
  };

  onMouseUp = (selection: Selection) => {
    selection.dragAll = false;
    selection.mDrag = selection.mDrag.map(() => false);
    selection.px = 0;
    selection.py = 0;
  };

  setParam = (ctx: CanvasRenderingContext2D, value: number, name: string) => {
    const paramName = name === 'x' ? 'width' : 'height';

    switch (true) {
      case value < 0:
        return 0;
      case value + this.selection.w > ctx.canvas[paramName]:
        return ctx.canvas[paramName] - this.selection.w;
      default:
        return value;
    }
  };

  drawScene = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(this.img, 0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = 'rgba(14, 19, 67, .5)';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.selection.draw();
  };

  getResults = () => {
    const { onUploadToBackend } = this.props;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = this.selection.w;
    canvas.height = this.selection.w;

    ctx!.drawImage(this.img, this.selection.x, this.selection.y, this.selection.w, this.selection.w, 0, 0, this.selection.w, this.selection.w);

    const vData = canvas.toDataURL();
    const block = vData.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];
    const blob = this.b64toBlob(realData, contentType);

    onUploadToBackend(blob);
  };

  b64toBlob = (b64Data: string, contentType: string) => {
    contentType = contentType || '';
    const sliceSize = 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  render(): React.ReactElement {
    const { canvas } = this.state;

    return (
      <div className={s.editor}>
        <canvas ref={canvas} className={s.editor__canvas}/>
        <Button color="blue" onClick={this.getResults}>Upload</Button>
      </div>
    );
  }
}

class Selection {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  w: number;
  x: number;
  y: number;
  px = 0;
  py = 0;
  mSize = 6;
  mSizeH = 10;
  mHover: boolean[] = [false, false, false, false];
  mSizes: number[] = [this.mSize, this.mSize, this.mSize, this.mSize];
  mDrag: boolean[] = [false, false, false, false];
  dragAll = false;

  constructor(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    this.ctx = ctx;
    this.img = img;

    this.w = Math.min(ctx.canvas.width, ctx.canvas.height) / 2;
    this.x = ctx.canvas.width / 2 - this.w / 2;
    this.y = ctx.canvas.height / 2 - this.w / 2;
  }

  draw(): void {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(this.x, this.y, this.w, this.w);

    if (this.w > 0) {
      this.clipper(this.ctx, this.img, this.x, this.y, this.w, this.w, this.w * 0.27);
    }

    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.x - this.mSizes[0], this.y - this.mSizes[0], this.mSizes[0] * 2, this.mSizes[0] * 2);
    this.ctx.fillRect(this.x + this.w - this.mSizes[1], this.y - this.mSizes[1], this.mSizes[1] * 2, this.mSizes[1] * 2);
    this.ctx.fillRect(this.x + this.w - this.mSizes[2], this.y + this.w - this.mSizes[2], this.mSizes[2] * 2, this.mSizes[2] * 2);
    this.ctx.fillRect(this.x - this.mSizes[3], this.y + this.w - this.mSizes[3], this.mSizes[3] * 2, this.mSizes[3] * 2);
  }

  clipper(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number, rad: number) {
    ctx.beginPath();
    ctx.arc(x + rad, y + rad, rad, Math.PI, Math.PI + Math.PI / 2, false);
    ctx.lineTo(x + w - rad, y);
    ctx.arc(x + w - rad, y + rad, rad, Math.PI + Math.PI / 2, Math.PI * 2, false);
    ctx.lineTo(x + w, y + h - rad);
    ctx.arc(x + w - rad, y + h - rad, rad, Math.PI * 2, Math.PI / 2, false);
    ctx.lineTo(x + rad, y + h);
    ctx.arc(x + rad, y + h - rad, rad, Math.PI / 2, Math.PI, false);
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.drawImage(img, x, y, w, h, x, y, w, h);
    ctx.restore();
  }
}

export default AvatarEditor;

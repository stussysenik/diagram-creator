export function exportPNG(
  svg: SVGSVGElement,
  targetWidth: number,
  targetHeight: number
): void {
  const serializer = new XMLSerializer();
  const source = serializer.serializeToString(svg);
  const encoded = encodeURIComponent(source);
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`;

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram-${targetWidth}x${targetHeight}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 'image/png');
  };
  img.src = dataUrl;
}

import * as React from 'react';

interface AspectRatioProps extends React.ComponentProps<'div'> {
  ratio?: number;
}

function AspectRatio({ ratio = 1, style, ...props }: AspectRatioProps) {
  return <div data-slot="aspect-ratio" style={{ aspectRatio: ratio, ...style }} {...props} />;
}

export { AspectRatio, type AspectRatioProps };

import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react';

export type RevealVariant = 'up' | 'fade' | 'scale' | 'left' | 'right' | 'mask';

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger step (each step = 100ms). */
  index?: number;
  /** Show immediately when content is already on screen after a filter action. */
  immediate?: boolean;
  style?: CSSProperties;
  hidden?: boolean;
  children?: ReactNode;
}

export function Reveal({ as: Tag = 'div', variant = 'up', index = 0, immediate = false, style, className, children, ...rest }: RevealProps) {
  const animation = {
    up: 'fade-up',
    fade: 'fade',
    scale: 'zoom-in',
    left: 'fade-left',
    right: 'fade-right',
    mask: 'zoom-in',
  }[variant];

  return (
    <Tag
      data-aos={animation}
      data-aos-delay={index > 0 ? index * 100 : undefined}
      className={[className, immediate && 'aos-animate'].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

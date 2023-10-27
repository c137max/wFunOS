'use client'
import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';


type Props = {
  name: string;
  className?: string;
  outline?: boolean;
};


export default function HeroIcon({ name, className, outline = false }: Props){
  if (className === '' || className === null || className === undefined) {
    className = "h-6 w-6 text-black-500"
  }
  // @ts-ignore
  const Icon = outline ? OutlineIcons[name] : SolidIcons[name];
  return (
    <Icon className={className} aria-hidden={true} />
  )
};

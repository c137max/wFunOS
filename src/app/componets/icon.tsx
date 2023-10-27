// import dynamic from "next/dynamic";
import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
// import { ComponentType } from "react";


type Props = {
  name: string;
  className?: string;
  outline?: boolean;
};


const HeroIcon = ({ name, className, outline = false }: Props) => {
    if (className === '' || className === null || className === undefined) {
        className = "h-6 w-6 text-black-500"
    }
//   const Icon: ComponentType<{ className: string }> = outline
//     // @ts-ignore
//     ? dynamic(() => import("@heroicons/react/24/outline").then((mod) => mod[name]))
//     
//     : dynamic(() => import("@heroicons/react/24/solid").then((mod) => mod[name]));
// @ts-ignore
const Icon = outline ? OutlineIcons[name] : SolidIcons[name];
  return <Icon className={className} aria-hidden={true} />;
};

export default HeroIcon;
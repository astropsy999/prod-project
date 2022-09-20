declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}


declare module "*.png"
declare module "*.jpeg"
declare module "*.jpg"
declare module "*.woff2"
declare module "*.svg" {
    import {VFC} from "react";
    const SVG: VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}


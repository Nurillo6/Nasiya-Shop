import type { MouseEvent, ReactNode } from "react";

export interface TextType {
    children:ReactNode,
    classList?:string,
    onClick?:(e:MouseEvent<HTMLParagraphElement>) => void
}
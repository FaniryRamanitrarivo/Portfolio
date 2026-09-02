import { ImageResponse } from "next/og";
import {
  OgImageTemplate,
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
} from "@/src/lib/shared/og-image-template";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = ogImageAlt;

export default async function OpengraphImage() {
  return new ImageResponse(<OgImageTemplate />, size);
}

export interface PaletteColor {
  hexCode: string;
  colorName: string;
  category: string;
}

export interface PaletteResponse {
  palette: PaletteColor[];
  themeName: string;
  rationale: string;
}
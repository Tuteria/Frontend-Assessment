import { DefaultTheme } from "@chakra-ui/core";
export interface Theme extends DefaultTheme {
    borders: any;
    shadows: any;
    radii: any;
    colors: any;
    borderWidths: any;
    borderRadius: any;
}
declare const theme: Theme;
export default theme;

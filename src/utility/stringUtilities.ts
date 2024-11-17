export const replaceAll = (str: string, toReplace: string, replacement: string) => {
    while(str.includes(toReplace)) {
        str = str.replace(toReplace, replacement);
    }

    return str;
}
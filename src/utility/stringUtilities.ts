export const replaceAll = (str: string, toReplace: string, replacement: string) => {
    while(str.includes(toReplace)) {
        str = str.replace(toReplace, replacement);
    }

    return str;
}

export const formatDate = (date: Date) => {
    const split = new Date(
        date.getTime() - (date.getTimezoneOffset() * 60000 )
    ).toISOString().split("T");

    return split[0] + ' ' + split[1].split('.')[0];
}
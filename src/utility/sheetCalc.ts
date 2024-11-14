export const getStatModifier = (rawStat: number) => {
    return rawStat >= 22 ? 5
        : rawStat >= 20 ? 4
        : rawStat >= 18 ? 3
        : rawStat >= 16 ? 2
        : rawStat >= 13 ? 1
        : rawStat >= 10 ? 0
        : -1;
}
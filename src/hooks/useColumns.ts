import { useState, useEffect } from "preact/hooks";
import { useImages } from "./useImages";

export const useColumns = (loading: boolean, columnWrapper: any) => {
    const [columns, setColumns] = useState<string[][]>([]);
    const [images] = useImages(loading);

    const getShortestColumn = () => {
        const heights = Array.from((columnWrapper.current as HTMLElement).children).map(e => e.clientHeight);
        const min = Math.min(...heights);
        return heights.indexOf(min);
    }

    useEffect(() => {
        let tempImgs: string[][] = Array(Math.ceil(window.innerWidth / 600)).fill(undefined).map(() => []);
        images.forEach((e, i) => tempImgs[i % tempImgs.length].push(e));
        setColumns(tempImgs);
    }, [images]);

    return [columns];
}
import { useState, useEffect } from "preact/hooks";
import { useImages } from "./useImages";

export const useColumns = (columnWrapper: any) => {
    const [columns, setColumns] = useState<string[][]>([]);
    const { getImages } = useImages();

    const getShortestColumn = () => {
        const heights = Array.from((columnWrapper.current as HTMLElement).children).map(e => e.clientHeight);
        const min = Math.min(...heights);
        return heights.indexOf(min);
    }

    const loadNewImage = async () => {
        if (columnWrapper.current) {
            const newImg = await getImages(1);
            const shortest = getShortestColumn();
            const tempColumn = [...columns];
            tempColumn[shortest].push(newImg[0]);
            setColumns(tempColumn)
        }
    }

    useEffect(() => {
        const getInitialData = async () => {
            let tempImgs: string[][] = Array(Math.ceil(window.innerWidth / 600)).fill(undefined).map(() => []);
            let images = await getImages(20);
            images.forEach((e, i) => tempImgs[i % tempImgs.length].push(e));
            setColumns(tempImgs);
        }

        getInitialData();
    }, []);

    return { columns, loadNewImage };
}
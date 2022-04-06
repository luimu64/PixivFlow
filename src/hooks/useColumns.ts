import { useState, useEffect } from "preact/hooks";
import { useImages } from "./useImages";

export const useColumns = (columnWrapper: any) => {
    const [columns, setColumns] = useState<string[][]>([]);
    const [resizing, setResizing] = useState<boolean>(false);
    const { getImages } = useImages();

    const getShortestColumn = async () => {
        const heights = Array.from((columnWrapper.current as HTMLElement).children).map(e => e.clientHeight);
        const min = Math.min(...heights);
        return heights.indexOf(min);
    }

    const loadNewImage = async () => {
        if (columnWrapper.current) {
            const newImg = await getImages(1) || [];
            const shortest = await getShortestColumn();
            const tempColumn = [...columns];
            tempColumn[shortest].push(newImg[0]);
            setColumns(tempColumn)
        }
    }

    const initializeColumns = async (images: string[]) => {
        let tempImgs: string[][] = Array(Math.ceil(window.innerWidth / 600)).fill(undefined).map(() => []);
        images.forEach((e, i) => tempImgs[i % tempImgs.length].push(e));
        setColumns(tempImgs);
    }

    useEffect(() => {
        if (resizing) {
            setTimeout(() => {
                initializeColumns(columns.flat());
                setResizing(false);
            }, 1000)
        }
    }, [resizing])

    useEffect(() => {
        (async () => initializeColumns(await getImages(20)))();

        window.addEventListener('resize', () => setResizing(true));

        return () => window.removeEventListener('resize', () => setResizing(true));
    }, []);

    return { columns, loadNewImage };
}
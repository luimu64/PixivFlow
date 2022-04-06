import { useRef, useEffect } from "preact/hooks"

export const useImages = (getMoreImages?: boolean) => {
    const images = useRef<string[]>([]);


    const getImages = async (iteration: number) => {
        const res = await fetch('https://pximg.rainchan.win/img');
        images.current = images.current.concat(res.url);
        if (iteration > 0) getImages(--iteration);
    }

    useEffect(() => {
        if (getMoreImages) getImages(10);
    }, [getMoreImages]);

    return [images.current];
}
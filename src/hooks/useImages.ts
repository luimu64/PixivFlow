import { useState, useEffect } from "preact/hooks"

export const useImages = (getMoreImages?: boolean) => {
    const [images, setImages] = useState<string[]>([]);

    const getImages = async (amount: number) => {
        let templinks: string[] = Array(amount).fill('https://pximg.rainchan.win/img');

        const promises = await Promise.all(templinks.map(link => fetch(link).then(res => res.url)));

        setImages([...images].concat(promises));
    }

    useEffect(() => {
        if (getMoreImages) getImages(10);
    }, [getMoreImages]);

    return [images];
}
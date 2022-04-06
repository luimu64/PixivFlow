export const useImages = () => {
    const getImages = async (amount: number) => {
        let templinks: string[] = Array(amount).fill('https://pximg.rainchan.win/img');
        const promises = templinks.map(link => fetch(link).then(res => res.url));
        const newImages = await Promise.all(promises);
        return newImages;
    }

    return { getImages };
}
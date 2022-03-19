import { useEffect, useState } from "preact/hooks";

export const PixivApi = {
    getRandomImgs: (amount: number) => {
        const getData = async () => {
            let templinks: string[] = [];

            for (let i = 0; i < amount; i++) {
                templinks.push('https://pximg.rainchan.win/img')
            }

            const promises = templinks.map(link => fetch(link).then(res => res.url))

            return await Promise.all(promises);
        }

        return getData();
    },

    getRandomImg: async () => {
        const res = await fetch('https://pximg.rainchan.win/img')
        return res.url;
    }
}
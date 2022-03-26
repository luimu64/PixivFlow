import { ImageTile } from './components/ImageTile'
import { Loading } from './components/Loading';
import { PixivApi } from './services/PixivApi'
import { useState, useEffect } from 'preact/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { Footer } from './components/Footer';

export function App() {
  const [columns, setColumns] = useState<string[][]>([]);
  const [lastColumn, setLastColumn] = useState<number>(columns.length - 1);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadInitialImages = async () => {
      //creates array of arrays of column amount
      let tempImgs: string[][] = Array(Math.ceil(window.innerWidth / 600)).fill(undefined).map(() => []);
      const imgs = await PixivApi.getRandomImgs(12);
      imgs.forEach((e, i) => tempImgs[i % tempImgs.length].push(e));
      setColumns(tempImgs);
      setInitialLoading(false);
    }

    loadInitialImages();
    window.scrollTo(0, 0);
  }, [])

  const loadImageList = async () => {
    const data = await PixivApi.getRandomImg() ?? [];
    //setImgs(imgs.concat(data))
  }

  return (
    <main>
      <h1 class="text-5xl font-bold text-center text-white p-5">PixivFlow</h1>
      <InfiniteScroll
        loadMore={loadImageList}
        hasMore={true}
        initialLoad={false}
        threshold={10000}
      >
        {initialLoading ? <Loading /> :
          <div class='flex justify-center gap-3 md:w-2/3 w-full mx-auto'>
            {columns.map((c, i) => (
              <div class='w-1/2'>
                {c.map((data, i) => (
                  <ImageTile
                    key={i}
                    url={data}
                  />
                ))}
              </div>
            ))}
          </div>}
      </InfiniteScroll>
      {!initialLoading && <Footer />}
    </main >
  )
}

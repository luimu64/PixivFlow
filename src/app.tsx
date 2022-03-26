import { ImageTile } from './components/ImageTile'
import { Loading } from './components/Loading';
import { PixivApi } from './services/PixivApi'
import { useState, useEffect, useRef } from 'preact/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { Footer } from './components/Footer';

export function App() {
  const [columns, setColumns] = useState<string[][]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const columnWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadInitialImages = async () => {
      //creates array of arrays of column amount
      let tempImgs: string[][] = Array(Math.ceil(window.innerWidth / 600)).fill(undefined).map(() => []);
      const imgs = await PixivApi.getRandomImgs(50);
      imgs.forEach((e, i) => tempImgs[i % tempImgs.length].push(e));
      setColumns(tempImgs);
      setInitialLoading(false);
    }

    loadInitialImages();
    window.scrollTo(0, 0);
  }, [])

  const getShortestColumn = () => {
    const heights = Array.from((columnWrapper.current as HTMLElement).children).map(e => e.clientHeight);
    const min = Math.min(...heights);
    return heights.indexOf(min);
  }

  const loadImageList = async () => {
    if (columnWrapper.current) {
      const data = await PixivApi.getRandomImg() ?? [];
      const shortest = getShortestColumn();
      const tempColumn = [...columns];
      tempColumn[shortest].push(data);
      setColumns(tempColumn)
    }
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
          <div ref={columnWrapper} class='flex justify-center gap-3 md:w-2/3 w-full mx-auto'>
            {columns.map((c, i) => (
              <div class='w-full h-min'>
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

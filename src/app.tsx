import { ImageTile } from './components/ImageTile'
import { Loading } from './components/Loading';
import { PixivApi } from './services/PixivApi'
import { useState, useEffect } from 'preact/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { Footer } from './components/Footer';

export function App() {
  const [imgs, setImgs] = useState<string[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadInitialImages = async () => {
      const imgs = await PixivApi.getRandomImgs(10);
      setImgs(imgs);
      setInitialLoading(false);
    }

    loadInitialImages();
  }, [])

  const loadImageList = async () => {
    const data = await PixivApi.getRandomImg() ?? [];
    setImgs(imgs.concat(data))
  }

  return (
    <main>
      <h1 class="text-5xl font-bold text-center text-white p-5">PixivFlow</h1>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadImageList}
        hasMore={true || false}
        initialLoad={false}
      >
        {initialLoading ? <Loading /> :
          imgs.map((data, i) => (
            <ImageTile
              key={i}
              url={data}
            />
          ))}
      </InfiniteScroll>
      <Footer />
    </main >
  )
}

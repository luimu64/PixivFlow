import { ImageTile } from './components/ImageTile'
import { Loading } from './components/Loading';
import { useImages } from './hooks/useImages';
import { useColumns } from './hooks/useColumns';
import { useState, useEffect, useRef } from 'preact/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { Footer } from './components/Footer';

export function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const columnWrapper = useRef<HTMLDivElement>(null);
  const [columns] = useColumns(loading, columnWrapper);

  useEffect(() => {
    if (loading) setTimeout(() => setLoading(false), 1000);
  }, [loading])

  const startLoading = () => setLoading(true);

  return (
    <main>
      <h1 class="text-5xl font-bold text-center text-white p-5">PixivFlow</h1>
      <InfiniteScroll
        loadMore={startLoading}
        hasMore={true}
      >
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
        </div>
      </InfiniteScroll>
      <Footer />
    </main >
  )
}

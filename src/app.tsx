import { ImageTile } from './components/ImageTile'
import { useColumns } from './hooks/useColumns';
import { useRef } from 'preact/hooks';
import InfiniteScroll from 'react-infinite-scroller';
import { Footer } from './components/Footer';

export function App() {
  const columnWrapper = useRef<HTMLDivElement>(null);
  const { columns, loadNewImage } = useColumns(columnWrapper);

  return (
    <main>
      <h1 class="text-5xl font-bold text-center text-white p-5">PixivFlow</h1>
      <InfiniteScroll
        loadMore={loadNewImage}
        hasMore={true}
        threshold={5000}
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

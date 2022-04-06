import { FunctionComponent } from "preact";
import { useState, useRef } from "preact/hooks";
import classNames from 'classnames';
import { ImageOverlay } from './ImageOverlay';

interface IImageTileProps {
    key?: number;
    url?: string;
    onClick?: () => void;
    loading?: boolean;
    setLoading?: (state: boolean) => void;
}

export const ImageTile: FunctionComponent<IImageTileProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const img = useRef<HTMLImageElement>(null);

    return (
        <div
            key={props.key}
            class={classNames("mx-auto md:rounded cursor-pointer w-full flex flex-col justify-center items-center overflow-hidden h-full my-5", loading && 'h-80')}
            ref={img}
        >
            <img
                onClick={() => setOpened(true)}
                onLoad={() => setLoading(false)}
                onError={() => img.current?.classList.add('hidden')}
                src={props.url}
                class={classNames("object-cover h-full w-full hover:scale-110 transition", props.loading && 'invisible !h-0')}
            />
            <div class={classNames("bg-gray-500 h-80 animate-pulse w-full", !props.loading && 'hidden')}></div>
            {opened && <ImageOverlay url={props.url ?? ''} closeFunc={() => setOpened(false)} />}
        </div>
    )
}
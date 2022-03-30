import { FunctionComponent } from "preact";
import { useState } from 'preact/hooks'
import classNames from 'classnames';

interface IImageOverlayProps {
    url: string;
    closeFunc: () => void;
}

const ImageOverlay: FunctionComponent<IImageOverlayProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <div class="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center">
            <img
                onLoad={() => setLoading(false)}
                src={props.url?.replace('&web=true', '')}
                class={classNames("h-5/6 object-contain z-50", loading && 'invisible !h-0')}
            />
            <div
                onClick={props.closeFunc}
                class="absolute h-full w-screen opacity-70 right-0 left-0 bg-black z-40"
            >
            </div>
            <svg
                width={40}
                height={40}
                fill='white'
                class={classNames("animate-spin z-20", !loading && 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
            >
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
        </div>
    )
}

export { ImageOverlay };
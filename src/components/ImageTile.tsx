import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import classNames from 'classnames';

interface IImageTileProps {
    key?: number;
    url?: string;
    onClick?: () => void;
    loading?: boolean;
    setLoading?: (state: boolean) => void;
}

const PreviewImage: FunctionComponent<IImageTileProps> = (props) => {
    const stopLoading = () => props.setLoading && props.setLoading(false);

    return (
        <>
            <img
                onClick={props.onClick}
                onLoad={stopLoading}
                src={props.url}
                class={classNames("object-cover h-full w-full", props.loading && 'invisible !h-0')}
            />
            <div class={classNames("bg-gray-500 h-80 animate-pulse w-full", !props.loading && 'hidden')}></div>
        </>
    )
}

const FullImage: FunctionComponent<IImageTileProps> = (props) => {
    const stopLoading = () => props.setLoading && props.setLoading(false);

    return (
        <>
            <img
                onClick={props.onClick}
                onLoad={stopLoading}
                src={props.url?.replace('&web=true', '')}
                class={classNames("object-contain h-full w-full z-10", props.loading && 'invisible !h-0')}
            />
            <svg
                width={40}
                height={40}
                fill='white'
                class={classNames("animate-spin", !props.loading && 'hidden')}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
            >
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
            </svg>
        </>
    )
}

export const ImageTile: FunctionComponent<IImageTileProps> = (props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const changeOpen = () => {
        setOpened(!opened);
        setLoading(true);
    }

    return (
        <div key={props.key} class={classNames(
            "mx-auto my-5 md:rounded overflow-hidden",
            opened ? 'h-full w-full flex flex-col justify-center items-center' : 'h-80 md:w-2/3',
            loading && 'w-full h-80'
        )}>
            {opened ?
                <FullImage
                    url={props.url}
                    onClick={changeOpen}
                    loading={loading}
                    setLoading={setLoading}
                />
                :
                <PreviewImage
                    url={props.url}
                    onClick={changeOpen}
                    loading={loading}
                    setLoading={setLoading}
                />}
        </div>
    )
}
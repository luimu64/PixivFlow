import { FunctionComponent } from "preact";

export const Loading: FunctionComponent = () => {
    return (
        <div class="h-60 w-60 mx-auto">
            <img src={`/dancing.gif`} class="object-contain w-full h-full" />
            <p class="animate-pulse text-white text-center text-3xl">Loading...</p>
        </div>
    )
}
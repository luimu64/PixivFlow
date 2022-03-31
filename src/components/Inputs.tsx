import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import classNames from 'classnames';

interface IInputOption {
    value: string;
    text: string;
}

interface IInputProps {
    onChange?: (newValue: any) => void;
    options?: IInputOption[];
}

const Dropdown: FunctionComponent<IInputProps> = (props) => {
    const [active, setActive] = useState<IInputOption>(props.options ? props.options[0] : { value: '', text: '' });
    const [open, setOpen] = useState(false);

    const handleClick = (newActive: IInputOption) => {
        setActive(newActive)
        props.onChange ? props.onChange(newActive.value) : '';
        setOpen(false);
    }

    return (
        <div className={classNames('relative bg-gray-500 rounded m-1 select-none w-60 text-white', open && 'rounded-b-none')}>
            <div className='flex items-center p-2' onClick={() => setOpen(!open)}>
                <option
                    className="grow"
                    value={active.value}
                >{active.text}</option>
            </div>
            <div className={classNames('absolute w-full z-10 rounded-b overflow-hidden divide-y divide-gray-800 select-none', open && '')}>
                {props?.options?.filter(o => o.value !== active.value).map((o, i) =>
                    <option
                        className={classNames(open ? 'block' : 'hidden', 'bg-gray-600 p-2 hover:bg-gray-700')}
                        key={i}
                        value={o.value}
                        onClick={() => handleClick(o)}
                    >{o.text}
                    </option>
                )}
            </div>
        </div>
    )
}

export { Dropdown };
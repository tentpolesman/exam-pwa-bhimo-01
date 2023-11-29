/* eslint-disable consistent-return */
import React from 'react';

const Popover = (props) => {
    const {
        children, content, open, setOpen = () => {},
    } = props;
    const wrapperRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [open, wrapperRef]);

    return (
        <div ref={wrapperRef} className="w-fit h-fit relative flex justify-center">
            {open && (
                <div hidden={!open} className="min-w-fit w-[100%] h-fit absolute top-[120%] z-50 transition-all">
                    <div className="rounded-lg p-3 shadow-md mb-[10px] bg-white max-h-[50vh] overflow-y-auto popover-content">{content}</div>
                    <style jsx>
                        {`
                            .popover-content::-webkit-scrollbar {
                                display: none;
                                -ms-overflow-style: none;
                                scrollbar-width: none;
                            }
                        `}
                    </style>
                </div>
            )}
            <div>{children}</div>
        </div>
    );
};

export default Popover;

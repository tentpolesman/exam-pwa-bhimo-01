import React from 'react';

const Popover = (props) => {
    const {
        children, content, open, setOpen = () => {},
    } = props;
    const wrapperRef = React.useRef(null);

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        if (open) {
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [open, wrapperRef]);

    return (
        <div ref={wrapperRef} className="w-fit h-fit relative flex justify-center">
            {open && (
                <div hidden={!open} className="min-w-fit w-[100%] h-fit absolute top-[120%] z-50 transition-all">
                    <div className="rounded-lg p-3 shadow-md mb-[10px] bg-white max-h-[50vh] overflow-y-scroll">{content}</div>
                </div>
            )}
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div>{children}</div>
        </div>
    );
};

export default Popover;

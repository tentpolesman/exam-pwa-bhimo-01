import Button from '@common_button';
import ArrowUp from '@heroicons/react/24/outline/ChevronUpIcon';
import cx from 'classnames';
import React from 'react';

const ScrollTop = () => {
    const [trigger, setTrigger] = React.useState(false);
    const maxHeightToShow = 200;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkScrollTop = () => {
                if (!trigger && window.pageYOffset > maxHeightToShow && window.innerWidth > 768) {
                    setTrigger(true);
                } else if (trigger && window.pageYOffset < maxHeightToShow && window.innerWidth > 768) {
                    setTrigger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
        }
    }, [window, trigger]);

    const scrollTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div
            onClick={scrollTop}
            role="presentation"
            className={cx('fixed', 'bottom-space-16', 'right-space-16', 'z-scroll-to-top', 'visible', {
                'hidden invisible': !trigger,
            })}
        >
            <Button className="!px-[10px]" iconOnly icon={<ArrowUp />} variant="primary" />
        </div>
    );
};

export default ScrollTop;

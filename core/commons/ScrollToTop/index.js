import Button from '@common_button';
import ArrowUp from '@heroicons/react/24/outline/ChevronUpIcon';
import cx from 'classnames';
import React from 'react';

const ScrollTop = () => {
    const [trigger, setTrigger] = React.useState(false);
    const maxHeightToShow = 200;

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkScrollTop = () => {
                if (!trigger && window.pageYOffset > maxHeightToShow) {
                    setTrigger(true);
                } else if (trigger && window.pageYOffset < maxHeightToShow) {
                    setTrigger(false);
                }
            };
            window.addEventListener('scroll', checkScrollTop);
            return () => window.removeEventListener('scroll', checkScrollTop);
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
            className={cx('z-scroll-to-top', 'visible', 'flex', 'justify-end', 'mb-4', 'mr-4', {
                'hidden invisible': !trigger,
            })}
        >
            <Button className="!px-[10px]" iconOnly icon={<ArrowUp />} variant="primary" />
        </div>
    );
};

export default ScrollTop;

import Typography from '@common_typography';
import MagezonLink from '@core_modules/cms/components/cms-renderer/magezon/MagezonLink';
import cx from 'classnames';

const MagezonHeading = (props) => {
    const {
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        heading_type,
        text,
        link,
        font_weight,
        font_size,
        color,
        align,
        border_style,
        background_position,
        background_color,
        border_top_width,
        border_right_width,
        border_bottom_width,
        border_left_width,
        margin_top,
        margin_right,
        margin_bottom,
        margin_left,
        padding_top,
        padding_right,
        padding_bottom,
        padding_left,
    } = props;

    const style = {};
    if (color && color !== '') style.color = color;
    if (font_weight && font_weight !== '') style.fontWeight = font_weight;
    if (font_size && font_size !== '') style.fontSize = `${typeof font_size === 'number' ? `${font_size}px` : `${font_size.replace('px', '')}px`}`;
    if (align && align !== '') style.textAlign = align;

    return (
        <div
            className={cx('magezon-heading', {
                'max-sm:hidden': xs_hide,
                'max-md:hidden': sm_hide,
                'max-lg:hidden': md_hide,
                'max-xl:hidden': lg_hide,
            })}
        >
            {link && link !== '' ? (
                <MagezonLink link={link}>
                    <Typography variant={heading_type || 'h2'} style={style}>
                        {text || ''}
                    </Typography>
                </MagezonLink>
            ) : (
                <Typography variant={heading_type || 'h2'} style={style}>
                    {text || ''}
                </Typography>
            )}
            <style jsx>
                {`
                    .magezon-heading {
                        width: 100%;
                        border-style: ${border_style || 'solid'};
                        background-position: ${background_position?.split('-').join(' ')};
                        background-color: ${background_color || 'transparent'};
                        border-width: ${border_top_width || 0}px ${border_right_width || 0}px ${border_bottom_width || 0}px
                            ${border_left_width || 0}px;
                        margin: ${margin_top || 0}px ${margin_right || 0}px ${margin_bottom || 0}px ${margin_left || 0}px;
                        padding: ${padding_top || 0}px ${padding_right || 0}px ${padding_bottom || 0}px ${padding_left || 0}px;
                    }
                `}
            </style>
        </div>
    );
};

export default MagezonHeading;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Swatch from '@common/Forms/Swatch';

const SelectOption = (props) => {
    const {
        value, selected, onChange, className = '', disabled = false, thumbnail, content,
        variant: customVariant,
    } = props;

    let variant = 'text';
    if (content.includes('#')) {
        variant = 'color';
    }

    if (content.includes('https') || (thumbnail && thumbnail !== '')) {
        variant = 'image';
    }

    const handleChange = () => {
        // eslint-disable-next-line no-unused-expressions
        !disabled && onChange(value);
    };

    return (
        <Swatch
            disabled={disabled}
            variant={customVariant || variant}
            checked={selected}
            value={content}
            onClick={handleChange}
            label={(thumbnail && thumbnail !== '') ? thumbnail : content}
            className={className}
        />
    );
};

export default SelectOption;

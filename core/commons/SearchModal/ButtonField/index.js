import Button from '@common_button';
import Typography from '@common_typography';

const ButtonField = ({ placeholder = '', onClick }) => (
    <div className="w-full h-full flex flex-row items-center border-b border-b-pwa-primary mx-[15px]">
        <Button
            variant="text"
            onClick={onClick}
            className="w-full justify-start p-0"
        >
            <Typography
                variant="bd-1c"
                type="semiBold"
                className="text-neutral-700"
            >
                {placeholder}
            </Typography>
        </Button>
    </div>
);

export default ButtonField;

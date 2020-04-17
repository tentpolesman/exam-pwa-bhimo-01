import { makeStyles } from '@material-ui/core';
import { FONT_14 } from '@theme/typography';
import { CreateMargin } from '@theme/mixins';

const useStyles = makeStyles(() => ({
    crossselTitle: {
        display: 'block',
        ...FONT_14,
    },
    slider: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        ...CreateMargin(30, 0, 30, 0),
    },
    margin: {
        ...CreateMargin(0, 0, 120, 0),
    },
}));

export default useStyles;

/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Button from '@common_button';
import CircularProgress from '@common_circularprogress';
import Typography from '@common_typography';
import cx from 'classnames';
import { formatPrice } from '@helper_currency';
import { useState } from 'react';

const SummaryView = (props) => {
    const {
        handlePlaceOrder, loading, data, total, t, disabled,
    } = props;
    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div className="flex flex-col w-full max-w-[960px] bottom-0 shadow-sm px-[20px] pt-0 pb-[20px]">
            {/* <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
                <ExpansionPanelSummary
                    classes={{
                        root: styles.expanHead,
                        expanded: styles.expandHeadOpen,
                    }}
                >
                    {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={styles.expanBody}>
                    {data.map((list, index) => (
                        <div className={styles.listSummary} key={index}>
                            <Typography variant="span" letter="capitalize">
                                {list.item}
                            </Typography>
                            <Typography variant="span" letter="uppercase">
                                {list.value}
                            </Typography>
                        </div>
                    ))}
                </ExpansionPanelDetails>
            </ExpansionPanel> */}

            <div className="flex flex-row justify-between">
                <Typography className="font-bold first-letter:uppercase">
                    Total
                </Typography>
                <Typography variant="title" type="bold" letter="uppercase">
                    {total.currency ? formatPrice(total.value, total.currency) : null}
                </Typography>
            </div>
            <Button
                onClick={handlePlaceOrder}
                className={
                    cx(
                        'mt-[13px] mr-[8px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
                        'w-[316px] max-w-[85%] h-[41px]',
                    )
                }
                disabled={loading || disabled}
            >
                {t('checkout:placeOrder')}
                {loading && <CircularProgress />}
            </Button>
        </div>
    );
};

export default SummaryView;

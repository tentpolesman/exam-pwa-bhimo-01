/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Typography from '@common_typography';
import classNames from 'classnames';

const OrderStatusIcon = (props) => {
    const { t } = props;
    let { status } = props;
    if (status === 'ready_to_ship') {
        status = 'processing';
    }
    let steps = ['pending', 'processing', 'shipping', 'complete'];
    if (status === 'canceled') {
        steps = ['pending', 'canceled'];
    }

    const generateIconStyle = (active, statusIcon) => {
        if (active) {
            return 'active';
        }
        if (steps.indexOf(statusIcon) < steps.indexOf(status)) {
            return 'skip';
        }
        return 'inactive';
    };

    const generateLabel = (label) => t(`order:labelStatus:${label}`);
    return null;
    // return (
    //     <div className={styles.container}>
    //         <Stepper alternativeLabel activeStep={steps.indexOf(status)} connector={<CustomConnector />}>
    //             {steps.map((label) => (
    //                 <Step key={label}>
    //                     <StepLabel
    //                         StepIconComponent={(prop) => (
    //                             <IconStep {...prop} status={label} activeStatus={generateIconStyle(prop.active, label)} />
    //                         )}
    //                         classes={{
    //                             label: styles.stepLabel,
    //                         }}
    //                     >
    //                         <Typography variant="span" letter="capitalize" className={classNames('clear-margin-padding', styles.label)}>
    //                             {generateLabel(label)}
    //                         </Typography>
    //                     </StepLabel>
    //                 </Step>
    //             ))}
    //         </Stepper>
    //     </div>
    // );
};

export default OrderStatusIcon;

/* eslint-disable no-unused-vars */
/* eslint-disable semi-style */
import Typography from '@common_typography';

const ItemFieldView = ({
    item, error, options, name, label,
    select, handleSelect, errorMessage,
    fieldValue, t,
}) =>
    null
    // return (
    //     <TableContainer component={Paper} className={styles.tableContainer}>
    //         <Table className={styles.table} size="small" aria-label="a dense table">
    //             <TableBody>
    //                 <TableRow className={styles.tableRowResponsive}>
    //                     <TableCell
    //                         className={styles.tableCellResponsive}
    //                         align="left"
    //                     >
    //                         <div className={styles.displayFlexRow}>
    //                             <div className={styles.mobLabel}>
    //                                 <b>
    //                                     {item.frontend_labels[0].value}
    //                                 </b>
    //                             </div>
    //                             <div className={styles.value}>
    //                                 {
    //                                     item.is_editable ? (
    //                                         <Select
    //                                             options={options}
    //                                             name={name}
    //                                             label={label}
    //                                             value={select}
    //                                             onChange={handleSelect}
    //                                             error={error}
    //                                             errorMessage={errorMessage || t('return:form:required')}
    //                                             showLabel={false}
    //                                         />
    //                                     ) : (
    //                                         <Typography variant="span">
    //                                             {fieldValue[0].valueLabel}
    //                                         </Typography>
    //                                     )
    //                                 }
    //                             </div>
    //                         </div>
    //                     </TableCell>
    //                 </TableRow>
    //             </TableBody>
    //         </Table>
    //     </TableContainer>

// );
;

export default ItemFieldView;

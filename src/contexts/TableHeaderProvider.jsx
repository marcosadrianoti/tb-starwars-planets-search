import PropTypes from 'prop-types';
import { useState } from 'react';
import TableHeaderContext from './TableHeaderContext';

function TableHeaderProvider({ children }) {
  const [tableHeader, setTableHeader] = useState([]);

  return (
    <TableHeaderContext.Provider value={ { tableHeader, setTableHeader } }>
      {children}
    </TableHeaderContext.Provider>
  );
}

TableHeaderProvider.propTypes = {
  children: PropTypes.shape([]).isRequired,
};

export default TableHeaderProvider;

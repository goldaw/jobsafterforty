import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React from 'react';
import { connect } from 'react-redux';

function JobsTable(props) {
  const { data } = props;

  const columns = [{
    Header: 'תפקיד',
    accessor: 'title', // String-based value accessors!
  }, {
    Header: 'מיקום',
    accessor: 'location',
    Cell: cellProps => <span className="number">{cellProps.value}</span>, // Custom cell components!
  }];

  return (<ReactTable
    data={data}
    columns={columns}
    filterable
    className="-striped -highlight"
    style={{ direction: 'rtl' }}
    defaultFilterMethod={(filter, row) =>
        String(row[filter.id]).indexOf(filter.value) !== -1}
  />);
}

const mapStateToProps = state => ({
  jobs: state.jobs,
  auth: state.auth,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(JobsTable);

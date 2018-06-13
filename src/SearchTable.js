import ReactTable from 'react-table';
import 'react-table/react-table.css';
import React from 'react';
import { connect } from 'react-redux';

function SearchTable(props) {
  const columns = [{
    Header: 'תפקיד',
    accessor: 'title', // String-based value accessors!
  }, {
    Header: 'מיקום',
    accessor: 'location',
    Cell: cellProps => <span className="number">{cellProps.value}</span>, // Custom cell components!
  }];
  return (<ReactTable
    defaultPageSize={15}
    data={(props.searchJobs instanceof Array) ? props.searchJobs : []}//searchJobs
    columns={columns}
    filterable
    className="-striped -highlight"
    style={{ direction: 'rtl' }}
    defaultFilterMethod={(filter, row) =>
        String(row[filter.id]).indexOf(filter.value) !== -1}
  />);
}

const mapStateToProps = state => ({
  searchJobs: state.searchJobs.dataSearch,//.data1
  auth: state.auth,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

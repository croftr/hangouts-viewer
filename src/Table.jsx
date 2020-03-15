import React from 'react';
import MaterialTable from 'material-table'

const Table = ({ isLoading,  data = { columns: [], rows: []} } ) => {

    return (
        <div style={{ maxWidth: '100%' }}>            
            <MaterialTable
                isLoading={isLoading}
                columns={data.columns}
                data={data.rows}
                options={{ pageSize: 1000, maxBodyHeight: "calc(100vh - 120px)", pageSizeOptions: [100, 500, 1000] }}
                title="Chat"
            />
        </div>
    )
}

export default Table;
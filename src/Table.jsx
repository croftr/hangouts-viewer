import React from 'react';
import MaterialTable from 'material-table'

const Table = ({ isLoading,  eventCount, data = { columns: [], rows: []} } ) => {
    
    const [hasColumnFiltering, setHasColumnFiltering] = React.useState(false);
    const [hasGrouping, setHasGrouping] = React.useState(false);

    const generateTitle = () => {
        if (data.columns.length < 1) {
            return "Conversation Events Table"
        } else {
            return `${data.title || "Unnamed Conversation"}: ${data.rows.length} Events`;
        }

    }

    return (
        <div style={{ maxWidth: '100%' }}>            
            <MaterialTable
                title={generateTitle()}
                isLoading={isLoading}
                columns={data.columns}
                data={data.rows}
                options={{ 
                    pageSize: 1000, 
                    maxBodyHeight: "calc(100vh - 120px)", 
                    pageSizeOptions: [100, 500, 1000],                    
                    filtering: hasColumnFiltering,
                    grouping: hasGrouping,
                }}                
                actions={[
                    {
                      icon: 'filter_list',
                      tooltip: 'Filter Columns',
                      isFreeAction: true,
                      onClick: () => {
                        setHasColumnFiltering(!hasColumnFiltering)
                      }
                    },
                    {
                        icon: 'group_work',
                        tooltip: 'Column Grouping',
                        isFreeAction: true,
                        onClick: () => {
                            setHasGrouping(!hasGrouping)
                        }
                      }
                  ]}
            />
        </div>
    )
}

export default Table;
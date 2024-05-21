import React from 'react';
import { GetServerSideProps } from 'next';
import { MaterialReactTable } from 'material-react-table'; // Correct import
import { LogsMessages_Log, LogsMessages_logLevel } from '../src/compiled/logsCollector'; // Ensure this import is correct
import { LogsRequest, LogsResponse, LogsServiceClient } from '../src/compiled/logs'; // Ensure this import is correct
import { ChannelCredentials } from '@grpc/grpc-js';

interface Log {
  id: string;
  title: string;
  project: string;
  level: string;
  date: string;
}

interface LogListProps {
  logs: Log[];
}

const LogList: React.FC<LogListProps> = ({ logs }) => {
  const columns = [
    { accessorKey: 'id', header: 'Id', size: 100 },
    { accessorKey: 'title', header: 'Title', size: 150 },
    { accessorKey: 'project', header: 'Project', size: 200 },
    { accessorKey: 'level', header: 'Level', size: 150 },
    { accessorKey: 'date', header: 'Date', size: 150 },
  ];

  return (
    <MaterialReactTable
    columns={columns}
    data={logs}
    enableFullScreenToggle={false}
    initialState={{ isFullScreen: true }}    
    ></MaterialReactTable>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = new LogsServiceClient('http://localhost:8888', ChannelCredentials.createInsecure());
  const request = LogsRequest.create({ page: 1, pageSize: 10, index: "", filters: [] });

  return new Promise((resolve, reject) => {
    client.list(request, (err: any, response: LogsResponse) => {
      if (err) {
        console.error('Error fetching data:', err);
        reject(err);
      } else {
        const logs = response.logs.map((log: LogsMessages_Log) => ({
          id: log.id,
          title: log.message,
          project: log.application?.name || '',
          level: LogsMessages_logLevel[log.level],
          date: new Date(log.logTime).toLocaleString(),
        }));
        resolve({ props: { logs } });
      }
    });
  });
};

export default LogList;

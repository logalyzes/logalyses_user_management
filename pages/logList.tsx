import React from 'react';
import {
  MaterialReactTable,
} from 'material-react-table';
import { LogsServiceClient } from '../src/app/generated/logs_grpc_web_pb'; // Oluşturulan gRPC istemcisi
import { LogRequest } from '../src/app/generated/logs_pb'; // Oluşturulan gRPC mesajları

const HomePage = ({ logs }) => {
  const columns = [
    {
      accessorKey: 'id', //access nested data with dot notation
      header: 'Id',
      size: 100,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      size: 150,
    },
    {
      accessorKey: 'project', //normal accessorKey
      header: 'Project',
      size: 200,
    },
    {
      accessorKey: 'level',
      header: 'Level',
      size: 150,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      size: 150,
    },
  ];

  return (
    <MaterialReactTable
      columns={columns}
      data={logs}
      enableFullScreenToggle={false}
      initialState={{ isFullScreen: true }}
    />
  );
};

export const getServerSideProps = async (context) => {
  const client = new LogsServiceClient('http://localhost:8888'); // gRPC-Web proxy adresi
  const request = new LogRequest();
    // Gerekli parametreleri ayarlayın
  request.setPage(1);
  request.setPageSize(10);

  return new Promise((resolve, reject) => {
    client.list(request, {}, (err, response) => {
      if (err) {
        console.error('Error fetching data:', err);
        reject(err);
      } else {
        const logs = response.getLogsList().map(log => ({
          ...log.toObject(),
          date: new Date(log.getDate()).toLocaleString() // Tarih formatlama
        }));
        resolve({ props: { logs } });
      }
    });
  });
};

export default HomePage;

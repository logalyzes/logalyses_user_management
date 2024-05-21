import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_Cell,
  MRT_ColumnDef,
} from 'material-react-table';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { Box, Button, IconButton, TextField, Toolbar, Typography, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { 
  NotificationServiceClient, 
  User, 
  SetNotificationRequest, 
  UpdateNotificationRequest, 
  RemoveNotificationRequest, 
  ListNotificationsRequest, 
} from '../src/compiled/notifications';
import { ChannelCredentials, credentials } from '@grpc/grpc-js';

const client = new NotificationServiceClient('127.0.0.1:8888', ChannelCredentials.createInsecure());

const logTypes = ['fatal', 'info', 'warning', 'debug'];

const Example: React.FC = () => {
  const [rowData, setRowData] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null);
  const [newRow, setNewRow] = useState<User>({
    id: 0,
    username: '',
    email: '',
    attentionLevels: [],
  });

  const fetchData = useCallback(async () => {
    const request = ListNotificationsRequest.create();
    client.listNotifications(request, (error, response) => {
      if (!error && response) {
        setRowData(response.users);
      } else {
        console.error('Error fetching data:', error);
      }
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = (id: number) => {
    const request = RemoveNotificationRequest.create({ userId: id });
    client.removeNotification(request, (error, response) => {
      if (!error) {
        fetchData();
      } else {
        console.error('Error deleting user:', error);
      }
    });
  };

  const handleAddRow = () => {
    setNewRow({
      id: 0,
      username: '',
      email: '',
      attentionLevels: [],
    });
    setIsEditMode(false);
    setOpen(true);
  };

  const handleEditRow = (rowIndex: number) => {
    setNewRow(rowData[rowIndex]);
    setIsEditMode(true);
    setEditingRowIndex(rowIndex);
    setOpen(true);
  };

  const handleSaveNewRow = () => {
    if (isEditMode && editingRowIndex !== null) {
      const request = UpdateNotificationRequest.create({
        userId: newRow.id,
        attentionLevels: newRow.attentionLevels,
      });
      client.updateNotification(request, (error, response) => {
        if (!error) {
          fetchData();
        } else {
          console.error('Error updating user:', error);
        }
      });
    } else {
      const request = SetNotificationRequest.create({
        username: newRow.username,
        email: newRow.email,
        attentionLevels: newRow.attentionLevels,
      });
      client.setNotification(request, (error, response) => {
        if (!error) {
          fetchData();
        } else {
          console.error('Error adding user:', error);
        }
      });
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log('Saved data:', rowData);
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 70,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 130,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 200,
      },
      {
        accessorKey: 'attentionLevels',
        header: 'Attention Levels',
        size: 300,
        Cell: ({ cell }) => (
          <FormGroup row>
            {logTypes.map((logType, index) => (
              <FormControlLabel
                key={logType}
                control={
                  <Checkbox
                    checked={(cell.getValue() as number[]).includes(index)}
                    onChange={(event) => {
                      const newData = [...rowData];
                      const attentionLevels = newData[cell.row.index].attentionLevels;
                      const logTypeIndex = index;
                      if (event.target.checked) {
                        if (!attentionLevels.includes(logTypeIndex)) {
                          attentionLevels.push(logTypeIndex);
                        }
                      } else {
                        const logTypePos = attentionLevels.indexOf(logTypeIndex);
                        if (logTypePos !== -1) {
                          attentionLevels.splice(logTypePos, 1);
                        }
                      }
                      newData[cell.row.index].attentionLevels = attentionLevels;
                      setRowData(newData);
                    }}
                  />
                }
                label={logType}
              />
            ))}
          </FormGroup>
        ),
      },
      {
        accessorKey: 'actions',
        header: 'Actions',
        size: 150,
        Cell: ({ cell }) => (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={() => handleEditRow(cell.row.index)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(cell.row.original.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [rowData]
  );

  const table = useMaterialReactTable({
    columns,
    data: rowData,
    enableFullScreenToggle: false,
  });

  return (
    <Box sx={{ width: '100%', marginTop: 2 }}>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          User Management
        </Typography>
      </Toolbar>
      <MaterialReactTable table={table} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2, gap: 2 }}>
        <Button variant="contained" color="success" onClick={handleAddRow}>
          Add
        </Button>
        <Button variant="contained" color="inherit" onClick={handleSave} sx={{ mr: 2 }}>
          Save
        </Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography id="modal-title" variant="h6" component="h2">
              {isEditMode ? 'Edit Row' : 'Add New User'}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TextField
            label="Username"
            value={newRow.username}
            onChange={(event) => setNewRow({ ...newRow, username: event.target.value })}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="Email"
            value={newRow.email}
            onChange={(event) => setNewRow({ ...newRow, email: event.target.value })}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <FormGroup row>
            {logTypes.map((logType, index) => (
              <FormControlLabel
                key={logType}
                control={
                  <Checkbox
                    checked={newRow.attentionLevels.includes(index)}
                    onChange={(event) => {
                      const updatedAttentionLevels = [...newRow.attentionLevels];
                      const logTypeIndex = index;
                      if (event.target.checked) {
                        if (!updatedAttentionLevels.includes(logTypeIndex)) {
                          updatedAttentionLevels.push(logTypeIndex);
                        }
                      } else {
                        const logTypePos = updatedAttentionLevels.indexOf(logTypeIndex);
                        if (logTypePos !== -1) {
                          updatedAttentionLevels.splice(logTypePos, 1);
                        }
                      }
                      setNewRow({
                        ...newRow,
                        attentionLevels: updatedAttentionLevels,
                      });
                    }}
                  />
                }
                label={logType}
              />
            ))}
          </FormGroup>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="contained" onClick={handleSaveNewRow} color="success">Save</Button>
            <Button variant="contained" onClick={handleClose} color="inherit">Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Example;

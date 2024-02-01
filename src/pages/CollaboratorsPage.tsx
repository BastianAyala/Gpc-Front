import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Collaborators, CreateCollaborators } from '../model/collaborators.interface';
import { useCollaborators } from '../context/useCollaborators';
import Button from '@mui/material/Button';
import { PersonAdd } from '@mui/icons-material';
import People from '@mui/icons-material/People';
import CollaboratorsRow from './CollaboratorsComponents/collaboratorsRow';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ExportToCsv } from '../services/collaboratorService';

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};  

export default function CollapsibleTable() {
  const {collaborators} = useCollaborators();
  const [modalCollaboratorsAdd, setModalCollaborators] = useState(false);
  const {createCollaborators} = useCollaborators();
  
  const [newCollaborator] = useState<CreateCollaborators>({
    skills: [],
    user: {name: "", surname: "", email: "", userAd: ""},
    active: true,
  });

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [userAd, setUserAd] = useState('');

  function openModalCollaborators() { setModalCollaborators(true);}

  function closeModalCollaborators() { setModalCollaborators(false);}

  function submitCollaborator(){
    newCollaborator.user.name = name;
    newCollaborator.user.surname = surname;
    newCollaborator.user.email = email;
    newCollaborator.user.userAd = userAd;
    closeModalCollaborators();
    createCollaborators(newCollaborator);
  }

  function exportCsv(){
    ExportToCsv();
  }

  return (
    <div>
      <div className='justify-center' style={{padding:'0px 80px'}}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" style={{marginBottom:'20px'}}>
            Colaboradores <People/>
          </Typography>
          {/* <Button variant='outlined' color='primary' onClick={exportCsv}>
            Exportar Csv
          </Button> */}
          <Button onClick={openModalCollaborators} size="small"  variant="contained" color="success" startIcon={<PersonAdd/>}>
            Agregar Colaborador
          </Button>
        </div>

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell > <strong>Nombre</strong></TableCell>
                <TableCell ><strong>Apellido</strong></TableCell>
                <TableCell ><strong>Email</strong></TableCell>
                <TableCell ><strong>Usuario Ad</strong></TableCell>
                <TableCell align='left'><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collaborators.map((row: Collaborators) => (
                <CollaboratorsRow key={row.user.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* modal create */}
      <Modal
        open={modalCollaboratorsAdd}
        onClose={closeModalCollaborators}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography style={{marginBottom:'20px'}} id="modal-modal-title" variant="h5" component="h2">
            Agregar Colaborador
          </Typography>

          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
          >
            <TextField
              required
              name='name'
              label="Nombre"
              value={name}
              onChange= {(e) => setName(e.target.value)}
            />

            <TextField
              required
              name='surname'
              label="Apellidos"
              value={surname}
              onChange= {(e) => setSurname(e.target.value)}
            />

            <TextField
              name='email'
              label="Email"
              required
              value={email}
              onChange= {(e) => setEmail(e.target.value)}
            />
          
            <TextField
              name='userAd'
              label="Usuario Ad"
              required
              value={userAd}
              onChange = {(e) => setUserAd(e.target.value)}
            />

          <Button 
            style={{marginTop:'30px', float:'inline-end'}} 
            variant="contained" 
            color="success"
            onClick={submitCollaborator}
            >
            Guardar
          </Button> 
          </Box>

        </Box>
      </Modal>

    </div>
  );
}
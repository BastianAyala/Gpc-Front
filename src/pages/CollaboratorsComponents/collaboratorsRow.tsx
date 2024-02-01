import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Collaborators } from '../../model/collaborators.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { School } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import ModalEdit from './modalEdit';
import { useCollaborators } from '../../context/useCollaborators';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import { Skills } from '../../model/skill.interface';
import { useState } from 'react';

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props{
  row: Collaborators;
}

export default function CollaboratorsRow( { row }:Props ) {
    const [skills, setSkills] = useState(row.skills);
    const [open, setOpen] = React.useState(false);
    const {deleteCollaborators, updateCollaborators, addSkill, modalEdit, changeSelectedCollaborator, changeModalEdit} = useCollaborators();

    const [level, setLevel] = useState(1);
    const [nameSkill, setNameSkill] = useState('');

    const [modalAddSkill, setModalAddSkill] = useState(false);
    const closeModalAddSkill = () => setModalAddSkill(false);

    function valuetext(value: number) {
      return `${value}`;
    }

    function openModalEdit(){
      changeSelectedCollaborator(row);
      changeModalEdit(true);
    }

    async function deleteSkill(skill: Skills){
      const skillsAux = row.skills;
      const indexToDelete = skills.findIndex(q => q.name == skill.name);
      skillsAux.splice(indexToDelete, 1);
      setSkills(skillsAux);
      await updateCollaborators(row._id, row);
    }

    function submitAddSkill(){
      let skillToAdd = {name: nameSkill, level: level};
      setSkills([... skills, skillToAdd]);

      // updateCollaborators(row._id, row);

      addSkill(row._id, skillToAdd);
      closeModalAddSkill();
    }

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
  
          <TableCell component="th" scope="row">
            {row.user.name}
          </TableCell>
          <TableCell >{row.user.surname}</TableCell>
          <TableCell >{row.user.email}</TableCell>
          <TableCell >{row.user.userAd}</TableCell>
          <TableCell > 
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="error" onClick={(_) => deleteCollaborators(row._id)}>
                <DeleteIcon />
              </Button>
              <Button variant="outlined" onClick={openModalEdit}>
                <Edit/>
              </Button>
            </Stack>
          </TableCell>
        </TableRow>
  
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" gutterBottom component="div">
                    <strong>Plan de carrera</strong>
                  </Typography>
  
                  <Button size="small"  variant="outlined" color="success" startIcon={<School/>} onClick={(_) => setModalAddSkill(true)}>
                    Agregar habilidad
                  </Button>
                </div>
  
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Nombre de la habilidad</strong></TableCell>
                      <TableCell><strong>Nivel de la habilidad (del 1 al 10)</strong></TableCell>
                      <TableCell><strong>Acciones</strong></TableCell>
                    </TableRow>
                  </TableHead>
  
                  <TableBody>
                    {skills!.map((skill) => (
                      <TableRow key={skill.name}>
                        <TableCell component="th" scope="row">
                          {skill.name}
                        </TableCell>
                        <TableCell>{skill.level}</TableCell>
                        <TableCell>
                        <Stack direction="row" spacing={2}>
                          <Button variant="outlined" color="error" onClick={(_) => deleteSkill(skill)}>
                            <DeleteIcon />
                          </Button>
                          {/* <Button variant="outlined">
                            <Edit/>
                          </Button> */}
                        </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
  
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>

        {modalEdit && <ModalEdit></ModalEdit>}
        
      {/* Modal agregar skill */}
      <Modal
        open={modalAddSkill}
        onClose={closeModalAddSkill}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="modal-modal-title" variant="h5" component="h2" style={{marginBottom: '20px'}}>
            Agregar habilidad
          </Typography>
          <Box
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
          >
            <TextField
                required
                name='nameSkill'
                label="Nombre"
                style={{width: '100%'}}
                value={nameSkill}
                onChange={(e) => setNameSkill(e.target.value)}
            />

              <Slider
                aria-label="Nivel"
                defaultValue={5}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={10}
                value={level}
                onChange={(e:any) => setLevel(e.target!.value)}
              />

              <Button 
                style={{marginTop:'30px', float:'inline-end'}} 
                variant="contained" 
                color="success"
                onClick={submitAddSkill}
                >
                Guardar
            </Button>
          </Box>
        </Box>
      </Modal>


      </React.Fragment>
    );
  }
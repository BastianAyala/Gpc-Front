import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useCollaborators } from "../../context/useCollaborators";
import { Collaborators } from "../../model/collaborators.interface";
import { updateCollaboratorsRequest } from "../../services/collaboratorService";

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

export default function ModalEdit(){
    const {modalEdit} = useCollaborators();
    const {changeModalEdit} = useCollaborators();
    const {selectedCollaborator} = useCollaborators();
    

    const [name, setName] = useState(selectedCollaborator.user.name);
    const [surname, setSurname] = useState(selectedCollaborator.user.surname);
    const [email, setEmail] = useState(selectedCollaborator.user.email);
    const [userAd, setUserAd] = useState(selectedCollaborator.user.userAd);

    function closeModalCollaboratorsEdit() { changeModalEdit(false);}    

    async function submitEdit(){
        const collaboratorsToUpdate: Collaborators =  selectedCollaborator;

        collaboratorsToUpdate.user.name = name;
        collaboratorsToUpdate.user.surname = surname;
        collaboratorsToUpdate.user.email = email;
        collaboratorsToUpdate.user.userAd = userAd;

        await updateCollaboratorsRequest(selectedCollaborator._id, selectedCollaborator);
        closeModalCollaboratorsEdit();
    }

    return (
        <>
        <Modal
            open={modalEdit}
            onClose={closeModalCollaboratorsEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={styleModal}>
                <Typography style={{marginBottom:'20px'}} id="modal-modal-title" variant="h5" component="h2">
                    Editar Colaborador
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
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        required
                        name='surname'
                        label="Apellidos"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />

                    <TextField
                        name='email'
                        label="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                
                    <TextField
                        name='userAd'
                        label="Usuario Ad"
                        required
                        value={userAd}
                        onChange={(e) => setUserAd(e.target.value)}
                    />

                    <Button 
                        style={{marginTop:'30px', float:'inline-end'}} 
                        variant="contained" 
                        color="success"
                        onClick={submitEdit}
                        >
                        Guardar
                    </Button>

                </Box>
            </Box>
        </Modal>
        </>
    )
}
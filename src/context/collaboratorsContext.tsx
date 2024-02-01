import { createContext, useEffect, useState } from "react";
import { Collaborators, CreateCollaborators, UpdateCollaborators } from "../model/collaborators.interface";
import { Skills } from "../model/skill.interface";
import { createCollaboratorsRequest, deleteCollaboratorsRequest, getCollaboratorsRquest, updateCollaboratorsRequest } from "../services/collaboratorService";

interface CollaboratorsContextValue{
    collaborators: Collaborators[];
    modalEdit: boolean;
    selectedCollaborator: Collaborators;
    createCollaborators: (collaborators: CreateCollaborators) => Promise<void>;
    deleteCollaborators: (id: string) => Promise<void>;
    updateCollaborators: (id: string, collaborators: UpdateCollaborators) => Promise<Collaborators>;
    changeModalEdit: (value: boolean) => void;
    changeSelectedCollaborator: (collaborator: Collaborators) => Promise<void>;
    addSkill: (id: string, skill: Skills) => void;
}

export const CollaboratorsContext = createContext<CollaboratorsContextValue | undefined> (undefined
//     {
//     collaborators: [],
//     modalEdit: false,
//     selectedCollaborator: {user: {name: "", surname: "", email: "", userAd: "" }, skills: [], _id: "", active: true, createdAt: new Date, updatedAt: new Date},
//     createCollaborators: async () => {},
//     deleteCollaborators: async () => {},
//     updateCollaborators: async () => {},
//     changeModalEdit: async () => {},
//     changeSelectedCollaborator: async () => {},
// }
)

interface Props {
    children: React.ReactNode;
}

export const CollaboratorsProvider: React.FC<Props> = ({children}) => {
    const [collaborators, setCollaborators] = useState<Collaborators[]>([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [selectedCollaborator, setSelectedCollaborator] = useState<Collaborators>({user: {name: "", surname: ""}, skills: [], _id: "", active: true, createdAt: new Date, updatedAt: new Date});

    useEffect(() => {
        getCollaboratorsRquest()
            .then((response) => response.json())
            .then((data) => setCollaborators(data))
    }, []);

    const changeModalEdit = async (open: boolean) => {
        setModalEdit(open);
    }

    const changeSelectedCollaborator = async (collaborator: Collaborators) => {
        setSelectedCollaborator(collaborator);
    }

    const createCollaborators = async (collaborator: CreateCollaborators) => {
        const res = await createCollaboratorsRequest(collaborator);
        const data = await res.json();
        setCollaborators([... collaborators, data]);
    };

    const deleteCollaborators = async (id: string) => {
        const res = await deleteCollaboratorsRequest(id);

        if(res.ok == true){
            setCollaborators(collaborators.filter( (collaborator) => collaborator._id != id));
        }
    };

    const updateCollaborators = async (id: string, collaborator: UpdateCollaborators): Promise<Collaborators> => {
        const res = await updateCollaboratorsRequest(id , collaborator);
        const data = await res.json();

        const collaboratorAux = collaborators;
        const indexToUpdate = collaborators.findIndex(q => q._id == id);
        collaboratorAux[indexToUpdate] = data;

        console.log(collaboratorAux);
        setCollaborators(collaboratorAux);

        return data;
    }

    const addSkill = async (idCollaborator:string, newSkills: Skills) =>
    {
        const collaboratorAux = collaborators;
        const indexToUpdate = collaborators.findIndex(q => q._id == idCollaborator);
        collaboratorAux[indexToUpdate].skills.push(newSkills);

        await updateCollaboratorsRequest(idCollaborator , collaboratorAux[indexToUpdate]);

        setCollaborators(collaboratorAux);
    }

    return (
        <CollaboratorsContext.Provider 
            value = {{
                collaborators, 
                modalEdit, 
                selectedCollaborator, 
                createCollaborators, 
                deleteCollaborators, 
                updateCollaborators, 
                changeModalEdit,
                changeSelectedCollaborator,
                addSkill
            }}
        >
            {children}
        </CollaboratorsContext.Provider>
    )
}
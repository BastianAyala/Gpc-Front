import { useContext } from "react"
import { CollaboratorsContext } from "./collaboratorsContext";

export const useCollaborators = () => {
    const context = useContext(CollaboratorsContext);
    if(!context) throw new Error('useCollaborators mus be used whithin a CollaboratorsProvider');
    return context;
}
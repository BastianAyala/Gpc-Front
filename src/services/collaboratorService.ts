import { CreateCollaborators, UpdateCollaborators } from "../model/collaborators.interface";

const API = 'http://localhost:3000/api';

export const createCollaboratorsRequest = (task: CreateCollaborators) => {
    return fetch(`${API}/collaborators`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'content-Type': 'application/json'
        }
    });
};

export const getCollaboratorsRquest = () => fetch(`${API}/collaborators`);

export const deleteCollaboratorsRequest = (id: string) => fetch(`${API}/collaborators/${id}`, {
    method: "DELETE",
});

export const updateCollaboratorsRequest = async (id: string, collaborators: UpdateCollaborators) => 
    await fetch(`${API}/collaborators/${id}`, {
        method: 'PUT',
        body: JSON.stringify(collaborators),
        headers: {
            'content-Type': 'application/json'
        }
    });

export const ExportToCsv = async () => {
    try {
        const response = await fetch(`${API}/collaborators/export`);
        if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collaborators.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        } else {
        console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Red error:', error);
    }
};